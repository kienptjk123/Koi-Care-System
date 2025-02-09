/* eslint-disable no-unused-vars */

import { useEffect, useState } from 'react'
import Header from '../../../components/Member/Header'
import LeftSideBar from '../../../components/Member/LeftSideBar'
import axios, { AxiosError } from 'axios'
import { set, useForm } from 'react-hook-form'
import { FaInfoCircle } from 'react-icons/fa'
import AOS from 'aos'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import TopLayout from '../../../layouts/TopLayout'
import InfoBox from '../../../components/WaterParam/InfoBox'
import { motion } from 'framer-motion'
import { useDarkMode } from '../../../hooks/DarkModeContext'
import 'aos/dist/aos.css'
import { FaSpinner } from 'react-icons/fa'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'
import * as XLSX from 'xlsx'
import Swal from 'sweetalert2'
function WaterParameters() {
  const { isDarkMode } = useDarkMode()
  const [ponds, setPonds] = useState([])
  const [isAddFormVisible, setIsAddFormVisible] = useState(false)
  const [isEditFormVisible, setIsEditFormVisible] = useState(false)
  const [currentParameter, setCurrentParameter] = useState(null)
  const [showButtons, setShowButtons] = useState(false)
  const [parameters, setParameters] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [nitriteStyle, setNitriteStyle] = useState({})
  const [nitrateStyle, setNitrateStyle] = useState({})
  const [phosphateStyle, setPhosphateStyle] = useState({})
  const [ammoniumStyle, setAmmoniumStyle] = useState({})
  const [hardnessStyle, setHardnessStyle] = useState({})
  const [oxygenStyle, setOxygenStyle] = useState({})
  const [temperatureStyle, setTemperatureStyle] = useState({})
  const [phValueStyle, setPhValueStyle] = useState({})
  const [carbonHardnessStyle, setCarbonHardnessStyle] = useState({})
  const [carbonDioxideStyle, setCarbonDioxideStyle] = useState({})
  const [saltStyle, setSaltStyle] = useState({})
  const [totalChlorineStyle, setTotalChlorineStyle] = useState({})
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const [showInfo, setShowInfo] = useState({
    nitrate: false,
    nitrite: false,
    phosphate: false,
    ammonium: false,
    hardness: false,
    oxygen: false,
    temperature: false,
    phValue: false,
    carbonDioxide: false,
    carbonHardness: false,
    salt: false,
    totalChlorine: false
  })
  const [sortOption, setSortOption] = useState({ order: 'asc', field: 'pondName' })
  const [pageSize, setPageSize] = useState(2)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(parameters.length / pageSize)
  const paginatedParameters = parameters.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const getPond = async () => {
    try {
      const token = localStorage.getItem('token')
      const id = localStorage.getItem('id')
      const res = await axios.get(`https://koicaresystemv2.azurewebsites.net/api/koiponds/user/${id}/koiponds`, {
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

  const getParameter = async (userId) => {
    setIsLoading(true)
    setIsSubmitting(true)
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token found')
      }
      const res = await axios.get(
        `https://koicaresystemv2.azurewebsites.net/api/water-parameters/getByUserId/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const sortedData = res.data.data.sort((a, b) => new Date(b.createDateTime) - new Date(a.createDateTime))
      setParameters(sortedData)
    } catch (error) {
      console.error('Error fetching water parameters:', error)
    } finally {
      setIsLoading(false)
      setIsSubmitting(false)
    }
  }
  useEffect(() => {
    const userId = localStorage.getItem('id')
    getPond()
    if (userId) {
      getParameter(userId)
    }
    // Sắp xếp theo mặc định là ngày mới nhất
    sortParameter('desc', 'createDateTime')
  }, [])

  const toggleButtons = () => {
    setShowButtons(!showButtons)
  }

  const createParameter = async (data) => {
    setIsLoading(true)
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token found')
      }

      const res = await axios.post(
        `https://koicaresystemv2.azurewebsites.net/api/water-parameters/create`,
        {
          koiPondId: data.pondId,
          createDateTime: data.createDateTime,
          nitrite: data.nitrite,
          nitrate: data.nitrate,
          phosphate: data.phosphate,
          ammonium: data.ammonium,
          hardness: data.hardness,
          oxygen: data.oxygen,
          temperature: data.temperature,
          phValue: data.phValue,
          carbonHardness: data.carbonHardness,
          salt: data.salt,
          totalChlorine: data.totalChlorine,
          temp: data.temp,
          amountFed: data.amountFed,
          note: data.note,
          carbonDioxide: data.carbonDioxide
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      toast.success('Create Parameter successfully')
      setIsAddFormVisible(false) // Đóng form sau khi tạo thành công
      const userId = localStorage.getItem('id')
      getParameter(userId)
      sortParameter(sortOption.order, sortOption.field)
      reset() // Đặt lại form
    } catch (error) {
      console.error('Error during parameter creation: ', error)
      toast.error('Error during parameter creation')
    } finally {
      setIsSubmitting(false)
      setIsLoading(false)
    }
  }
  const updateParameter = async (data, waterId) => {
    setIsLoading(true)
    setIsSubmitting(true)

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token found')
      }

      const res = await axios.put(
        `https://koicaresystemv2.azurewebsites.net/api/water-parameters/update/${waterId}`,
        {
          koiPondId: data.pondId,
          createDateTime: data.createDateTime,
          nitrite: data.nitrite,
          nitrate: data.nitrate,
          phosphate: data.phosphate,
          ammonium: data.ammonium,
          hardness: data.hardness,
          oxygen: data.oxygen,
          temperature: data.temperature,
          phValue: data.phValue,
          carbonHardness: data.carbonHardness,
          salt: data.salt,
          totalChlorine: data.totalChlorine,
          temp: data.temp,
          amountFed: data.amountFed,
          note: data.note,
          carbonDioxide: data.carbonDioxide
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      toast.success('Update Parameter successfully')
      setIsEditFormVisible(false) // Đóng form sau khi cập nhật thành công
      const userId = localStorage.getItem('id')
      getParameter(userId) // Gọi lại getParameter để cập nhật dữ liệu mới
      reset()
    } catch (error) {
      toast.error('Update Parameter error')
      console.log(error)
    } finally {
      setIsSubmitting(false)
      setIsLoading(false)
    }
  }
  const deleteParameter = async (waterId) => {
    if (!waterId) {
      console.error('waterId is undefined or null. Cannot delete.')
      return
    }

    setIsLoading(true)
    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: 'You won’t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    })

    if (!isConfirmed) {
      setIsLoading(false)
      return
    }

    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token found')
      }

      await axios.delete(`https://koicaresystemv2.azurewebsites.net/api/water-parameters/delete/${waterId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setIsEditFormVisible(false)
      toast.success('Parameter deleted successfully')

      const userId = localStorage.getItem('id')
      if (userId) {
        getParameter(userId) // Gọi lại getParameter để cập nhật dữ liệu mới
      } else {
        console.error('User ID not found in localStorage.')
      }

      reset()
    } catch (error) {
      console.error('Error deleting parameter:', error)
      toast.error('Error deleting parameter')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data) => {
    if (currentParameter) {
      updateParameter(data, currentParameter.id)
    } else {
      updateParameter(data) // Make sure this is called for new parameters
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    clearErrors
  } = useForm()
  const toggleAddFormVisibility = () => {
    setIsAddFormVisible((prev) => !prev)
    setIsEditFormVisible(false) // Đảm bảo form chỉnh sửa bị ẩn
    setCurrentParameter(null)

    if (!isAddFormVisible) {
      // Chỉ reset khi form thêm được mở
      reset({})
      setNitriteStyle({})
      setNitrateStyle({})
      setPhosphateStyle({})
      setAmmoniumStyle({})
      setHardnessStyle({})
      setOxygenStyle({})
      setTemperatureStyle({})
      setPhValueStyle({})
      setCarbonHardnessStyle({})
      setCarbonDioxideStyle({})
      setSaltStyle({})
      setTotalChlorineStyle({})
    }
  }
  const toggleCloseForm = () => {
    setIsEditFormVisible(!isEditFormVisible)
    setIsEditFormVisible(false)
    setCurrentParameter(null)
    reset(parameters)
  }
  const toggleEditFormVisibility = (parameter) => {
    if (parameter) {
      setCurrentParameter(parameter)
      setIsEditFormVisible(true)
      setIsAddFormVisible(false)
      reset(parameter) // Reset form với giá trị của parameter

      // Cập nhật trạng thái màu sắc của các trường khi mở form
      setNitriteStyle(getStyleBasedOnValue(parameter.nitrite, 'nitrite'))
      setNitrateStyle(getStyleBasedOnValue(parameter.nitrate, 'nitrate'))
      setAmmoniumStyle(getStyleBasedOnValue(parameter.ammonium, 'ammonium'))
      setCarbonDioxideStyle(getStyleBasedOnValue(parameter.carbonDioxide, 'carbonDioxide'))
      setCarbonHardnessStyle(getStyleBasedOnValue(parameter.carbonHardness, 'carbonHardness'))
      setHardnessStyle(getStyleBasedOnValue(parameter.hardness, 'hardness'))
      setOxygenStyle(getStyleBasedOnValue(parameter.oxygen, 'oxygen'))
      setPhValueStyle(getStyleBasedOnValue(parameter.phValue, 'phValue'))
      setPhosphateStyle(getStyleBasedOnValue(parameter.phosphate, 'phosphate'))
      setSaltStyle(getStyleBasedOnValue(parameter.salt, 'salt'))
      setTemperatureStyle(getStyleBasedOnValue(parameter.temperature, 'temperature'))
      setTotalChlorineStyle(getStyleBasedOnValue(parameter.totalChlorine, 'totalChlorine'))
    }
  }
  const sortParameter = (order, field) => {
    setSortOption({ order, field }) // Lưu trạng thái sắp xếp
    let sortedArray = [...parameters]

    if (field === 'pondName') {
      sortedArray.sort((a, b) =>
        order === 'asc' ? a.koiPondName.localeCompare(b.koiPondName) : b.koiPondName.localeCompare(a.koiPondName)
      )
    } else if (field === 'createDateTime') {
      sortedArray.sort((a, b) =>
        order === 'asc'
          ? new Date(a.createDateTime) - new Date(b.createDateTime)
          : new Date(b.createDateTime) - new Date(a.createDateTime)
      )
    }

    setParameters(sortedArray)
  }

  useEffect(() => {
    reset()
  }, [parameters])
  const getStyleBasedOnValue = (value, type) => {
    let newStyle = { border: '1px solid black', color: 'black' } // Giá trị mặc định

    const numericValue = parseFloat(value)

    // Thay đổi style dựa vào loại và giá trị
    switch (type) {
      case 'nitrate':
        if (numericValue < 0 || numericValue > 500 || !/^\d+(\.\d{1,3})?$/.test(numericValue)) {
          newStyle = { border: '1px solid blue', color: 'blue' }
        } else if (numericValue <= 20) {
          newStyle = { border: '1px solid green', color: 'green' }
        } else if (numericValue <= 80) {
          newStyle = { border: '1px solid orange', color: 'orange' }
        } else {
          newStyle = { border: '1px solid red', color: 'red' }
        }
        break

      case 'nitrite':
        if (numericValue < 0 || numericValue > 50 || !/^\d+(\.\d{1,3})?$/.test(numericValue)) {
          newStyle = { border: '1px solid blue', color: 'blue' }
        } else if (numericValue <= 0.1) {
          newStyle = { border: '1px solid green', color: 'green' }
        } else if (numericValue <= 0.3) {
          newStyle = { border: '1px solid orange', color: 'orange' }
        } else {
          newStyle = { border: '1px solid red', color: 'red' }
        }
        break

      case 'phosphate':
        if (numericValue < 0 || numericValue > 50 || !/^\d+(\.\d{1,3})?$/.test(numericValue)) {
          newStyle = { border: '1px solid blue', color: 'blue' }
        } else if (numericValue <= 0.035) {
          newStyle = { border: '1px solid green', color: 'green' }
        } else if (numericValue <= 1) {
          newStyle = { border: '1px solid orange', color: 'orange' }
        } else {
          newStyle = { border: '1px solid red', color: 'red' }
        }
        break

      case 'ammonium':
        if (numericValue < 0 || numericValue > 50 || !/^\d+(\.\d{1,3})?$/.test(numericValue)) {
          newStyle = { border: '1px solid blue', color: 'blue' }
        } else if (numericValue <= 0.1) {
          newStyle = { border: '1px solid green', color: 'green' }
        } else if (numericValue <= 1) {
          newStyle = { border: '1px solid orange', color: 'orange' }
        } else {
          newStyle = { border: '1px solid red', color: 'red' }
        }
        break

      case 'hardness':
        if (numericValue < 0 || numericValue > 50 || !/^\d+(\.\d{1,1})?$/.test(numericValue)) {
          newStyle = { border: '1px solid blue', color: 'blue' }
        } else if (numericValue <= 21) {
          newStyle = { border: '1px solid green', color: 'green' }
        } else if (numericValue <= 50) {
          newStyle = { border: '1px solid orange', color: 'orange' }
        }
        break

      case 'oxygen':
        if (numericValue < 0 || numericValue > 50 || !/^\d+(\.\d{1,3})?$/.test(numericValue)) {
          newStyle = { border: '1px solid blue', color: 'blue' }
        } else if (numericValue > 6.5) {
          newStyle = { border: '1px solid green', color: 'green' }
        } else if (numericValue >= 6 && numericValue <= 6.6) {
          newStyle = { border: '1px solid orange', color: 'orange' }
        } else {
          newStyle = { border: '1px solid red', color: 'red' }
        }
        break

      case 'temperature':
        if (numericValue < 0 || numericValue > 100 || !/^\d+(\.\d{1,2})?$/.test(numericValue)) {
          newStyle = { border: '1px solid blue', color: 'blue' }
        } else if (numericValue > 4 && numericValue <= 26) {
          newStyle = { border: '1px solid green', color: 'green' }
        } else if (numericValue === 4 || numericValue === 27 || numericValue === 28) {
          newStyle = { border: '1px solid orange', color: 'orange' }
        } else {
          newStyle = { border: '1px solid red', color: 'red' }
        }
        break

      case 'phValue':
        if (numericValue < 0 || numericValue > 14 || !/^\d+(\.\d{1,2})?$/.test(numericValue)) {
          newStyle = { border: '1px solid blue', color: 'blue' }
        } else if (numericValue >= 6.9 && numericValue <= 8) {
          newStyle = { border: '1px solid green', color: 'green' }
        } else {
          newStyle = { border: '1px solid red', color: 'red' }
        }
        break

      case 'carbonHardness':
        if (numericValue < 0 || numericValue > 50 || !/^\d+(\.\d{1,2})?$/.test(numericValue)) {
          newStyle = { border: '1px solid blue', color: 'blue' }
        } else if (numericValue >= 4 && numericValue <= 49) {
          newStyle = { border: '1px solid green', color: 'green' }
        } else if (numericValue >= 1 && numericValue < 4) {
          newStyle = { border: '1px solid orange', color: 'orange' }
        } else {
          newStyle = { border: '1px solid red', color: 'red' }
        }
        break

      case 'carbonDioxide':
        if (numericValue < 0 || numericValue > 99999999 || !/^\d+(\.\d{1,3})?$/.test(numericValue)) {
          newStyle = { border: '1px solid blue', color: 'blue' }
        } else if (numericValue > 4 && numericValue <= 35) {
          newStyle = { border: '1px solid green', color: 'green' }
        } else if ((numericValue >= 1 && numericValue < 4) || numericValue < 150) {
          newStyle = { border: '1px solid orange', color: 'orange' }
        } else {
          newStyle = { border: '1px solid red', color: 'red' }
        }
        break

      case 'salt':
        if (numericValue < 0 || numericValue > 1.5 || !/^\d+(\.\d{1,3})?$/.test(numericValue)) {
          newStyle = { border: '1px solid blue', color: 'blue' }
        } else if (numericValue <= 0.1) {
          newStyle = { border: '1px solid green', color: 'green' }
        } else if (numericValue <= 0.6) {
          newStyle = { border: '1px solid orange', color: 'orange' }
        } else {
          newStyle = { border: '1px solid red', color: 'red' }
        }
        break

      case 'totalChlorine':
        if (numericValue < 0 || numericValue > 5 || !/^\d+(\.\d{1,3})?$/.test(numericValue)) {
          newStyle = { border: '1px solid blue', color: 'blue' }
        } else if (numericValue > 0 && numericValue <= 0.001) {
          newStyle = { border: '1px solid green', color: 'green' }
        } else if (numericValue > 0.001 && numericValue < 0.02) {
          newStyle = { border: '1px solid orange', color: 'orange' }
        } else {
          newStyle = { border: '1px solid red', color: 'red' }
        }
        break

      default:
        break
    }

    return newStyle
  }

  const handleChange = (e, type) => {
    const value = e.target.value
    let newStyle = {
      border: '1px solid black', // Default
      color: 'black' // Default
    }

    // Clear errors when user inputs new value
    clearErrors(type)

    // Check if input is empty
    if (value === '') {
      newStyle = {
        border: '1px solid black',
        color: 'black'
      }
    } else {
      // Convert value to number for comparison
      const numericValue = parseFloat(value)

      // Change styles based on input value
      switch (type) {
        case 'nitrate':
          if (numericValue < 0 || numericValue > 500 || !/^\d+(\.\d{1,3})?$/.test(numericValue)) {
            newStyle = {
              border: '1px solid blue',
              color: 'blue'
            }
          } else if (numericValue <= 20) {
            newStyle = {
              border: '1px solid green',
              color: 'green'
            }
          } else if (numericValue > 20 && numericValue <= 80) {
            newStyle = {
              border: '1px solid orange',
              color: 'orange'
            }
          } else {
            newStyle = {
              border: '1px solid red',
              color: 'red'
            }
          }
          break
        case 'nitrite':
          if (numericValue < 0 || numericValue > 50 || !/^\d+(\.\d{1,3})?$/.test(numericValue)) {
            newStyle = {
              border: '1px solid blue',
              color: 'blue'
            }
          } else if (numericValue <= 0.1) {
            newStyle = {
              border: '1px solid green',
              color: 'green'
            }
          } else if (numericValue > 0.1 && numericValue <= 0.3) {
            newStyle = {
              border: '1px solid orange',
              color: 'orange'
            }
          } else {
            newStyle = {
              border: '1px solid red',
              color: 'red'
            }
          }
          break
        case 'phosphate':
          if (numericValue < 0 || numericValue > 50 || !/^\d+(\.\d{1,3})?$/.test(numericValue)) {
            newStyle = {
              border: '1px solid blue',
              color: 'blue'
            }
          } else if (numericValue <= 0.035) {
            newStyle = {
              border: '1px solid green',
              color: 'green'
            }
          } else if (numericValue > 0.035 && numericValue <= 1) {
            newStyle = {
              border: '1px solid orange',
              color: 'orange'
            }
          } else {
            newStyle = {
              border: '1px solid red',
              color: 'red'
            }
          }
          break
        case 'ammonium':
          if (numericValue < 0 || numericValue > 50 || !/^\d+(\.\d{1,3})?$/.test(numericValue)) {
            newStyle = {
              border: '1px solid blue',
              color: 'blue'
            }
          } else if (numericValue <= 0.1) {
            newStyle = {
              border: '1px solid green',
              color: 'green'
            }
          } else if (numericValue > 0.1 && numericValue <= 1) {
            newStyle = {
              border: '1px solid orange',
              color: 'orange'
            }
          } else {
            newStyle = {
              border: '1px solid red',
              color: 'red'
            }
          }
          break
        case 'hardness':
          if (numericValue < 0 || numericValue > 50 || !/^\d+(\.\d{1,1})?$/.test(numericValue)) {
            newStyle = {
              border: '1px solid blue',
              color: 'blue'
            }
          } else if (numericValue <= 21) {
            newStyle = {
              border: '1px solid green',
              color: 'green'
            }
          } else if (numericValue > 21 && numericValue <= 50) {
            newStyle = {
              border: '1px solid orange',
              color: 'orange'
            }
          }
          break
        case 'oxygen':
          if (numericValue < 0 || numericValue > 50 || !/^\d+(\.\d{1,3})?$/.test(numericValue)) {
            newStyle = {
              border: '1px solid blue',
              color: 'blue'
            }
          } else if (numericValue > 6.5) {
            newStyle = {
              border: '1px solid green',
              color: 'green'
            }
          } else if (numericValue >= 6 && numericValue <= 6.6) {
            newStyle = {
              border: '1px solid orange',
              color: 'orange'
            }
          } else {
            newStyle = {
              border: '1px solid red',
              color: 'red'
            }
          }
          break
        case 'temperature':
          if (numericValue < 0 || numericValue > 100 || !/^\d+(\.\d{1,2})?$/.test(numericValue)) {
            newStyle = {
              border: '1px solid blue',
              color: 'blue'
            }
          } else if (numericValue > 4 && numericValue <= 26) {
            newStyle = {
              border: '1px solid green',
              color: 'green'
            }
          } else if (numericValue === 4 || numericValue === 27 || numericValue === 28) {
            newStyle = {
              border: '1px solid orange',
              color: 'orange'
            }
          } else {
            newStyle = {
              border: '1px solid red',
              color: 'red'
            }
          }
          break
        case 'phValue':
          if (numericValue < 0 || numericValue > 14 || !/^\d+(\.\d{1,2})?$/.test(numericValue)) {
            newStyle = {
              border: '1px solid blue',
              color: 'blue'
            }
          } else if (numericValue >= 6.9 && numericValue <= 8) {
            newStyle = {
              border: '1px solid green',
              color: 'green'
            }
          } else {
            newStyle = {
              border: '1px solid red',
              color: 'red'
            }
          }
          break
        case 'carbonHardness':
          if (numericValue < 0 || numericValue > 50 || !/^\d+(\.\d{1,2})?$/.test(numericValue)) {
            newStyle = {
              border: '1px solid blue',
              color: 'blue'
            }
          } else if (numericValue >= 4 && numericValue <= 49) {
            newStyle = {
              border: '1px solid green',
              color: 'green'
            }
          } else if (numericValue >= 1 && numericValue < 4) {
            newStyle = {
              border: '1px solid orange',
              color: 'orange'
            }
          } else {
            newStyle = {
              border: '1px solid red',
              color: 'red'
            }
          }
          break
        case 'carbonDioxide':
          if (numericValue < 0 || numericValue > 99999999 || !/^\d+(\.\d{1,3})?$/.test(numericValue)) {
            newStyle = {
              border: '1px solid blue',
              color: 'blue'
            }
          } else if (numericValue > 4 && numericValue <= 35) {
            newStyle = {
              border: '1px solid green',
              color: 'green'
            }
          } else if ((numericValue >= 1 && numericValue < 4) || numericValue < 150) {
            newStyle = {
              border: '1px solid orange',
              color: 'orange'
            }
          } else {
            newStyle = {
              border: '1px solid red',
              color: 'red'
            }
          }
          break
        case 'salt':
          if (numericValue < 0 || numericValue > 1.5 || !/^\d+(\.\d{1,3})?$/.test(numericValue)) {
            newStyle = {
              border: '1px solid blue',
              color: 'blue'
            }
          } else if (numericValue <= 0.1) {
            newStyle = {
              border: '1px solid green',
              color: 'green'
            }
          } else if (numericValue > 0.1 && numericValue <= 0.6) {
            newStyle = {
              border: '1px solid orange',
              color: 'orange'
            }
          } else {
            newStyle = {
              border: '1px solid red',
              color: 'red'
            }
          }
          break
        case 'totalChlorine':
          if (numericValue < 0 || numericValue > 5 || !/^\d+(\.\d{1,3})?$/.test(numericValue)) {
            newStyle = {
              border: '1px solid blue',
              color: 'blue'
            }
          } else if (numericValue > 0 && numericValue <= 0.001) {
            newStyle = {
              border: '1px solid green',
              color: 'green'
            }
          } else if (numericValue > 0.001 && numericValue < 0.02) {
            newStyle = {
              border: '1px solid orange',
              color: 'orange'
            }
          } else {
            newStyle = {
              border: '1px solid red',
              color: 'red'
            }
          }
          break
        default:
          break
      }
    }

    // Cập nhật kiểu dáng cho input dựa trên type
    switch (type) {
      case 'nitrate':
        setNitrateStyle(newStyle)
        break
      case 'nitrite':
        setNitriteStyle(newStyle)
        break
      case 'phosphate':
        setPhosphateStyle(newStyle)
        break
      case 'ammonium':
        setAmmoniumStyle(newStyle)
        break
      case 'hardness':
        setHardnessStyle(newStyle)
        break
      case 'oxygen':
        setOxygenStyle(newStyle)
        break
      case 'temperature':
        setTemperatureStyle(newStyle)
        break
      case 'phValue':
        setPhValueStyle(newStyle)
        break
      case 'carbonHardness':
        setCarbonHardnessStyle(newStyle)
        break
      case 'carbonDioxide':
        setCarbonDioxideStyle(newStyle)
        break
      case 'salt':
        setSaltStyle(newStyle)
        break
      case 'totalChlorine':
        setTotalChlorineStyle(newStyle)
        break
      default:
        break
    }
  }
  const toggleInfoBox = (inputName) => {
    setShowInfo((prevState) => ({
      ...prevState,
      [inputName]: !prevState[inputName] // Đảo giá trị giữa true và false
    }))
  }
  const exportWaterParametersToExcel = () => {
    // Ensure `parameters` is an array
    const data = Array.isArray(parameters) ? parameters : []

    const worksheet = XLSX.utils.json_to_sheet(
      data.map((parameter) => ({
        'Pond Name': parameter.koiPondName,
        Date: parameter.createDateTime,
        'Nitrite (NO₂)': parameter.nitrite,
        'Nitrate (NO₃)': parameter.nitrate,
        'Phosphate (PO₄)': parameter.phosphate,
        'Ammonium (NH₄)': parameter.ammonium,
        'Hardness (GH)': parameter.hardness,
        'Oxygen (O₂)': parameter.oxygen,
        'Temperature (°C)': parameter.temperature,
        'pH Value': parameter.phValue,
        'Carbon Hardness (KH)': parameter.carbonHardness,
        'Carbon Dioxide (CO₂)': parameter.carbonDioxide,
        'Salt (%)': parameter.salt,
        'Total Chlorine': parameter.totalChlorine,
        'Outdoor Temperature': parameter.temp,
        'Amount Fed (g)': parameter.amountFed,
        Note: parameter.note
      }))
    )

    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Water Parameters')

    XLSX.writeFile(workbook, 'Water_Parameters.xlsx')
  }
  return (
    <div>
      <div className='h-screen flex'>
        <LeftSideBar />

        <div
          className={`relative ${
            isDarkMode ? 'bg-custom-dark text-white' : 'bg-white text-black'
          } shadow-xl flex-1 flex-col overflow-y-auto overflow-x-hidden`}
        >
          <Header />
          <div className='w-full flex justify-end'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='fixed z-20 bottom-5 right-[40px] text-lg text-white outline-none rounded-full bg-custom-left-bar shadow-lg size-12 lg:size-16 lg:p-2 cursor-pointer'
              onClick={() => {
                toggleAddFormVisibility()
                reset()
              }}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
          </div>
          <div className='py-5 px-[30px] mx-auto max-w-[1750px]'>
            <TopLayout text='Water Parameters' links='/member/waterParameters' />

            <div className='w-full flex justify-between items-center relative mb-4'>
              <div className='cursor-pointer'>
                <button
                  onClick={exportWaterParametersToExcel}
                  className='ml-3 p-2 bg-blue-500 text-white hover:bg-blue-700 rounded-md'
                >
                  Download Excel
                </button>
              </div>
              <div className='cursor-pointer' onClick={toggleButtons}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className={`${isDarkMode ? ' text-custom-layout-light' : 'text-custom-layout-dark'} lg:size-8 size-6`}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75'
                  />
                </svg>
                <div
                  className={`absolute right-0 transition-all duration-500 -mt-3 border z-10 ease-in-out overflow-hidden ${
                    showButtons ? 'max-h-50 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div
                    className={`${
                      isDarkMode ? 'bg-custom-dark text-white' : 'bg-white text-black'
                    } flex flex-col  space-y-2 shadow-lg rounded-lg p-4`}
                  >
                    <button
                      className={`${
                        isDarkMode ? 'hover:bg-custom-layout-dark' : 'hover:bg-custom-layout-light'
                      } btn py-2 px-4 rounded text-left lg:text-xl text-xs `}
                      onClick={() => sortParameter('asc', 'pondName')}
                    >
                      Sorted by Pond Name (asc)
                    </button>
                    <button
                      className={`${
                        isDarkMode ? 'hover:bg-custom-layout-dark' : 'hover:bg-custom-layout-light'
                      } btn py-2 px-4 rounded text-left lg:text-xl text-xs `}
                      onClick={() => sortParameter('desc', 'pondName')}
                    >
                      Sorted by Pond Name (desc)
                    </button>
                    <button
                      className={`${
                        isDarkMode ? 'hover:bg-custom-layout-dark' : 'hover:bg-custom-layout-light'
                      } btn py-2 px-4 rounded text-left lg:text-xl text-xs`}
                      onClick={() => sortParameter('asc', 'createDateTime')}
                    >
                      Sorted by Date (Oldest)
                    </button>
                    <button
                      className={`${
                        isDarkMode ? 'hover:bg-custom-layout-dark' : 'hover:bg-custom-layout-light'
                      } btn py-2 px-4 rounded text-left lg:text-xl text-xs`}
                      onClick={() => sortParameter('desc', 'createDateTime')}
                    >
                      Sorted by Date (Newest)
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <motion.div
              initial='hidden'
              animate='visible'
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.3
                  }
                }
              }}
              className='py-4 w-full z-0'
            >
              <div className='flex justify-end mb-4'>
                <label htmlFor='pageSize' className='mr-2'>
                  Items per page:
                </label>
                <select
                  id='pageSize'
                  value={pageSize}
                  onChange={(e) => setPageSize(parseInt(e.target.value))}
                  className={`p-1 ${isDarkMode ? 'bg-custom-layout-dark' : 'bg-custom-layout-light'} border rounded`}
                >
                  <option value={2}>2</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 lg:gap-6 gap-4'>
                {paginatedParameters.map((parameter, index) => {
                  // Đếm số lượng các giá trị vượt ngưỡng (màu đỏ)
                  const getRedCount = (parameter) => {
                    let count = 0
                    if (parameter.nitrite > 0.3) count++
                    if (parameter.nitrate > 80) count++
                    if (parameter.phosphate > 1) count++
                    if (parameter.ammonium > 1) count++
                    if (parameter.hardness > 50) count++
                    if (parameter.oxygen <= 6) count++
                    if (parameter.temperature < 4 || parameter.temperature > 26) count++
                    if (parameter.phValue < 6.9 || parameter.phValue > 8) count++
                    if (parameter.carbonHardness < 1 || parameter.carbonHardness > 50) count++
                    if (parameter.carbonDioxide < 4 || parameter.carbonDioxide > 35) count++
                    if (parameter.salt > 0.6) count++
                    if (parameter.totalChlorine > 0.02) count++
                    return count
                  }

                  const redCount = getRedCount(parameter)
                  const borderColor = redCount > 2 ? 'red' : 'green' // Chuyển màu `border` dựa trên số lượng `h3` màu đỏ

                  return (
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: 100 },
                        visible: { opacity: 1, x: 0, transition: { delay: index * 0.2 } }
                      }}
                      key={parameter.id}
                      className={`border p-4 rounded-lg shadow ${isDarkMode ? 'bg-custom-dark' : 'bg-white'}`}
                      style={{ border: `2px solid ${borderColor}` }} // Cập nhật màu `border`
                      onClick={() => {
                        toggleEditFormVisibility(parameter)
                        reset(parameter)
                      }}
                    >
                      <div className='text-lg mb-4'>
                        <div className='grid grid-cols-4 w-full'>
                          <h3 className='lg:text-lg text-lg col-span-2 justify-center text-left'>
                            <strong>Pond Name: {parameter.koiPondName}</strong>
                          </h3>
                          <h3 className='lg:text-lg text-lg col-span-2 justify-center text-center'>
                            <strong>Date: {parameter.createDateTime.replace('T', ' ')}</strong>
                          </h3>
                        </div>
                        <table className='table-auto w-full'>
                          <thead>
                            <tr>
                              <th className='px-4 py-2'>Name</th>
                              <th className='px-4 py-2'>Value</th>
                              <th className='px-4 py-2'>Reference Value</th>
                              <th className='px-4 py-2'>Unit</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className='border px-4 py-2'>Nitrite(NO₂)</td>
                              <td
                                className='border px-4 py-2'
                                style={{
                                  color:
                                    parameter.nitrite <= 0.1 ? 'green' : parameter.nitrite <= 0.3 ? 'orange' : 'red'
                                }}
                              >
                                {parameter.nitrite}
                              </td>
                              <td className='border px-4 py-2'>0 - 0.1</td>
                              <td className='border px-4 py-2'>mg/l</td>
                            </tr>
                            <tr>
                              <td className='border px-4 py-2'>Nitrate(NO₃)</td>
                              <td
                                className='border px-4 py-2'
                                style={{
                                  color: parameter.nitrate <= 20 ? 'green' : parameter.nitrate <= 80 ? 'orange' : 'red'
                                }}
                              >
                                {parameter.nitrate}
                              </td>
                              <td className='border px-4 py-2'>0 - 20</td>
                              <td className='border px-4 py-2'>mg/l</td>
                            </tr>
                            <tr>
                              <td className='border px-4 py-2'>Phosphate(PO₄)</td>
                              <td
                                className='border px-4 py-2'
                                style={{
                                  color:
                                    parameter.phosphate <= 0.035 ? 'green' : parameter.phosphate <= 1 ? 'orange' : 'red'
                                }}
                              >
                                {parameter.phosphate}
                              </td>
                              <td className='border px-4 py-2'>0 - 0.035</td>
                              <td className='border px-4 py-2'>mg/l</td>
                            </tr>
                            <tr>
                              <td className='border px-4 py-2'>Ammonium(NH₄)</td>
                              <td
                                className='border px-4 py-2'
                                style={{
                                  color:
                                    parameter.ammonium <= 0.1 ? 'green' : parameter.ammonium <= 1 ? 'orange' : 'red'
                                }}
                              >
                                {parameter.ammonium}
                              </td>
                              <td className='border px-4 py-2'>0 - 0.1</td>
                              <td className='border px-4 py-2'>mg/l</td>
                            </tr>
                            <tr>
                              <td className='border px-4 py-2'>Hardness(GH)</td>
                              <td
                                className='border px-4 py-2'
                                style={{
                                  color:
                                    parameter.hardness <= 21 ? 'green' : parameter.hardness <= 50 ? 'orange' : 'red'
                                }}
                              >
                                {parameter.hardness}
                              </td>
                              <td className='border px-4 py-2'>0 - 21</td>
                              <td className='border px-4 py-2'>°dH</td>
                            </tr>
                            <tr>
                              <td className='border px-4 py-2'>Oxygen (O₂)</td>
                              <td
                                className='border px-4 py-2'
                                style={{
                                  color: parameter.oxygen > 6.5 ? 'green' : parameter.oxygen > 6 ? 'orange' : 'red'
                                }}
                              >
                                {parameter.oxygen}
                              </td>
                              <td className='border px-4 py-2'>&gt; 6.5</td>
                              <td className='border px-4 py-2'>mg/l</td>
                            </tr>
                            <tr>
                              <td className='border px-4 py-2'>Temperature</td>
                              <td
                                className='border px-4 py-2'
                                style={{
                                  color: parameter.temperature >= 4 && parameter.temperature <= 26 ? 'green' : 'red'
                                }}
                              >
                                {parameter.temperature}
                              </td>
                              <td className='border px-4 py-2'>5 - 26</td>
                              <td className='border px-4 py-2'>°C</td>
                            </tr>
                            <tr>
                              <td className='border px-4 py-2'>pH Value</td>
                              <td
                                className='border px-4 py-2'
                                style={{ color: parameter.phValue >= 6.9 && parameter.phValue <= 8 ? 'green' : 'red' }}
                              >
                                {parameter.phValue}
                              </td>
                              <td className='border px-4 py-2'>6.9 - 8</td>
                              <td className='border px-4 py-2'></td>
                            </tr>
                            <tr>
                              <td className='border px-4 py-2'>KH</td>
                              <td
                                className='border px-4 py-2'
                                style={{
                                  color:
                                    parameter.carbonHardness >= 4
                                      ? 'green'
                                      : parameter.carbonHardness >= 1
                                        ? 'orange'
                                        : 'red'
                                }}
                              >
                                {parameter.carbonHardness}
                              </td>
                              <td className='border px-4 py-2'>&gt;=4</td>
                              <td className='border px-4 py-2'>°dH</td>
                            </tr>
                            <tr>
                              <td className='border px-4 py-2'>CO₂</td>
                              <td
                                className='border px-4 py-2'
                                style={{
                                  color: parameter.carbonDioxide >= 4 && parameter.carbonDioxide <= 35 ? 'green' : 'red'
                                }}
                              >
                                {parameter.carbonDioxide}
                              </td>
                              <td className='border px-4 py-2'>5 - 35</td>
                              <td className='border px-4 py-2'>mg/l</td>
                            </tr>
                            <tr>
                              <td className='border px-4 py-2'>Salt</td>
                              <td
                                className='border px-4 py-2'
                                style={{
                                  color: parameter.salt <= 0.1 ? 'green' : parameter.salt <= 0.6 ? 'orange' : 'red'
                                }}
                              >
                                {parameter.salt}
                              </td>
                              <td className='border px-4 py-2'>0 - 0.1</td>
                              <td className='border px-4 py-2 '>%</td>
                            </tr>
                            <tr>
                              <td className='border px-4 py-2'>Total chlorines</td>
                              <td
                                className='border px-4 py-2'
                                style={{
                                  color:
                                    parameter.totalChlorine <= 0.001
                                      ? 'green'
                                      : parameter.totalChlorine <= 0.02
                                        ? 'orange'
                                        : 'red'
                                }}
                              >
                                {parameter.totalChlorine}
                              </td>
                              <td className='border px-4 py-2'>0 - 0.001</td>
                              <td className='border px-4 py-2'>mg/l</td>
                            </tr>
                            <tr>
                              <td className='border px-4 py-2'> Outdoor temp.</td>
                              <td className='border px-4 py-2'>{parameter.carbonHardness}</td>
                              <td className='border px-4 py-2'>-40 - 40</td>
                              <td className='border px-4 py-2'>°C</td>
                            </tr>
                            <tr>
                              <td className='border px-4 py-2'> Amount Fed</td>
                              <td className='border px-4 py-2'>{parameter.amountFed}</td>
                              <td className='border px-4 py-2'></td>
                              <td className='border px-4 py-2'>g</td>
                            </tr>
                          </tbody>
                        </table>

                        <div className='flex mt-4'>
                          <h3 className='lg:text-lg text-xs text-gray-500 font-semibold'>Note: {parameter.note}</h3>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
              <div className='flex justify-center mt-4'>
                {[...Array(totalPages).keys()].map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page + 1)}
                    className={`mx-1 px-3 py-1 rounded ${currentPage === page + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                  >
                    {page + 1}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {isAddFormVisible && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50 '>
              <div
                className={` ${
                  isDarkMode ? 'bg-custom-dark' : 'bg-white'
                }  lg:min-w-[70vh] mb-auto mt-auto p-6 rounded-lg shadow-lg lg:max-h-[75vh] max-h-[70vh] overflow-y-auto no-scroll-bar`}
              >
                <form onSubmit={handleSubmit(createParameter)} noValidate>
                  <div className='flex justify-between mb-5'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      onClick={toggleAddFormVisibility}
                      className='size-10 text-red-500 cursor-pointer'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                      />
                    </svg>

                    <button type='submit'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='size-10 text-green-500 cursor-pointer'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                        />
                      </svg>
                    </button>
                  </div>

                  <h3 className='mb-5 lg:text-2xl text-xl font-bold'>Add Parameter</h3>
                  <div className='text-black grid grid-cols-2 grid-rows-4 lg:gap-8 gap-6'>
                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='pondId'
                      >
                        Pond Name:
                      </label>
                      <select
                        id='pondId'
                        className={`mt-1 block w-full p-3 border ${
                          isDarkMode ? 'bg-custom-dark text-white' : 'bg-white'
                        }  border-black rounded-md shadow-sm`}
                        {...register('pondId', { required: 'Please select a pond' })}
                      >
                        <option value=''>Select a pond</option>
                        {ponds.map((pond) => (
                          <option key={pond.id} value={pond.id}>
                            {pond.name}
                          </option>
                        ))}
                      </select>
                      {errors.pondId && (
                        <p className='absolute left-3 text-red-500 lg:text-lg  text-sm'>{errors.pondId.message}</p>
                      )}
                    </div>
                    <div className='relative col-span-1 '>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='createDateTime'
                      >
                        Date & time
                      </label>
                      <input
                        type='datetime-local'
                        id='createDateTime'
                        className={`mt-1 block w-full p-3 border ${
                          isDarkMode ? 'bg-custom-dark text-white' : 'bg-white'
                        }  border-black rounded-md shadow-sm`}
                        max={new Date().toISOString().slice(0, 16)}
                        {...register('createDateTime', { required: 'Date Time is required' })}
                      />
                      {errors.createDateTime && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>
                          {errors.createDateTime.message}
                        </p>
                      )}
                    </div>

                    <div className='relative col-span-1'>
                      <label
                        htmlFor='nitrate'
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark   ' : 'bg-white '
                        }`}
                      >
                        Nitrate(NO₃):
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('nitrate')}
                      />
                      <InfoBox
                        title='Nitrate Information'
                        content={
                          <>
                            <strong>Optimal Range: 0 - 20 mg/l</strong>
                            <br />
                            The nitrate value can be positively influenced by large water changes.
                          </>
                        }
                        showInfo={showInfo['nitrate'] || false}
                        onClose={() => toggleInfoBox('nitrate')}
                      />
                      <input
                        type='number'
                        id='nitrate'
                        step='0.001'
                        placeholder='mg/l'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('nitrate', {
                          required: 'Nitrate is required',
                          min: { value: 0, message: 'Nitrate value cannot be below 0 mg/l' },
                          max: { value: 500, message: 'Nitrate value cannot exceed 500 mg/l' },
                          validate: (value) => /^\d+(\.\d{1,3})?$/.test(value) || 'Only have up to 3 decimal places'
                        })}
                        style={nitrateStyle}
                        onChange={(e) => handleChange(e, 'nitrate')}
                      />
                      {errors.nitrate && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>{errors.nitrate.message}</p>
                      )}
                    </div>

                    <div className='relative col-span-1'>
                      <label
                        htmlFor='nitrite'
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                      >
                        Nitrite(NO₂):
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('nitrite')}
                      />
                      <InfoBox
                        title='Nitrite Information'
                        content={
                          <>
                            <strong>Optimal Range: 0 - 0.1 mg/l</strong>
                            <br />
                            The nitrite value can only be kept low by a sufficiently large biofilter and a high
                            circulation rate of the pond water volume (0.5 - 1.0 times per hour) via the filter.
                            <br />
                            If the value is very high in the short term, the pond can be salinated to a salt content of
                            0.3% to reduce the toxicity.
                          </>
                        }
                        showInfo={showInfo['nitrite'] || false}
                        onClose={() => toggleInfoBox('nitrite')}
                      />
                      <input
                        type='number'
                        id='nitrite'
                        step='0.001'
                        placeholder='mg/l'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('nitrite', {
                          required: 'Nitrite is required',
                          min: { value: 0, message: 'Nitrite value cannot be below 0 mg/l' },
                          max: { value: 50, message: 'Nitrite value cannot exceed 50 mg/l' },
                          validate: (value) => /^\d+(\.\d{1,3})?$/.test(value) || 'Only have up to 3 decimal places'
                        })}
                        style={nitriteStyle}
                        onChange={(e) => handleChange(e, 'nitrite')}
                      />
                      {errors.nitrite && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>{errors.nitrite.message}</p>
                      )}
                    </div>

                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='phosphate'
                      >
                        Phosphate(PO₄):
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('phosphate')}
                      />
                      <InfoBox
                        title='Phosphate Information'
                        content={
                          <>
                            <strong>Optimal Range: 0 - 0.035 mg/l</strong>
                            <br />
                            The phosphate value can be positively influenced by large water changes. If the value is
                            very high in the short term, perform several small partial water changes (5% of the water
                            volume daily) and reduce the amount of food.
                          </>
                        }
                        showInfo={showInfo['phosphate'] || false}
                        onClose={() => toggleInfoBox('phosphate')}
                      />
                      <input
                        type='number'
                        id='phosphate'
                        step='0.001'
                        placeholder='mg/l'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('phosphate', {
                          required: 'Phosphate is required',
                          min: { value: 0, message: 'Phosphate value cannot be below 0 mg/l' },
                          max: { value: 50, message: 'Phosphate value cannot exceed 50 mg/l' },
                          validate: (value) => /^\d+(\.\d{1,3})?$/.test(value) || 'Only have up to 3 decimal places'
                        })}
                        style={phosphateStyle}
                        onChange={(e) => handleChange(e, 'phosphate')}
                      />
                      {errors.phosphate && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>{errors.phosphate.message}</p>
                      )}
                    </div>

                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='ammonium'
                      >
                        Ammonium(NH₄):
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('ammonium')}
                      />
                      <InfoBox
                        title='Ammonium Information'
                        content={
                          <>
                            <strong>Optimal Range: 0 - 0.1 mg/l</strong>
                            <br />
                            The ammonium value can only be kept low by a sufficiently large biofilter and a high
                            circulation rate of the pond water volume (0.5 - 1.0 times per hour) via the filter.
                          </>
                        }
                        showInfo={showInfo['ammonium'] || false}
                        onClose={() => toggleInfoBox('ammonium')}
                      />
                      <input
                        type='number'
                        id='ammonium'
                        step='0.001'
                        min={0}
                        max={50}
                        placeholder='mg/l'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('ammonium', {
                          required: 'Ammonium is required',
                          min: { value: 0, message: 'Ammonium value cannot be below 0 mg/l' },
                          max: { value: 50, message: 'Ammonium value cannot exceed 50 mg/l' },
                          validate: (value) => /^\d+(\.\d{1,3})?$/.test(value) || 'Only have up to 3 decimal places'
                        })}
                        style={ammoniumStyle}
                        onChange={(e) => handleChange(e, 'ammonium')}
                      />
                      {errors.ammonium && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>{errors.ammonium.message}</p>
                      )}
                    </div>

                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='hardness'
                      >
                        Hardness(GH):
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('hardness')}
                      />
                      <InfoBox
                        title='Hardness Information'
                        content={
                          <>
                            <strong>Optimal Range: 0 - 21 °dH</strong>
                            <br />
                            For the overall water hardness a value between 0 and 21 °dH is fine and is not of great
                            importance for keeping koi.
                          </>
                        }
                        showInfo={showInfo['hardness'] || false}
                        onClose={() => toggleInfoBox('hardness')}
                      />
                      <input
                        type='number'
                        id='hardness'
                        step='0.1'
                        placeholder='°dH'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('hardness', {
                          required: 'Hardness is required',
                          min: { value: 0, message: 'Hardness value cannot be below 0 °dH' },
                          max: { value: 50, message: 'Hardness value cannot exceed 50 °dH' },
                          validate: (value) => /^\d+(\.\d{1,1})?$/.test(value) || 'Only have up to 1 decimal places'
                        })}
                        style={hardnessStyle}
                        onChange={(e) => handleChange(e, 'hardness')}
                      />
                      {errors.hardness && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>{errors.hardness.message}</p>
                      )}
                    </div>

                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='oxygen'
                      >
                        Oxygen(O₂):
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('oxygen')}
                      />
                      <InfoBox
                        title='Oxygen Information'
                        content={
                          <>
                            <strong>Optimal Range: &gt; 6.5 mg/l</strong>
                            <br />
                            An increase of the oxygen content is possible by means of aerator pumps.
                          </>
                        }
                        showInfo={showInfo['oxygen'] || false}
                        onClose={() => toggleInfoBox('oxygen')}
                      />
                      <input
                        type='number'
                        id='oxygen'
                        placeholder='mg/l'
                        step='0.001'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('oxygen', {
                          required: 'Oxygen is required',
                          min: { value: 0, message: 'Oxygen value cannot be below 0 mg/l' },
                          max: { value: 50, message: 'Oxygen value cannot exceed 50 mg/l' },
                          validate: (value) => /^\d+(\.\d{1,3})?$/.test(value) || 'Only have up to 3 decimal places'
                        })}
                        style={oxygenStyle}
                        onChange={(e) => handleChange(e, 'oxygen')}
                      />
                      {errors.oxygen && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>{errors.oxygen.message}</p>
                      )}
                    </div>
                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='temperature'
                      >
                        Temperature:
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('temperature')}
                      />
                      <InfoBox
                        title='Temperature Information'
                        content={
                          <>
                            <strong>Optimal Range: 5 - 26 °C</strong>
                            <br />
                            When a temperature below 4 °C has been reached, heat the pond slightly. When the temperature
                            exceeds 29 °C, allow a permanent water inflow to stop further heating.
                          </>
                        }
                        showInfo={showInfo['temperature'] || false}
                        onClose={() => toggleInfoBox('temperature')}
                      />
                      <input
                        type='number'
                        placeholder='°C'
                        step='0.01'
                        id='temperature'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('temperature', {
                          required: 'Temperature is required',
                          min: { value: 0, message: 'Temperature value cannot be below 0 °C' },
                          max: { value: 100, message: 'Temperature value cannot exceed 100 °C' },
                          validate: (value) => /^\d+(\.\d{1,2})?$/.test(value) || 'Only have up to 2 decimal places'
                        })}
                        style={temperatureStyle}
                        onChange={(e) => handleChange(e, 'temperature')}
                      />
                      {errors.temperature && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>{errors.temperature.message}</p>
                      )}
                    </div>

                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='phValue'
                      >
                        pH Value:
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('phValue')}
                      />
                      <InfoBox
                        title='pH Information'
                        content={
                          <>
                            <strong>Optimal Range: 6.9 - 8 </strong>
                            <br />
                            To stabilise the pH value, it is important to have a carbonate hardness of at least 4 °dH.
                          </>
                        }
                        showInfo={showInfo['phValue'] || false}
                        onClose={() => toggleInfoBox('phValue')}
                      />
                      <input
                        type='number'
                        id='phValue'
                        step='0.01'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('phValue', {
                          required: 'pH Value is required',
                          min: { value: 0, message: 'pH Value cannot be below 0' },
                          max: { value: 14, message: 'pH Value cannot exceed 14' },
                          validate: (value) => /^\d+(\.\d{1,2})?$/.test(value) || 'Only have up to 2 decimal places'
                        })}
                        style={phValueStyle}
                        onChange={(e) => handleChange(e, 'phValue')}
                      />
                      {errors.phValue && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>{errors.phValue.message}</p>
                      )}
                    </div>
                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='carbonHardness'
                      >
                        Carbon Hardness (KH):
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('carbonHardness')}
                      />
                      <InfoBox
                        title='Carbon Hardness Information'
                        content={
                          <>
                            <strong>Optimal Range: &gt;= 4 °dH</strong>
                            <br />
                            To achieve a carbonate hardness (KH) of at least 4 °dH, water changes are necessary. Use tap
                            water for this! Also measure the KH value of the water coming from the tap. If this is also
                            too low, the water must be artificially hardened using calcium carbonate or sodium hydrogen
                            carbonate. The supplement should not be added directly to the biofilter, as this can cause
                            the filter bacteria to die. It is best to add the agent to the water at the pond return.
                          </>
                        }
                        showInfo={showInfo['carbonHardness'] || false}
                        onClose={() => toggleInfoBox('carbonHardness')}
                      />
                      <input
                        type='number'
                        placeholder='°dH'
                        step='0.01'
                        id='carbonHardness'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('carbonHardness', {
                          required: 'Carbon Hardness is required',
                          min: { value: 0, message: 'Carbon Hardness cannot be below 0 °dH' },
                          max: { value: 50, message: 'Carbon Hardness cannot exceed 50 °dH' },
                          validate: (value) => /^\d+(\.\d{1,2})?$/.test(value) || 'Only have up to 2 decimal places'
                        })}
                        style={carbonHardnessStyle}
                        onChange={(e) => handleChange(e, 'carbonHardness')}
                      />
                      {errors.carbonHardness && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>
                          {errors.carbonHardness.message}
                        </p>
                      )}
                    </div>
                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='carbonDioxide'
                      >
                        CO₂:
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('carbonDioxide')}
                      />
                      <InfoBox
                        title='Carbon Dioxide Information'
                        content={
                          <>
                            <strong>Optimal Range: 5 - 35 mg/l</strong>
                            <br />
                            The CO2 concentration in the water depends on both the pH value and the carbonate hardness
                            (KH). Thus, CO2 does not need to be measured and can be calculated automatically by
                            KoiControl. If the pH value and the KH value are good, then this is also true for the CO2
                            concentration. Moving a lot of CO2 out of the water (e.g. through a strong air supply or a
                            strong water circulation) causes the pH value to increase.
                          </>
                        }
                        showInfo={showInfo['carbonDioxide'] || false}
                        onClose={() => toggleInfoBox('carbonDioxide')}
                      />
                      <input
                        type='number'
                        placeholder='mg/l'
                        id='carbonDioxide'
                        step='0.001'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('carbonDioxide', {
                          required: 'Carbon Dioxide is required',
                          min: { value: 0, message: 'CO₂ value cannot be below 0 mg/l' },
                          max: { value: 99999999, message: 'CO₂ value cannot exceed 99999999 mg/l' },
                          validate: (value) => /^\d+(\.\d{1,3})?$/.test(value) || 'Only have up to 3 decimal places'
                        })}
                        style={carbonDioxideStyle}
                        onChange={(e) => handleChange(e, 'carbonDioxide')}
                      />
                      {errors.carbonDioxide && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>
                          {errors.carbonDioxide.message}
                        </p>
                      )}
                    </div>
                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='salt'
                      >
                        Salt:
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('salt')}
                      />
                      <InfoBox
                        title='Salt Information'
                        content={
                          <>
                            <strong>Optimal Range: 0 - 0.1 %</strong>
                            <br />
                            Normally no salt is needed in a koi pond. For certain treatments, however, the salt content
                            may be increased to 0.5% for a short time (4 - 5 days). Careful: If the salt content is over
                            0.1%, certain medicaments are NOT allowed to be administered in parallel! This especially
                            applies to medicaments which contain formalin or potassium permanganate.
                          </>
                        }
                        showInfo={showInfo['salt'] || false}
                        onClose={() => toggleInfoBox('salt')}
                      />
                      <input
                        type='number'
                        placeholder='%'
                        id='salt'
                        step='0.001'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('salt', {
                          required: 'Salt is required',
                          min: { value: 0, message: 'Salt value cannot be below 0%' },
                          max: { value: 1.5, message: 'Salt value cannot exceed 1.5%' },
                          validate: (value) => /^\d+(\.\d{1,3})?$/.test(value) || 'Only have up to 3 decimal places'
                        })}
                        style={saltStyle}
                        onChange={(e) => handleChange(e, 'salt')}
                      />
                      {errors.salt && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>{errors.salt.message}</p>
                      )}
                    </div>

                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='totalChlorine'
                      >
                        Total Chlorine:
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('totalChlorine')}
                      />
                      <InfoBox
                        title='Total Chlorine Information'
                        content={
                          <>
                            <strong>Optimal Range: 0 - 0.001 mg/l</strong>
                            <br />
                            In a lot of countries, chlorine is added to tap water supplies. However, chlorines are toxic
                            to fish (they damage the respiratory system). Thus, in regions where the tap water contains
                            chlorine, the water needs to be dechlorinated before being added to the pond.
                          </>
                        }
                        showInfo={showInfo['totalChlorine'] || false}
                        onClose={() => toggleInfoBox('totalChlorine')}
                      />
                      <input
                        type='number'
                        placeholder='mg/l'
                        id='totalChlorine'
                        step='0.001'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('totalChlorine', {
                          required: 'Total Chlorine is required',
                          min: { value: 0, message: 'Total Chlorine value cannot be below 0 mg/l' },
                          max: { value: 5, message: 'Total Chlorine value cannot exceed 5 mg/l' },
                          validate: (value) => /^\d+(\.\d{1,3})?$/.test(value) || 'Only have up to 3 decimal places'
                        })}
                        style={totalChlorineStyle}
                        onChange={(e) => handleChange(e, 'totalChlorine')}
                      />
                      {errors.totalChlorine && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>
                          {errors.totalChlorine.message}
                        </p>
                      )}
                    </div>
                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='temp'
                      >
                        Outdoor temp.:
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('temp')}
                      />
                      <InfoBox
                        title='Outdoor temp'
                        content={
                          <>
                            <strong>Optimal Range: -40 - 40 °C</strong>
                            <br />
                            The outside temperature is not relevant as long as the water temperature is within a good
                            range.
                          </>
                        }
                        showInfo={showInfo['temp'] || false}
                        onClose={() => toggleInfoBox('temp')}
                      />
                      <input
                        type='number'
                        placeholder='°C'
                        id='temp'
                        step='0.01'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black text-white' : 'bg-white border-black '
                        }`}
                        {...register('temp', {
                          required: 'Temp is required',
                          min: {
                            value: -100,
                            message: ' Outdoor temp. value cannot below -100 °C'
                          },
                          max: {
                            value: 100,
                            message: 'Outdoor temp. value cannot exceed 100 °C'
                          },
                          validate: (value) => /^\d+(\.\d{1,2})?$/.test(value) || 'Only have up to 2 decimal places'
                        })}
                      />
                      {errors.temp && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>{errors.temp.message}</p>
                      )}
                    </div>
                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='amountFed'
                      >
                        Amount fed:
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('amountFed')}
                      />
                      <InfoBox
                        title='Amount Fed'
                        content={
                          <>
                            Tracking the amount of food fed allows you to detect causalities with changes in other water
                            parameters. The ideal amount of food depends on the koi in your pond, the current water
                            temperature and the desired growth. Our food calculator takes all of these factors into
                            account to compute the recommended amount of food.
                          </>
                        }
                        showInfo={showInfo['amountFed'] || false}
                        onClose={() => toggleInfoBox('amountFed')}
                      />
                      <input
                        type='number'
                        placeholder='g'
                        id='amountFed'
                        step='0.01'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black text-white' : 'bg-white border-black '
                        }`}
                        {...register('amountFed', {
                          required: 'Amount Fed is required',
                          min: {
                            value: 0,
                            message: ' Total chlorines value cannot below 0 g'
                          },
                          max: {
                            value: 999999,
                            message: 'Total chlorines value cannot exceed 999999 g'
                          },
                          validate: (value) => /^\d+(\.\d{1,2})?$/.test(value) || 'Only have up to 2 decimal places'
                        })}
                      />
                      {errors.amountFed && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>{errors.amountFed.message}</p>
                      )}
                    </div>
                    <div className='relative col-span-2  '>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='note'
                      >
                        Note:
                      </label>
                      <textarea
                        rows='3'
                        id='note'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black text-white' : 'bg-white border-black '
                        }`}
                        {...register('note')}
                      />
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
          {isEditFormVisible && currentParameter && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-50 '>
              <div
                className={` ${
                  isDarkMode ? 'bg-custom-dark' : 'bg-white'
                }  lg:min-w-[70vh] mb-auto mt-auto p-6 rounded-lg shadow-lg lg:max-h-[75vh] max-h-[70vh] overflow-y-auto no-scroll-bar`}
              >
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div className='flex justify-between mb-5'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      onClick={toggleCloseForm}
                      className='size-10 text-red-500 cursor-pointer'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                      />
                    </svg>

                    <button type='submit'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='size-10 text-green-500 cursor-pointer'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                        />
                      </svg>
                    </button>
                  </div>

                  <h3 className='mb-5 text-2xl font-bold'>Edit Parameter</h3>
                  <div className='text-black grid grid-cols-2 grid-rows-4 lg:gap-8 gap-6'>
                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='pondId'
                      >
                        Pond Name:
                      </label>
                      <select
                        id='pondId'
                        className={`mt-1 block w-full p-3 border ${
                          isDarkMode ? 'bg-custom-dark text-white' : 'bg-white'
                        }  border-black rounded-md shadow-sm`}
                        defaultValue={currentParameter ? currentParameter.koiPondId : ''}
                        {...register('pondId', { required: 'Please select a pond' })}
                      >
                        <option value='' disabled>
                          Select a pond
                        </option>
                        {ponds.map((pond) => (
                          <option key={pond.id} value={pond.id}>
                            {pond.name}
                          </option>
                        ))}
                      </select>
                      {errors.pondId && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>{errors.pondId.message}</p>
                      )}
                    </div>
                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='createDateTime'
                      >
                        Date & time
                      </label>
                      <input
                        type='datetime-local'
                        id='createDateTime'
                        className={`mt-1 block w-full p-3 border ${
                          isDarkMode ? 'bg-custom-dark text-white' : 'bg-white'
                        }  border-black rounded-md shadow-sm`}
                        max={new Date().toISOString().slice(0, 16)}
                        {...register('createDateTime', { required: 'Date Time is required' })}
                      />
                      {errors.createDateTime && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>
                          {errors.createDateTime.message}
                        </p>
                      )}
                    </div>

                    <div className='relative col-span-1'>
                      <label
                        htmlFor='nitrate'
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                      >
                        Nitrate(NO₃):
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('nitrate')}
                      />
                      <InfoBox
                        title='Nitrate Information'
                        content={
                          <>
                            <strong>Optimal Range: 0 - 20 mg/l</strong>
                            <br />
                            The nitrate value can be positively influenced by large water changes.
                          </>
                        }
                        showInfo={showInfo['nitrate'] || false}
                        onClose={() => toggleInfoBox('nitrate')}
                      />
                      <input
                        type='number'
                        id='nitrate'
                        step='0.001'
                        placeholder='mg/l'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('nitrate', {
                          required: 'Nitrate is required',
                          min: { value: 0, message: 'Nitrate value cannot be below 0 mg/l' },
                          max: { value: 500, message: 'Nitrate value cannot exceed 500 mg/l' },
                          validate: (value) => /^\d+(\.\d{1,3})?$/.test(value) || 'Only have up to 3 decimal places'
                        })}
                        style={nitrateStyle}
                        onChange={(e) => handleChange(e, 'nitrate')}
                      />
                      {errors.nitrate && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>{errors.nitrate.message}</p>
                      )}
                    </div>
                    <div className='relative col-span-1'>
                      <label
                        htmlFor='nitrite'
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                      >
                        Nitrite(NO₂):
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('nitrite')}
                      />
                      <InfoBox
                        title='Nitrite Information'
                        content={
                          <>
                            <strong>Optimal Range: 0 - 0.1 mg/l</strong>
                            <br />
                            The nitrite value can only be kept low by a sufficiently large biofilter and a high
                            circulation rate of the pond water volume (0.5 - 1.0 times per hour) via the filter.
                            <br />
                            If the value is very high in the short term, the pond can be salinated to a salt content of
                            0.3% to reduce the toxicity.
                          </>
                        }
                        showInfo={showInfo['nitrite'] || false}
                        onClose={() => toggleInfoBox('nitrite')}
                      />
                      <input
                        type='number'
                        id='nitrite'
                        step='0.001'
                        placeholder='mg/l'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('nitrite', {
                          required: 'Nitrite is required',
                          min: { value: 0, message: 'Nitrite value cannot be below 0 mg/l' },
                          max: { value: 50, message: 'Nitrite value cannot exceed 50 mg/l' },
                          validate: (value) => /^\d+(\.\d{1,3})?$/.test(value) || 'Only have up to 3 decimal places'
                        })}
                        style={nitriteStyle}
                        onChange={(e) => handleChange(e, 'nitrite')}
                      />
                      {errors.nitrite && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>{errors.nitrite.message}</p>
                      )}
                    </div>

                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='phosphate'
                      >
                        Phosphate(PO₄):
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('phosphate')}
                      />
                      <InfoBox
                        title='Phosphate Information'
                        content={
                          <>
                            <strong>Optimal Range: 0 - 0.035 mg/l</strong>
                            <br />
                            The phosphate value can be positively influenced by large water changes. If the value is
                            very high in the short term, perform several small partial water changes (5% of the water
                            volume daily) and reduce the amount of food.
                          </>
                        }
                        showInfo={showInfo['phosphate'] || false}
                        onClose={() => toggleInfoBox('phosphate')}
                      />
                      <input
                        type='number'
                        id='phosphate'
                        step='0.001'
                        placeholder='mg/l'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('phosphate', {
                          required: 'Phosphate is required',
                          min: { value: 0, message: 'Phosphate value cannot be below 0 mg/l' },
                          max: { value: 50, message: 'Phosphate value cannot exceed 50 mg/l' },
                          validate: (value) => /^\d+(\.\d{1,3})?$/.test(value) || 'Only have up to 3 decimal places'
                        })}
                        style={phosphateStyle}
                        onChange={(e) => handleChange(e, 'phosphate')}
                      />
                      {errors.phosphate && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>{errors.phosphate.message}</p>
                      )}
                    </div>

                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='ammonium'
                      >
                        Ammonium(NH₄):
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('ammonium')}
                      />
                      <InfoBox
                        title='Ammonium Information'
                        content={
                          <>
                            <strong>Optimal Range: 0 - 0.1 mg/l</strong>
                            <br />
                            The ammonium value can only be kept low by a sufficiently large biofilter and a high
                            circulation rate of the pond water volume (0.5 - 1.0 times per hour) via the filter.
                          </>
                        }
                        showInfo={showInfo['ammonium'] || false}
                        onClose={() => toggleInfoBox('ammonium')}
                      />
                      <input
                        type='number'
                        id='ammonium'
                        step='0.001'
                        placeholder='mg/l'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('ammonium', {
                          required: 'Ammonium is required',
                          min: { value: 0, message: 'Ammonium value cannot be below 0 mg/l' },
                          max: { value: 50, message: 'Ammonium value cannot exceed 50 mg/l' },
                          validate: (value) => /^\d+(\.\d{1,3})?$/.test(value) || 'Only have up to 3 decimal places'
                        })}
                        style={ammoniumStyle}
                        onChange={(e) => handleChange(e, 'ammonium')}
                      />
                      {errors.ammonium && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>{errors.ammonium.message}</p>
                      )}
                    </div>
                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='hardness'
                      >
                        Hardness(GH):
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('hardness')}
                      />
                      <InfoBox
                        title='Hardness Information'
                        content={
                          <>
                            <strong>Optimal Range: 0 - 21 °dH</strong>
                            <br />
                            For the overall water hardness a value between 0 and 21 °dH is fine and is not of great
                            importance for keeping koi.
                          </>
                        }
                        showInfo={showInfo['hardness'] || false}
                        onClose={() => toggleInfoBox('hardness')}
                      />
                      <input
                        type='number'
                        id='hardness'
                        step='0.1'
                        placeholder='°dH'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('hardness', {
                          required: 'Hardness is required',
                          min: { value: 0, message: 'Hardness value cannot be below 0 °dH' },
                          max: { value: 50, message: 'Hardness value cannot exceed 50 °dH' },
                          validate: (value) => /^\d+(\.\d{1,1})?$/.test(value) || 'Only have up to 1 decimal places'
                        })}
                        style={hardnessStyle}
                        onChange={(e) => handleChange(e, 'hardness')}
                      />
                      {errors.hardness && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>{errors.hardness.message}</p>
                      )}
                    </div>

                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='oxygen'
                      >
                        Oxygen(O₂):
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('oxygen')}
                      />
                      <InfoBox
                        title='Oxygen Information'
                        content={
                          <>
                            <strong>Optimal Range: &gt; 6.5 mg/l</strong>
                            <br />
                            An increase of the oxygen content is possible by means of aerator pumps.
                          </>
                        }
                        showInfo={showInfo['oxygen'] || false}
                        onClose={() => toggleInfoBox('oxygen')}
                      />
                      <input
                        type='number'
                        id='oxygen'
                        placeholder='mg/l'
                        step='0.001'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('oxygen', {
                          required: 'Oxygen is required',
                          min: { value: 0, message: 'Oxygen value cannot be below 0 mg/l' },
                          max: { value: 50, message: 'Oxygen value cannot exceed 50 mg/l' },
                          validate: (value) => /^\d+(\.\d{1,3})?$/.test(value) || 'Only have up to 3 decimal places'
                        })}
                        style={oxygenStyle}
                        onChange={(e) => handleChange(e, 'oxygen')}
                      />
                      {errors.oxygen && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>{errors.oxygen.message}</p>
                      )}
                    </div>

                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='temperature'
                      >
                        Temperature:
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('temperature')}
                      />
                      <InfoBox
                        title='Temperature Information'
                        content={
                          <>
                            <strong>Optimal Range: 5 - 26 °C</strong>
                            <br />
                            When a temperature below 4 °C has been reached, heat the pond slightly. When the temperature
                            exceeds 29 °C, allow a permanent water inflow to stop further heating.
                          </>
                        }
                        showInfo={showInfo['temperature'] || false}
                        onClose={() => toggleInfoBox('temperature')}
                      />
                      <input
                        type='number'
                        placeholder='°C'
                        step='0.01'
                        id='temperature'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('temperature', {
                          required: 'Temperature is required',
                          min: { value: 0, message: 'Temperature value cannot be below 0 °C' },
                          max: { value: 100, message: 'Temperature value cannot exceed 100 °C' },
                          validate: (value) => /^\d+(\.\d{1,2})?$/.test(value) || 'Only have up to 2 decimal places'
                        })}
                        style={temperatureStyle}
                        onChange={(e) => handleChange(e, 'temperature')}
                      />
                      {errors.temperature && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>{errors.temperature.message}</p>
                      )}
                    </div>

                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='phValue'
                      >
                        pH Value:
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('phValue')}
                      />
                      <InfoBox
                        title='pH Information'
                        content={
                          <>
                            <strong>Optimal Range: 6.9 - 8 </strong>
                            <br />
                            To stabilise the pH value, it is important to have a carbonate hardness of at least 4 °dH.
                          </>
                        }
                        showInfo={showInfo['phValue'] || false}
                        onClose={() => toggleInfoBox('phValue')}
                      />
                      <input
                        type='number'
                        id='phValue'
                        step='0.01'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('phValue', {
                          required: 'pH Value is required',
                          min: { value: 0, message: 'pH Value cannot be below 0' },
                          max: { value: 14, message: 'pH Value cannot exceed 14' },
                          validate: (value) => /^\d+(\.\d{1,2})?$/.test(value) || 'Only have up to 2 decimal places'
                        })}
                        style={phValueStyle}
                        onChange={(e) => handleChange(e, 'phValue')}
                      />
                      {errors.phValue && (
                        <p className='absolute left-3 text-red-500 lg:text-lg text-sm'>{errors.phValue.message}</p>
                      )}
                    </div>
                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='carbonHardness'
                      >
                        Carbon Hardness (KH):
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('carbonHardness')}
                      />
                      <InfoBox
                        title='Carbon Hardness Information'
                        content={
                          <>
                            <strong>Optimal Range: &gt;= 4 °dH</strong>
                            <br />
                            To achieve a carbonate hardness (KH) of at least 4 °dH, water changes are necessary. Use tap
                            water for this! Also measure the KH value of the water coming from the tap. If this is also
                            too low, the water must be artificially hardened using calcium carbonate or sodium hydrogen
                            carbonate. The supplement should not be added directly to the biofilter, as this can cause
                            the filter bacteria to die. It is best to add the agent to the water at the pond return.
                          </>
                        }
                        showInfo={showInfo['carbonHardness'] || false}
                        onClose={() => toggleInfoBox('carbonHardness')}
                      />
                      <input
                        type='number'
                        placeholder='°dH'
                        step='0.01'
                        id='carbonHardness'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('carbonHardness', {
                          required: 'Carbon Hardness is required',
                          min: { value: 0, message: 'Carbon Hardness cannot be below 0 °dH' },
                          max: { value: 50, message: 'Carbon Hardness cannot exceed 50 °dH' },
                          validate: (value) => /^\d+(\.\d{1,2})?$/.test(value) || 'Only have up to 2 decimal places'
                        })}
                        style={carbonHardnessStyle}
                        onChange={(e) => handleChange(e, 'carbonHardness')}
                      />
                      {errors.carbonHardness && (
                        <p className='absolute -bottom-[16px] left-3 text-red-500 lg:text-lg text-sm'>
                          {errors.carbonHardness.message}
                        </p>
                      )}
                    </div>
                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='carbonDioxide'
                      >
                        CO₂:
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('carbonDioxide')}
                      />
                      <InfoBox
                        title='Carbon Dioxide Information'
                        content={
                          <>
                            <strong>Optimal Range: 5 - 35 mg/l</strong>
                            <br />
                            The CO2 concentration in the water depends on both the pH value and the carbonate hardness
                            (KH). Thus, CO2 does not need to be measured and can be calculated automatically by
                            KoiControl. If the pH value and the KH value are good, then this is also true for the CO2
                            concentration. Moving a lot of CO2 out of the water (e.g. through a strong air supply or a
                            strong water circulation) causes the pH value to increase.
                          </>
                        }
                        showInfo={showInfo['carbonDioxide'] || false}
                        onClose={() => toggleInfoBox('carbonDioxide')}
                      />
                      <input
                        type='number'
                        placeholder='mg/l'
                        id='carbonDioxide'
                        step='0.001'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('carbonDioxide', {
                          required: 'Carbon Dioxide is required',
                          min: { value: 0, message: 'CO₂ value cannot be below 0 mg/l' },
                          max: { value: 99999999, message: 'CO₂ value cannot exceed 99999999 mg/l' },
                          validate: (value) => /^\d+(\.\d{1,3})?$/.test(value) || 'Only have up to 3 decimal places'
                        })}
                        style={carbonDioxideStyle}
                        onChange={(e) => handleChange(e, 'carbonDioxide')}
                      />
                      {errors.carbonDioxide && (
                        <p className='absolute -bottom-[16px] left-3 text-red-500 lg:text-lg text-sm'>
                          {errors.carbonDioxide.message}
                        </p>
                      )}
                    </div>
                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='salt'
                      >
                        Salt:
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('salt')}
                      />
                      <InfoBox
                        title='Salt Information'
                        content={
                          <>
                            <strong>Optimal Range: 0 - 0.1 %</strong>
                            <br />
                            Normally no salt is needed in a koi pond. For certain treatments, however, the salt content
                            may be increased to 0.5% for a short time (4 - 5 days). Careful: If the salt content is over
                            0.1%, certain medicaments are NOT allowed to be administered in parallel! This especially
                            applies to medicaments which contain formalin or potassium permanganate.
                          </>
                        }
                        showInfo={showInfo['salt'] || false}
                        onClose={() => toggleInfoBox('salt')}
                      />
                      <input
                        type='number'
                        placeholder='%'
                        id='salt'
                        step='0.001'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('salt', {
                          required: 'Salt is required',
                          min: { value: 0, message: 'Salt value cannot be below 0%' },
                          max: { value: 1.5, message: 'Salt value cannot exceed 1.5%' },
                          validate: (value) => /^\d+(\.\d{1,3})?$/.test(value) || 'Only have up to 3 decimal places'
                        })}
                        style={saltStyle}
                        onChange={(e) => handleChange(e, 'salt')}
                      />
                      {errors.salt && (
                        <p className='absolute -bottom-[16px] left-3 text-red-500 lg:text-lg text-sm'>
                          {errors.salt.message}
                        </p>
                      )}
                    </div>

                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='totalChlorine'
                      >
                        Total Chlorine:
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('totalChlorine')}
                      />
                      <InfoBox
                        title='Total Chlorine Information'
                        content={
                          <>
                            <strong>Optimal Range: 0 - 0.001 mg/l</strong>
                            <br />
                            In a lot of countries, chlorine is added to tap water supplies. However, chlorines are toxic
                            to fish (they damage the respiratory system). Thus, in regions where the tap water contains
                            chlorine, the water needs to be dechlorinated before being added to the pond.
                          </>
                        }
                        showInfo={showInfo['totalChlorine'] || false}
                        onClose={() => toggleInfoBox('totalChlorine')}
                      />
                      <input
                        type='number'
                        placeholder='mg/l'
                        id='totalChlorine'
                        step='0.001'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black' : 'bg-white border-black '
                        }`}
                        {...register('totalChlorine', {
                          required: 'Total Chlorine is required',
                          min: { value: 0, message: 'Total Chlorine value cannot be below 0 mg/l' },
                          max: { value: 5, message: 'Total Chlorine value cannot exceed 5 mg/l' },
                          validate: (value) => /^\d+(\.\d{1,3})?$/.test(value) || 'Only have up to 3 decimal places'
                        })}
                        style={totalChlorineStyle}
                        onChange={(e) => handleChange(e, 'totalChlorine')}
                      />
                      {errors.totalChlorine && (
                        <p className='absolute -bottom-[16px] left-3 text-red-500 lg:text-lg text-sm'>
                          {errors.totalChlorine.message}
                        </p>
                      )}
                    </div>
                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='temp'
                      >
                        Outdoor temp.:
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('temp')}
                      />
                      <InfoBox
                        title='Outdoor temp'
                        content={
                          <>
                            <strong>Optimal Range: -40 - 40 °C</strong>
                            <br />
                            The outside temperature is not relevant as long as the water temperature is within a good
                            range.
                          </>
                        }
                        showInfo={showInfo['temp'] || false}
                        onClose={() => toggleInfoBox('temp')}
                      />
                      <input
                        type='number'
                        placeholder='°C'
                        id='temp'
                        step='0.01'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black text-white' : 'bg-white border-black '
                        }`}
                        {...register('temp', {
                          required: 'Temp is required',
                          min: {
                            value: -100,
                            message: ' Outdoor temp. value cannot below -100 °C'
                          },
                          max: {
                            value: 100,
                            message: 'Outdoor temp. value cannot exceed 100 °C'
                          },
                          validate: (value) => /^\d+(\.\d{1,2})?$/.test(value) || 'Only have up to 2 decimal places'
                        })}
                      />
                      {errors.temp && (
                        <p className='absolute -bottom-[16px] left-3 text-red-500 lg:text-lg text-sm'>
                          {errors.temp.message}
                        </p>
                      )}
                    </div>
                    <div className='relative col-span-1'>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='amountFed'
                      >
                        Amount fed:
                      </label>
                      <FaInfoCircle
                        style={{
                          position: 'absolute',
                          right: '10px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          fontSize: '1.25rem',
                          color: 'gray',
                          cursor: 'pointer'
                        }}
                        onClick={() => toggleInfoBox('amountFed')}
                      />
                      <InfoBox
                        title='Amount Fed'
                        content={
                          <>
                            Tracking the amount of food fed allows you to detect causalities with changes in other water
                            parameters. The ideal amount of food depends on the koi in your pond, the current water
                            temperature and the desired growth. Our food calculator takes all of these factors into
                            account to compute the recommended amount of food.
                          </>
                        }
                        showInfo={showInfo['amountFed'] || false}
                        onClose={() => toggleInfoBox('amountFed')}
                      />
                      <input
                        type='number'
                        placeholder='g'
                        id='amountFed'
                        step='0.01'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black text-white' : 'bg-white border-black '
                        }`}
                        {...register('amountFed', {
                          required: 'Amount Fed is required',
                          min: {
                            value: 0,
                            message: ' Total chlorines value cannot below 0 g'
                          },
                          max: {
                            value: 999999,
                            message: 'Total chlorines value cannot exceed 999999 g'
                          },
                          validate: (value) => /^\d+(\.\d{1,2})?$/.test(value) || 'Only have up to 2 decimal places'
                        })}
                      />
                      {errors.amountFed && (
                        <p className='absolute -bottom-[16px] left-3 text-red-500 lg:text-lg text-sm'>
                          {errors.amountFed.message}
                        </p>
                      )}
                    </div>
                    <div className='relative col-span-2  '>
                      <label
                        className={`absolute lg:text-lg text-sm font-medium -top-[8px] left-3 text-red-500 ${
                          isDarkMode ? 'bg-custom-dark ' : 'bg-white '
                        }`}
                        htmlFor='note'
                      >
                        Note:
                      </label>
                      <textarea
                        rows='3'
                        id='note'
                        className={`mt-1 block border outline-none w-full p-3 pr-10 rounded-md shadow-sm ${
                          isDarkMode ? 'bg-custom-dark border-black text-white' : 'bg-white border-black '
                        }`}
                        {...register('note')}
                      />
                    </div>
                  </div>
                </form>
                <div className='w-full flex flex-col justify-center'>
                  <button className='mx-auto' onClick={() => deleteParameter(currentParameter.id)}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='size-12 mx-auto p-2 rounded-full bg-red-500 text-white cursor-pointer mt-5'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z'
                      />
                    </svg>
                  </button>

                  <p className='text-center font-semibold'>Delete this parameter</p>
                </div>
              </div>
            </div>
          )}
          {isLoading && (
            <div className='fixed inset-0 px-4 py-2 flex items-center justify-center z-50'>
              <FaSpinner className='animate-spin text-green-500 text-6xl' />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WaterParameters
