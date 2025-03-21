package com.swpproject.koi_care_system.service.order;

import com.swpproject.koi_care_system.dto.OrderDto;
import com.swpproject.koi_care_system.dto.OrderItemDto;
import com.swpproject.koi_care_system.enums.OrderStatus;
import com.swpproject.koi_care_system.exceptions.ResourceNotFoundException;
import com.swpproject.koi_care_system.mapper.OrderMapper;
import com.swpproject.koi_care_system.models.*;
import com.swpproject.koi_care_system.payload.request.PlaceOrderRequest;
import com.swpproject.koi_care_system.payload.request.PlacePremiumOrderRequest;
import com.swpproject.koi_care_system.repository.OrderRepository;
import com.swpproject.koi_care_system.repository.ProductRepository;
import com.swpproject.koi_care_system.repository.UserProfileRepository;
import com.swpproject.koi_care_system.service.cart.CartItemService;
import com.swpproject.koi_care_system.service.cart.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.concurrent.atomic.AtomicReference;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final CartService cartService;
    private final OrderMapper orderMapper;
    private final CartItemService cartItemService;
    private final UserProfileRepository userProfileRepository;
    @Transactional
    @Override
    public OrderDto placeOrder(PlaceOrderRequest request) {
        Cart cart = cartService.getCartByUserId(request.getUserId());
        Order order = createOrder(cart);
        List<OrderItem> orderItemList = createOrderItems(order, cart);
        order.setAddress(request.getAddress());
        order.setPhone(request.getPhone());
        order.setRecipientName(request.getRecipientName());
        order.setNote(request.getNote());
        order.setOrderItems(new HashSet<>(orderItemList));
        order.setTotalAmount(calculateTotalAmount(orderItemList));
        Order savedOrder = orderRepository.save(order);
        cartService.clearCart(cart.getId());
        return orderMapper.toDto(savedOrder);
    }

    @Override
    public OrderDto placePremiumPlanOrder(PlacePremiumOrderRequest request) {
        Cart virtualCart = cartService.getCartByUserId(request.getUserId());
        cartService.clearCart(virtualCart.getId());
        List<Product> products = productRepository.findByBrand("KoiCareSystem")
                .stream()
                .sorted(Comparator.comparing(Product::getName))
                .toList();
        switch (request.getTime()) {
            case "1MONTH" -> cartItemService.addItemToCart(virtualCart.getId(), products.get(0).getId(), 1);
            case "6MONTHS" -> cartItemService.addItemToCart(virtualCart.getId(), products.get(2).getId(), 1);
            case "1YEAR" -> cartItemService.addItemToCart(virtualCart.getId(), products.get(1).getId(), 1);
        }
        UserProfile userProfile = userProfileRepository.findUserProfileByUserId(request.getUserId());
        Order order = createOrder(virtualCart);
        List<OrderItem> orderItemList = createOrderItems(order,virtualCart);
        order.setAddress(userProfile.getAddress());
        order.setPhone(userProfile.getPhone());
        order.setRecipientName(userProfile.getName());
        order.setOrderItems(new HashSet<>(orderItemList));
        order.setTotalAmount(calculateTotalAmount(orderItemList));
        cartService.clearCart(virtualCart.getId());
        return orderMapper.toDto(orderRepository.save(order));
    }

    private Order createOrder(Cart cart) {
        Order order = new Order();
        order.setUser(cart.getUser());
        order.setOrderStatus(OrderStatus.PENDING);
        order.setOrderDate(LocalDateTime.now());
        return  order;
    }

    private List<OrderItem> createOrderItems(Order order, Cart cart) {
        return  cart.getItems().stream().map(cartItem -> {
            Product product = cartItem.getProduct();
            if((product.getInventory()-cartItem.getQuantity()) < 0){
                throw new RuntimeException("The quantity in inventory is not enough for your order");
            }
            product.setInventory((product.getInventory() - cartItem.getQuantity()));
            if(product.getInventory()==0)
                product.setStatus(false);
            productRepository.save(product);
            String imageUrl = (!product.getImages().isEmpty() ? product.getImages().get(0).getDownloadUrl() :"");
            return  new OrderItem(
                    order,
                    product,
                    cartItem.getQuantity(),
                    cartItem.getUnitPrice(),
                    imageUrl,
                    product.getCategory().getName()
            );
        }).toList();
    }

    private BigDecimal calculateTotalAmount(List<OrderItem> orderItemList) {
        return  orderItemList
                .stream()
                .map(item -> item.getPrice()
                        .multiply(new BigDecimal(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    @Override
    public OrderDto getOrder(Long orderId) {
        return orderRepository.findById(orderId)
                .map(orderMapper::toDto)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found"));
    }

    @Override
    public List<OrderDto> getUserOrders(Long userId) {
        List<Order> orders = orderRepository.findByUserId(userId);
        return  orders.stream().map(orderMapper :: toDto).toList();
    }

    @Override
    public List<OrderDto> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        orders.forEach(order -> {
            if (order.getOrderStatus().equals(OrderStatus.PENDING) && order.getOrderDate().isBefore(LocalDateTime.now().minusDays(1))) {
                order.setOrderStatus(OrderStatus.CANCELLED);
                returnQuantityIntoInventory(order.getOrderId());
                orderRepository.save(order);
            }
        });
        return orders.stream()
                .map(orderMapper::toDto)
                .toList();
    }


    @Override
    public List<OrderDto> getOrdersInOneMonth() {
        return  orderRepository.findAll().stream()
                .map(orderMapper::toDto)
                .filter(order -> order.getOrderDate().isAfter(LocalDateTime.now().minusMonths(1))&& (order.getStatus().equals(OrderStatus.DELIVERED.toString())||order.getStatus().equals(OrderStatus.PROCESSING.toString())))
                .toList();
    }

    @Override
    public LocalDateTime isBoughtProduct(Long userId, Long productId) {
        List<OrderDto> orders = this.getUserOrders(userId);
        List<OrderDto> sortedDeliveredOrders = orders.stream()
                .filter(orderDto -> orderDto.getStatus().equals(OrderStatus.DELIVERED.toString()))
                .sorted(Comparator.comparing(OrderDto::getOrderDate))
                .toList();

        LocalDateTime defaultDateTime = LocalDateTime.of(1, 1, 1, 0, 0, 0);
        for (OrderDto orderDto : sortedDeliveredOrders) {
            for (OrderItemDto orderItemDto : orderDto.getItems()) {
                if (orderItemDto.getProductId().equals(productId)) {
                    return orderDto.getOrderDate();
                }
            }
        }
        return defaultDateTime;
    }

    @Override
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP')")
    public void updateDeliveredStatus(Long orderId) {
        Order order = orderRepository.findByOrderId(orderId);
        order.setOrderStatus(OrderStatus.DELIVERED);
        orderRepository.save(order);
    }
    @Override
    public void returnQuantityIntoInventory(Long orderId) {
        Order order = orderRepository.findByOrderId(orderId);
        order.getOrderItems().forEach(orderItem ->
                productRepository.findById(orderItem.getProduct().getId()).ifPresent(product -> {
                    product.setInventory(product.getInventory() + orderItem.getQuantity());
                    productRepository.save(product);
                })
        );
    }

    @Override
    public boolean isPremiumOrder(Long orderId) {
        Order order = orderRepository.findByOrderId(orderId);
        return (order.getOrderItems().size() == 1 && order.getOrderItems().stream().allMatch(orderItem -> orderItem.getProduct().getCategory().getName().equals("Premium Plan")));
    }

}