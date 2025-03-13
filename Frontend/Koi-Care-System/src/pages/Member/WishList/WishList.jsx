import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useDarkMode } from '../../../hooks/DarkModeContext'
import TopLayout from '../../../layouts/TopLayout'
import { addToCartList } from '../../../redux/store/cartList'
import { RemoveFromWishlist } from '../../../redux/store/wishList'

const WishList = () => {
  const wishlist = useSelector((state) => state.name.wishlist)
  console.log(wishlist)
  const dispatch = useDispatch()
  const { isDarkMode } = useDarkMode()
  const [count, setCount] = useState(1)

  const handleAddToCart = (product) => {
    if (product.inventory < count) {
      toast.warn('This product is out of stock')
    } else {
      dispatch(addToCartList(product, count))
    }
  }

  const increment = () => {
    setCount((prevCount) => prevCount + 1)
  }

  const decrement = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : prevCount))
  }

  return (
    <div>
      <TopLayout text='Recommendations' textName='Wish List' links='member/recommendations' />
      <div>
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty.</p>
        ) : (
          <div className='relative overflow-x-auto'>
            <table className='min-w-full divide-y divide-gray-200'>
              <thead className={`${isDarkMode ? 'bg-custom-layout-dark' : 'bg-white'}`}>
                <tr className=''>
                  <th
                    scope='col'
                    className='lg:px-6 lg:py-3 px-3 py-2 text-center text-xs border font-medium uppercase tracking-wider'
                  >
                    Remove
                  </th>
                  <th
                    scope='col'
                    className='lg:px-6 lg:py-3 px-8 py-2 text-center text-xs border font-medium uppercase tracking-wider'
                  >
                    Product
                  </th>
                  <th
                    scope='col'
                    className='lg:px-6 lg:py-3 px-3 py-2 text-center text-xs border font-medium uppercase tracking-wider'
                  >
                    Name
                  </th>
                  <th
                    scope='col'
                    className='lg:px-6 lg:py-3 px-3 py-2 text-center text-xs border font-medium uppercase tracking-wider'
                  >
                    Price
                  </th>
                  <th
                    scope='col'
                    className='lg:px-6 lg:py-3 px-3 py-2 text-center text-xs border font-medium uppercase tracking-wider'
                  >
                    Quantity
                  </th>
                  <th
                    scope='col'
                    className='lg:px-6 lg:py-3 px-8 py-2 text-center text-xs border font-medium uppercase tracking-wider'
                  >
                    Add to cart
                  </th>
                </tr>
              </thead>
              <tbody className={`${isDarkMode ? 'bg-custom-layout-dark' : 'bg-white'} border`}>
                {wishlist.map((item) => (
                  <tr key={item.id}>
                    <td className='lg:px-6 px-3 py-2 lg:py-4 whitespace-nowrap text-center border'>
                      <button
                        onClick={() => dispatch(RemoveFromWishlist(item))}
                        className='text-red-500 hover:text-red-700 transition duration-200'
                        aria-label={`Remove ${item.name} from wishlist`}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='size-5 text-red-500 mt-4 ml-2 cursor-pointer'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
                          />
                        </svg>
                      </button>
                    </td>

                    <td className='lg:px-6 px-3 py-2 lg:py-4 text-center border border-gray-200 whitespace-nowrap'>
                      <img src={item.images[0].downloadUrl} alt='' className='mx-auto w-[100px] h-[100px] rounded-lg' />
                    </td>

                    <td className='lg:px-6 px-3 py-2 lg:py-4 text-center border border-gray-200 whitespace-nowrap'>
                      <div className='font-medium lg:text-lg text-sm'>{item.name}</div>
                    </td>

                    <td className='lg:px-6 px-3 py-2 lg:py-4 text-center border border-gray-200 whitespace-nowrap'>
                      <div className=''>
                        {' '}
                        {item.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                      </div>
                    </td>

                    <td className='lg:px-6 px-3 py-2 lg:py-4 border border-gray-200 whitespace-nowrap'>
                      <div className='flex gap-5 items-center justify-center mx-auto w-full'>
                        <div className='lg:text-xl text-base font-semibold'>Quantity:</div>
                        <div className='flex border border-blue-400 gap-5 rounded-lg'>
                          <button className='border-blue-400 border-r rounded-lg lg:p-2 p-1' onClick={decrement}>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='lg:size-8 size-6 text-blue-400'
                            >
                              <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
                            </svg>
                          </button>
                          <input
                            type='text'
                            value={count}
                            readOnly
                            className={`outline-none lg:w-10 w-5 text-center text-xl text-blue-400 ${
                              isDarkMode ? 'bg-custom-layout-dark' : 'bg-custom-layout-light'
                            }`}
                          />
                          <button className='border-l border-blue-400 lg:p-2 p-1' onClick={increment}>
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='lg:size-8 size-6 text-blue-400'
                            >
                              <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </td>

                    <td className='lg:px-6 px-3 py-2 lg:py-4 whitespace-nowrap text-center border border-gray-200'>
                      <button
                        onClick={() => handleAddToCart(item)}
                        className='text-red-500 hover:text-red-700 transition duration-200'
                        aria-label={`Remove ${item.name} from wishlist`}
                      >
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth={1.5}
                          stroke='currentColor'
                          className='lg:size-8 size-6 text-red-500 mt-4 ml-2 cursor-pointer'
                        >
                          <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default WishList
