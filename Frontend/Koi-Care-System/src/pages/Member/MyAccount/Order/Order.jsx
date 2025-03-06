import axios from 'axios'
import { useEffect, useState } from 'react'
import { BsFillCalendarDateFill } from 'react-icons/bs'
import { FaChevronDown, FaChevronUp, FaPhoneAlt, FaRegAddressCard, FaSpinner, FaUser } from 'react-icons/fa'
import { GrNotes } from 'react-icons/gr'
import { MdPendingActions } from 'react-icons/md'
import { toast } from 'react-toastify'
import Header from '../../../../components/Member/Header'
import LeftSideBar from '../../../../components/Member/LeftSideBar'
import { useDarkMode } from '../../../../hooks/DarkModeContext'

function Order() {
  const { isDarkMode } = useDarkMode()
  const [orders, setOrders] = useState([])
  const [expandedOrders, setExpandedOrders] = useState({})
  const [paymentUrl, setPaymentUrl] = useState(null)
  const [pageSize, setPageSize] = useState(5)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(orders.length / pageSize)
  const displayedOrders = orders.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const [sortStatus, setSortStatus] = useState('')
  const [sortedOrders, setSortedOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const getPaymentUrl = async (orderId) => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get('https://koicaresystemv2.azurewebsites.net/api/payment/vn-pay/order', {
        params: { orderId: orderId },
        headers: { Authorization: `Bearer ${token}` }
      })

      setPaymentUrl(res.data.paymentUrl)
    } catch (err) {
      console.error(err)
      toast.error('Failed to create payment')
    }
  }

  const getOrders = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const userId = localStorage.getItem('id')
      const res = await axios.get(`https://koicaresystemv2.azurewebsites.net/api/orders/user/${userId}/order`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      let ordersData = res.data.data

      if (sortStatus) {
        ordersData = ordersData.filter((order) => order.status === sortStatus).sort((a, b) => b.id - a.id)
      } else {
        ordersData = ordersData.sort((a, b) => b.id - a.id)
      }
      setOrders(ordersData)
      setSortedOrders(ordersData)
    } catch (error) {
      console.error(error)
      toast.error('Failed to get orders')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSortChange = (event) => {
    setSortStatus(event.target.value)
  }

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId]
    }))
  }

  useEffect(() => {
    getOrders()
  }, [sortStatus])

  return (
    <div className='h-screen flex'>
      <LeftSideBar />
      <div
        className={`relative ${isDarkMode ? 'bg-custom-dark text-white' : 'bg-white text-black'} shadow-xl flex-1 flex-col overflow-y-auto overflow-x-hidden duration-200 ease-linear`}
      >
        <Header />
        <div className='p-6 rounded-lg shadow-md'>
          <h1 className='text-2xl font-bold mb-6 text-center'>My Orders Summary</h1>

          <div className='mb-4 flex justify-between'>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
                setCurrentPage(1)
              }}
              className={`p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <select
              onChange={handleSortChange}
              value={sortStatus}
              className={`p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-white text-black border-gray-300'}`}
            >
              <option value=''>Sort by Status</option>
              <option value='PENDING'>PENDING</option>
              <option value='PROCESSING'>PROCESSING</option>
              <option value='CANCELLED'>CANCELLED</option>
              <option value='DELIVERED'>DELIVERED</option>
            </select>
          </div>
          {isLoading && (
            <div className='fixed inset-0 px-4 py-2 flex items-center justify-center z-50'>
              <FaSpinner className='animate-spin text-green-500 text-6xl' />
            </div>
          )}
          {displayedOrders?.length > 0 ? (
            <div className='space-y-6'>
              {displayedOrders.map((order) => (
                <div key={order.id} className='border rounded-lg p-6 shadow-lg  transition-shadow'>
                  <h2 className='text-xl font-semibold mb-4 flex justify-between items-center'>
                    Order ID: {order.id}
                    <button onClick={() => toggleOrderDetails(order.id)} className=' hover:text-gray-700'>
                      {expandedOrders[order.id] ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                  </h2>

                  <div className='overflow-x-auto'>
                    <table className='min-w-full border border-gray-200 shadow-md rounded-lg'>
                      <tbody>
                        {order.items.map((item, index) => (
                          <tr key={index} className='border-b'>
                            <td className='py-3 px-6'>
                              <img
                                src={item.imageUrl}
                                alt={item.productName}
                                className='w-20 h-20 object-cover rounded-lg'
                              />
                            </td>
                            <td className='py-3 px-6'>
                              <p className='font-medium text-lg'>{item.productName}</p>
                            </td>
                            <td className='py-3 px-6'>
                              <p className='text-lg '>{item.category}</p>
                            </td>
                            <td className='py-3 px-6'>
                              <p className='text-lg '>Quantity: {item.quantity}</p>
                            </td>
                            <td className='py-3 px-6'>
                              <p className='font-semibold text-blue-500'>
                                {(item.price * item.quantity).toLocaleString()}đ
                              </p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {expandedOrders[order.id] && (
                    <div className='mt-4 p-4   rounded-lg'>
                      <div className='text-lg font-semibold  mb-4'>Order Details</div>
                      <div className='space-y-2'>
                        <p className='flex items-center gap-2'>
                          <FaUser className='text-xl text-blue-500' />
                          <span className='font-medium'>Recipient:</span> {order.recipientName}
                        </p>
                        <p className='flex items-center gap-2'>
                          <FaPhoneAlt className='text-xl text-green-500' />
                          <span className='font-medium'>Phone:</span> {order.phone}
                        </p>
                        <p className='flex items-center gap-2'>
                          <FaRegAddressCard className='text-xl text-red-500' />
                          <span className='font-medium'>Address:</span> {order.address}
                        </p>
                        <p className='flex items-center gap-2'>
                          <GrNotes className='text-xl text-yellow-500' />
                          <span className='font-medium'>Note:</span> {order.note}
                        </p>
                        <p className='flex items-center gap-2'>
                          <BsFillCalendarDateFill className='text-xl text-purple-500' />
                          <span className='font-medium'>Order Date:</span> {new Date(order.orderDate).toLocaleString()}
                        </p>
                        <p className='flex items-center gap-2'>
                          <MdPendingActions className='text-xl text-orange-500' />
                          <span className='font-medium'>Status:</span> {order.status}
                        </p>
                      </div>

                      <div className='flex justify-between font-bold mt-6 pt-4 border-t border-gray-200'>
                        <span className='text-lg'>Total Amount:</span>
                        <span className='text-lg text-blue-600'>{order.totalAmount.toLocaleString()}đ</span>
                      </div>

                      {order.status === 'PENDING' && (
                        <button
                          onClick={async () => {
                            await getPaymentUrl(order.id)
                            if (paymentUrl) {
                              window.location.href = paymentUrl
                            }
                          }}
                          className='mt-6 w-full py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition'
                        >
                          Payment
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className='text-center '>No orders found.</p>
          )}
          <div className='flex justify-center items-center mt-4 gap-4'>
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className='py-2 px-4 bg-blue-500 text-white rounded disabled:bg-gray-300'
            >
              Previous
            </button>
            <p className=' text-center'>
              Page {currentPage} of {totalPages}
            </p>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className='py-2 px-4 bg-blue-500 text-white rounded disabled:bg-gray-300'
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Order
