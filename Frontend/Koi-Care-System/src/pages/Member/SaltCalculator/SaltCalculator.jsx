/* eslint-disable react/no-unescaped-entities */
import LeftSideBar from '../../../components/Member/LeftSideBar'
import { useDarkMode } from '../../../components/DarkModeContext'
import Header from '../../../components/Member/Header'
import { useState, useEffect } from 'react'
import axios from 'axios'
import TopLayout from '../../../layouts/TopLayout'
import '../SaltCalculator/range.css'

function SaltCalculator() {
  const { isDarkMode } = useDarkMode()
  const [ponds, setPonds] = useState([])
  const [selectedPond, setSelectedPond] = useState(null)
  const [desiredSalinity, setDesiredSalinity] = useState(0.01) // Nồng độ mong muốn
  const [currentSalinity, setCurrentSalinity] = useState(0.01) // Nồng độ hiện tại
  const [saltNeeded, setSaltNeeded] = useState(0) // Kết quả: lượng muối cần thêm
  const [waterChangePercent, setWaterChangePercent] = useState(100) // Phần trăm thay đổi nước
  const [refillAmount, setRefillAmount] = useState(0) // Lượng nước cần bổ sung
  const [waterChanges, setWaterChanges] = useState(0) // Thêm trạng thái để lưu số lần thay nước

  // Hàm lấy danh sách hồ
  const getPond = async () => {
    try {
      const token = localStorage.getItem('token')
      const id = localStorage.getItem('id')
      if (!token) {
        throw new Error('No token found')
      }
      const res = await axios.get(`https://koicaresystemv3.azurewebsites.net/api/koiponds/user/${id}/koiponds`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setPonds(res.data.data)
    } catch (error) {
      console.error('Error fetching ponds:', error)
    }
  }

  useEffect(() => {
    getPond()
  }, [])

  useEffect(() => {
    if (ponds.length === 1) {
      setSelectedPond(ponds[0])
    }
  }, [ponds])

  // Hàm xử lý khi người dùng chọn hồ
  const handlePondChange = (e) => {
    const pondId = e.target.value

    if (pondId === 'all') {
      // Nếu chưa chọn hồ thì có thể chọn All Ponds
      if (!selectedPond) {
        setSelectedPond(null)
      }
    } else {
      // Khi người dùng chọn một hồ cụ thể
      const pond = ponds.find((p) => p.id === parseInt(pondId))
      if (pond) {
        setSelectedPond(pond)
      }
    }
  }

  // Tính toán tự động khi nồng độ hoặc thể tích thay đổi
  useEffect(() => {
    if (selectedPond && desiredSalinity >= 0 && currentSalinity >= 0) {
      const volume = selectedPond.volume // Lấy thể tích từ hồ
      const actualVolume = (waterChangePercent / 100) * volume // Thể tích thực sự sau thay đổi nước

      // Kiểm tra nếu nồng độ mong muốn nhỏ hơn nồng độ hiện tại
      if (desiredSalinity < currentSalinity) {
        const waterChangeFraction = waterChangePercent / 100

        // Không cần kiểm tra desiredSalinity == 0 vì min là 0.01
        const numberOfChanges = Math.log(desiredSalinity / currentSalinity) / Math.log(1 - waterChangeFraction)
        setWaterChanges(Math.ceil(numberOfChanges))
        setSaltNeeded(0) // Khi chỉ thay nước
      } else {
        // Tính toán lượng muối cần thêm (theo grams)
        const calculatedSaltNeeded = (desiredSalinity - currentSalinity) * volume * 10
        setSaltNeeded(calculatedSaltNeeded)
      }

      // Tính toán lượng nước cần thay
      const calculateWater = actualVolume * desiredSalinity
      setRefillAmount(calculateWater) // Cập nhật lượng nước cần bổ sung
    }
  }, [selectedPond, desiredSalinity, currentSalinity, waterChangePercent])
  return (
    <div>
      <div className='h-screen flex'>
        <LeftSideBar />
        <div
          className={`relative ${
            isDarkMode ? 'bg-custom-dark text-white' : 'bg-gray-100 text-black'
          } shadow-xl flex-1 flex-col overflow-y-auto overflow-x-hidden`}
        >
          <Header />
          <div className='py-5 px-[30px] mx-auto'>
            <TopLayout text='Salt Calculator' />
          </div>

          <div className='p-4 text-lg'>
            <label htmlFor='ponds'>Select a Pond:</label>
            <select
              id='ponds'
              className='border rounded p-2 text-black'
              onChange={handlePondChange}
              value={selectedPond ? selectedPond.id : 'all'} // Hiển thị giá trị của hồ đã chọn hoặc 'all'
            >
              <option value='all' disabled>
                All Ponds
              </option>{' '}
              {/* Thêm tùy chọn All Ponds */}
              {ponds.length > 0 ? (
                ponds.map((pond) => (
                  <option key={pond.id} value={pond.id}>
                    {pond.name}
                  </option>
                ))
              ) : (
                <option disabled>Loading ponds...</option>
              )}
            </select>
          </div>
          <div className='grid grid-cols-4 p-4 text-lg'>
            <div className='col-span-2'>
              {selectedPond ? (
                <div className=' p-4'>
                  <p>
                    <strong>Pond Volume:</strong> {selectedPond.volume} liters
                  </p>
                </div>
              ) : (
                <div className='p-4'>
                  <p>Please select a pond.</p>
                </div>
              )}

              <div className='p-4'>
                <label>
                  Current Salinity (%):
                  <input
                    type='range'
                    min='0.01'
                    max='2'
                    step='0.01'
                    value={currentSalinity}
                    onChange={(e) => setCurrentSalinity(e.target.value)}
                    className='slider-thumb'
                    style={{ '--value': `${(currentSalinity / 2) * 100}%` }} // Cập nhật biến CSS
                  />
                  <span className='ml-2'>{currentSalinity}%</span>
                </label>
              </div>

              <div className='p-4'>
                <label>
                  Desired Salinity (%):
                  <input
                    type='range'
                    min='0.01'
                    max='2'
                    step='0.01'
                    value={desiredSalinity}
                    onChange={(e) => setDesiredSalinity(e.target.value)}
                    className='slider-thumb'
                    style={{ '--value': `${(desiredSalinity / 2) * 100}%` }}
                  />
                  <span className='ml-2'>{desiredSalinity}%</span>
                </label>
              </div>

              <div className='p-4'>
                <label>
                  Water Change Percentage (%):
                  <input
                    type='range'
                    min='0'
                    max='100'
                    step='1'
                    value={waterChangePercent}
                    onChange={(e) => setWaterChangePercent(e.target.value)}
                    className='slider-thumb'
                    style={{ '--value': `${waterChangePercent}%` }}
                  />
                  <span className='ml-2'>
                    {waterChangePercent}% ({' '}
                    {selectedPond ? ((waterChangePercent / 100) * selectedPond.volume).toFixed(2) : 0} liters)
                  </span>
                </label>
              </div>
            </div>
            <div className='col-span-2 text-black border justify-center bg-white py-20 rounded shadow pl-10'>
              <h2>Notice on Salt Usage for Koi Ponds:</h2>
              <ul className='list-disc p-3'>
                <li>
                  Ideal salt concentration <strong>(0.1% - 0.3%)</strong>: to reduce stress and support fish health.
                </li>
                <li>
                  Use higher concentrations <strong>(0.5% - 2%)</strong>: only in cases of severe illness, and only for
                  short periods.
                </li>
                <li>
                  Avoid frequent use of high salt levels to protect the pond ecosystem and prevent stress to the fish.
                </li>
              </ul>
              <p className='pt-2'>
                Always monitor the fish’s health and the salt concentration in the water to maintain a stable
                environment.
              </p>
              <p>
                Note: If you're unsure about the proper salt dosage or your fish’s condition, consult with a
                veterinarian experienced.
              </p>
            </div>
          </div>
          {desiredSalinity < currentSalinity && waterChanges > 0 ? (
            <div className='min-w-full bottom-5 pr-10'>
              <div className='footer w-2/4 bg-slate-600 text-white border-solid rounded-lg mx-auto py-5 text-xl text-center'>
                <div className='row space-x-60'>
                  <label>
                    <strong>Number of Water Changes Required:</strong>
                  </label>
                  <label>{waterChanges} times</label>
                </div>
              </div>
            </div>
          ) : (
            <div className='min-w-full bottom-5 pr-10'>
              <div className='footer w-2/4 bg-slate-600 text-white border-solid rounded-lg mx-auto py-5 text-xl text-center flex flex-col justify-center items-center'>
                <div className='row flex justify-between w-full px-10'>
                  <label>
                    <strong>Amount of Salt Needed:</strong>
                  </label>
                  <label>{saltNeeded.toFixed(2)} grams</label>
                </div>
                <div className='row flex justify-between w-full px-10 mt-4'>
                  <label>
                    <strong>Per water change(refill):</strong>
                  </label>
                  <label>{refillAmount.toFixed(2)} grams</label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SaltCalculator
