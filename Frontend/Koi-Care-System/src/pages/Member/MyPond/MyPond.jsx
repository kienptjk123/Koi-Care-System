import 'aos/dist/aos.css'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Swal from 'sweetalert2'
import Header from '../../../components/Member/Header'
import LeftSideBar from '../../../components/Member/LeftSideBar'
import { useDarkMode } from '../../../hooks/DarkModeContext'
import '../../../index.css'
import TopLayout from '../../../layouts/TopLayout'

function MyPond() {
  const { isDarkMode } = useDarkMode()
  const [ponds, setPonds] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isAddFormVisible, setIsAddFormVisible] = useState(false)
  const [isEditFormVisible, setIsEditFormVisible] = useState(false)
  const [baseImage, setBaseImage] = useState('')
  const [koiCounts, setKoiCounts] = useState({})
  const [selectedFile, setSelectedFile] = useState(null)
  const [issue, setIssue] = useState([])
  const [showButtons, setShowButtons] = useState(false)

  const getIssue = async (koipondId) => {
    try {
      const token = localStorage.getItem('token')
      const res = await axios.get(`https://koicaresystemv2.azurewebsites.net/api/issues/latest/${koipondId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setIssue((prevData) => ({
        ...prevData,
        [koipondId]: res.data.data
      }))
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    if (ponds.length > 0) {
      ponds.forEach((pond) => {
        getIssue(pond.id)
      })
    }
  }, [ponds])

  const getKoi = async (id) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token found')
      }
      const res = await axios.get(`https://koicaresystemv2.azurewebsites.net/api/koifishs/koipond/${id}/allKoi`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      const koiCount = res.data.data.length
      setKoiCounts((prevCounts) => ({
        ...prevCounts,
        [id]: koiCount
      }))
    } catch (error) {
      console.error('Count koi error', error)
    }
  }

  useEffect(() => {
    if (ponds.length > 0) {
      ponds.forEach((pond) => {
        getKoi(pond.id)
      })
    }
  }, [ponds])

  const toggleButtons = () => {
    setShowButtons(!showButtons)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const toggleAddFormVisibility = () => {
    setIsAddFormVisible(!isAddFormVisible)
    reset({
      name: '',
      drainCount: '',
      depth: '',
      skimmer: '',
      pumpCapacity: '',
      volume: '',
      imageUrl: ''
    })
    setSelectedFile(null)
  }

  const toggleCloseForm = () => {
    setIsEditFormVisible(false)
    setSelectedFile(null)
  }

  const toggleEditFormVisibility = (pond) => {
    localStorage.setItem('pondId', pond.id)
    setIsEditFormVisible(true)
    reset({
      name: pond.name,
      drainCount: pond.drainCount,
      depth: pond.depth,
      skimmer: pond.skimmer,
      pumpCapacity: pond.pumpCapacity,
      volume: pond.volume,
      imageUrl: pond.imageUrl
    })
    setSelectedFile(null)
    setBaseImage(null)
  }

  const getPond = async () => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const id = localStorage.getItem('id')
      if (!token) {
        throw new Error('No token found')
      }
      const res = await axios.get(`https://koicaresystemv2.azurewebsites.net/api/koiponds/user/${id}/koiponds`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      setPonds(res.data.data)
      console.log(res.data.data)
    } catch (error) {
      console.error('An unexpected error occurred:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getPond()
  }, [])

  const updatePond = async (data) => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const id = localStorage.getItem('pondId')

      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('drainCount', data.drainCount)
      formData.append('depth', data.depth)
      formData.append('skimmer', data.skimmer)
      formData.append('pumpCapacity', data.pumpCapacity)
      formData.append('volume', data.volume)
      formData.append('imageUrl', data.imageUrl)
      if (selectedFile) {
        formData.append('file', selectedFile)
      }
      await axios.put(`https://koicaresystemv2.azurewebsites.net/api/koiponds/koipond/${id}/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success('Update Pond success!!')
      getPond()
      setIsAddFormVisible(false)
      setIsEditFormVisible(false)
      reset()
      setBaseImage(baseImage(null))
    } catch (error) {
      console.log('Error updating pond:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setBaseImage(reader.result)
      }
      reader.readAsDataURL(file)
      setSelectedFile(file)
    }
  }

  const createPond = async (data) => {
    setIsLoading(true)
    try {
      const token = localStorage.getItem('token')
      const formData = new FormData()
      formData.append('name', data.name)
      formData.append('drainCount', data.drainCount)
      formData.append('depth', data.depth)
      formData.append('skimmer', data.skimmer)
      formData.append('pumpCapacity', data.pumpCapacity)
      formData.append('volume', data.volume)
      formData.append('file', selectedFile)
      await axios.post(
        'https://koicaresystemv2.azurewebsites.net/api/koiponds/create',
        {
          name: data.name,
          createDate: data.date,
          drainCount: data.drainCount,
          depth: data.depth,
          skimmer: data.skimmer,
          pumpCapacity: data.pumpCapacity,
          volume: data.volume,
          file: selectedFile
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          }
        }
      )
      toast.success('Create Pond success!!')
      getPond()
      setIsAddFormVisible(false)
    } catch (error) {
      console.log('Error creating pond:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const deletePond = async (id) => {
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
      const id = localStorage.getItem('pondId')
      if (!token) {
        throw new Error('No token found')
      }
      getKoi(id)

      if (koiCounts[id] > 0) {
        toast.error('Your Pond has koi fish. Please move them to another pond before deletion!')
        setIsLoading(false)
        return
      }
      await axios.delete(`https://koicaresystemv2.azurewebsites.net/api/koiponds/koipond/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      reset()
      getPond()
      toast.success('Delete success!!')
      setIsEditFormVisible(false)
    } catch (error) {
      toast.error('Delete Pond Fail')
      setIsEditFormVisible(false)
      console.error('Error deleting pond:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const sortPonds = (name, sort) => {
    let sortedArray = [...ponds]
    console.log(sortedArray)
    if (sort === 'volume') {
      sortedArray.sort((a, b) => (name === 'asc' ? a.volume - b.volume : b.volume - a.volume))
    } else if (sort === 'name') {
      sortedArray.sort((a, b) => (name === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)))
    } else if (sort === 'koiCount') {
      sortedArray.sort((a, b) =>
        name === 'asc'
          ? (koiCounts[a.id] || 0) - (koiCounts[b.id] || 0)
          : (koiCounts[b.id] || 0) - (koiCounts[a.id] || 0)
      )
    }

    setPonds(sortedArray)
  }

  const sortVolume = (sortType) => {
    sortPonds(sortType, 'volume')
  }

  const sortByKoiCount = (sortType) => {
    sortPonds(sortType, 'koiCount')
  }

  const sortByName = (sortType) => {
    sortPonds(sortType, 'name')
  }

  const isNameDuplicate = (name) => {
    return ponds.some((pond) => pond.name.toLowerCase() === name.toLowerCase())
  }

  return (
    <div>
      <div className='h-screen flex'>
        <LeftSideBar />
        <div
          className={`relative ${
            isDarkMode ? 'bg-custom-dark text-white' : 'bg-white text-black'
          } shadow-xl flex-1 flex-col overflow-y-auto overflow-x-hidden duration-200 ease-linear`}
        >
          <Header />
          <div className='w-full flex justify-end'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='fixed z-20 bottom-2 right-5 text-lg text-white outline-none rounded-r-sm lg:rounded-r-xl bg-custom-left-bar shadow-lg size-8 lg:size-16 lg:p-2 cursor-pointer'
              onClick={() => {
                toggleAddFormVisibility()
              }}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
              />
            </svg>
            <Link to='/member/myPond/myPondLog' onMouseEnter={() => import('../MyPond/MyPondLog')}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='fixed z-20 bottom-2 right-[51px] lg:right-[84px] text-lg shadow-lg text-white rounded-l-sm lg:rounded-l-xl bg-custom-left-bar size-8 lg:size-16 lg:p-2 cursor-pointer'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z'
                />
              </svg>
            </Link>
          </div>

          <div className='py-5 px-[30px] mx-auto max-w-[1750px]'>
            <TopLayout text='My Pond' links='member/myPond' />
            <div className='w-full flex justify-end relative'>
              <div className='cursor-pointer' onClick={toggleButtons}>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className={`${isDarkMode ? ' text-custom-layout-light' : 'text-custom-layout-dark'} lg:size-8 size-6 mb-4`}
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
                    } flex flex-col space-y-2 shadow-lg rounded-lg p-4`}
                  >
                    <button
                      className={`${
                        isDarkMode ? 'hover:bg-custom-layout-dark' : 'hover:bg-custom-layout-light'
                      } btn py-2 px-4 rounded lg:text-xl text-xs `}
                      onClick={() => sortByKoiCount('desc')}
                    >
                      Sorted by Number of Fish (desc)
                    </button>
                    <button
                      className={`${
                        isDarkMode ? 'hover:bg-custom-layout-dark' : 'hover:bg-custom-layout-light'
                      } btn py-2 px-4 rounded lg:text-xl text-xs `}
                      onClick={() => sortByKoiCount('asc')}
                    >
                      Sorted by Number of Fish (asc)
                    </button>
                    <button
                      className={`${
                        isDarkMode ? 'hover:bg-custom-layout-dark' : 'hover:bg-custom-layout-light'
                      } btn py-2 px-4 rounded lg:text-xl text-xs `}
                      onClick={() => sortByName('desc')}
                    >
                      Sorted by Name (Z-A)
                    </button>
                    <button
                      className={`${
                        isDarkMode ? 'hover:bg-custom-layout-dark' : 'hover:bg-custom-layout-light'
                      } btn py-2 px-4 rounded lg:text-xl text-xs `}
                      onClick={() => sortByName('asc')}
                    >
                      Sorted by Name (A-Z)
                    </button>
                    <button
                      className={`${
                        isDarkMode ? 'hover:bg-custom-layout-dark' : 'hover:bg-custom-layout-light'
                      } btn py-2 px-4 rounded lg:text-xl text-xs `}
                      onClick={() => sortVolume('asc')}
                    >
                      Sorted by Volume (asc)
                    </button>
                    <button
                      className={`${
                        isDarkMode ? 'hover:bg-custom-layout-dark' : 'hover:bg-custom-layout-light'
                      } btn py-2 px-4 rounded lg:text-xl text-xs `}
                      onClick={() => sortVolume('desc')}
                    >
                      Sorted by Volume (desc)
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {ponds.length > 0 ? (
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
                className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-3'
              >
                {ponds.map((pond, index) => (
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, x: 100 },
                      visible: { opacity: 1, x: 0, transition: { delay: index * 0.3 } }
                    }}
                    key={pond.id}
                    whileHover={{ scale: 1.02 }}
                    className={`${
                      isDarkMode ? 'bg-custom-dark text-white' : 'bg-white text-black'
                    } rounded-xl  border duration-300 relative`}
                  >
                    <img
                      onClick={() => {
                        toggleEditFormVisibility(pond)
                        reset(pond)
                      }}
                      src={pond.imageUrl}
                      alt={pond.name}
                      className='w-full cursor-pointer lg:h-60 h-48 object-cover rounded-t-xl overflow-hidden'
                      style={{ objectFit: 'cover', filter: 'brightness(1.1) contrast(1.1)' }}
                    />
                    <div className='p-4'>
                      <div className='flex w-full pl-3'>
                        <h3 className='text-sm lg:text-base w-48 lg:w-56'>Pond:</h3>
                        <h3 className='text-sm lg:text-base font-semibold'>{pond.name}</h3>
                      </div>
                      <div className='flex w-full pl-3'>
                        <h3 className='text-sm lg:text-base w-48 lg:w-56'>Number of fish:</h3>
                        <h3 className='text-sm lg:text-base font-semibold'>
                          {koiCounts[pond.id] !== undefined ? koiCounts[pond.id] : 'Loading...'}
                        </h3>{' '}
                      </div>
                      <div className='flex w-full pl-3'>
                        <h3 className='text-sm lg:text-base w-48 lg:w-56'>Volume:</h3>
                        <h3 className='text-sm lg:text-base font-semibold'>{pond.volume} l</h3>
                      </div>
                      <div className='flex w-full pl-3'>
                        <h3 className='text-sm lg:text-base w-48 lg:w-56'>Drain Count:</h3>
                        <h3 className='text-sm lg:text-base font-semibold'>{pond.drainCount}</h3>
                      </div>
                      <div className='flex w-full pl-3'>
                        <h3 className='text-sm lg:text-base w-48 lg:w-56'>Depth:</h3>
                        <h3 className='text-sm lg:text-base font-semibold'>{pond.depth} m</h3>
                      </div>
                      <div className='flex w-full pl-3'>
                        <h3 className='text-sm lg:text-base w-48 lg:w-56'>Skimmer Count:</h3>
                        <h3 className='text-sm lg:text-base font-semibold'>{pond.skimmer}</h3>
                      </div>
                      <div className='flex w-full pl-3'>
                        <h3 className='text-sm lg:text-base w-48 lg:w-56'>Pump Capacity:</h3>
                        <h3 className='text-sm lg:text-base font-semibold'>{pond.pumpCapacity} L/min</h3>
                      </div>
                    </div>
                    {issue[pond.id] && issue[pond.id].length > 0 && (
                      <Link
                        to={`/member/myPond/myPondIssue/${pond.id}`}
                        onMouseEnter={() => import('../MyPond/MyPondIssue')}
                      >
                        <svg
                          fill='#000000'
                          width='800px'
                          height='800px'
                          viewBox='-8 0 19 19'
                          xmlns='http://www.w3.org/2000/svg'
                          className='blinking-svg absolute top-0 text-lg shadow-lg text-white rounded-tl-xl bg-red-500 size-10 lg:size-14 p-2 cursor-pointer'
                        >
                          <path d='M2.828 15.984A1.328 1.328 0 1 1 1.5 14.657a1.328 1.328 0 0 1 1.328 1.327zM1.5 13.244a1.03 1.03 0 0 1-1.03-1.03V2.668a1.03 1.03 0 0 1 2.06 0v9.548a1.03 1.03 0 0 1-1.03 1.029z' />
                        </svg>
                      </Link>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            ) : (
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
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 gap-4'>
                  {[...Array(6)].map((_, index) => (
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: 100 },
                        visible: { opacity: 1, x: 0, transition: { delay: index * 0.3 } }
                      }}
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      className={`${
                        isDarkMode ? 'bg-custom-dark text-white' : 'bg-white text-black'
                      } rounded-xl border duration-300 relative`}
                    >
                      <Skeleton height={240} className='w-full lg:h-60 h-48 rounded-t-xl' />

                      <div className='p-4 flex'>
                        <div className='grid grid-rows-7 w-[30%]'>
                          <Skeleton className='text-sm lg:text-base w-48 lg:w-56' />
                          <Skeleton className='text-sm lg:text-base w-48 lg:w-56' />
                          <Skeleton className='text-sm lg:text-base w-48 lg:w-56' />
                          <Skeleton className='text-sm lg:text-base w-48 lg:w-56' />
                          <Skeleton className='text-sm lg:text-base w-48 lg:w-56' />
                          <Skeleton className='text-sm lg:text-base w-48 lg:w-56' />
                          <Skeleton className='text-sm lg:text-base w-48 lg:w-56' />
                        </div>
                        <div className='grid grid-rows-7'>
                          <Skeleton width={100} height={16} className='ml-20' />
                          <Skeleton width={50} height={16} className='ml-20' />
                          <Skeleton width={50} height={16} className='ml-20' />
                          <Skeleton width={50} height={16} className='ml-20' />
                          <Skeleton width={50} height={16} className='ml-20' />
                          <Skeleton width={50} height={16} className='ml-20' />
                          <Skeleton width={50} height={16} className='ml-20' />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {isAddFormVisible && (
              <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-40'>
                <div
                  className={` ${
                    isDarkMode ? 'bg-custom-dark' : 'bg-white'
                  }  lg:min-w-[80vh] m-auto p-6 rounded-lg shadow-lg`}
                >
                  <form onSubmit={handleSubmit(createPond)} noValidate>
                    <div className='flex justify-between mb-5'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        onClick={() => {
                          reset()
                          setBaseImage(null)
                          toggleAddFormVisibility()
                        }}
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
                            d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                          />
                        </svg>
                      </button>
                    </div>
                    <h3 className='mb-5 text-xl lg:text-2xl font-bold'>Add a Pond</h3>
                    <div className='grid grid-cols-2 grid-rows-4 gap-6'>
                      <div
                        id='imageSingle'
                        className='lg:mb-6 col-span-1 row-span-2 h-full w-full flex rounded-lg  items-center justify-center border border-black'
                      >
                        {baseImage ? (
                          <div className='pre-upload max-w-[40vw] relative lg:max-h-[154px] w-full h-full'>
                            <img src={baseImage} alt='Preview' className='absolute w-full h-full object-cover' />
                            <input
                              type='file'
                              id='upload-input'
                              className='absolute h-full w-full opacity-0 object-cover'
                              accept='image/*'
                              {...register('file')}
                              onChange={handleImageChange}
                            />

                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='size-5 absolute text-white -top-3 -right-2 rounded-full bg-red-500'
                              onClick={() => setBaseImage(null)}
                            >
                              <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
                            </svg>
                          </div>
                        ) : (
                          <label className='pre-upload flex flex-col items-center justify-center text-center cursor-pointer'>
                            <div className='relative'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width={16}
                                height={16}
                                fill='currentColor'
                                className='mx-auto text-gray-500 inline-block w-10 h-10'
                                viewBox='0 0 16 16'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z'
                                />
                                <path d='M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z' />
                              </svg>
                              <div className='py-3 text-sm lg:text-xl'>
                                <span>Choose images here</span>
                              </div>
                            </div>

                            <input
                              type='file'
                              id='upload-input'
                              className='absolute ml-20 opacity-0'
                              accept='image/*'
                              {...register('file')}
                              onChange={handleImageChange}
                            />
                          </label>
                        )}
                      </div>
                      <div className='lg:mb-4 relative col-span-1'>
                        <label
                          htmlFor='name'
                          className={`absolute block -top-[12px] ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } left-3 lg:text-lg text-sm text-red-500 font-semibold`}
                        >
                          Name:
                        </label>
                        <input
                          type='text'
                          id='name'
                          placeholder='Enter name'
                          className={`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } border border-black  rounded-lg focus:outline-none transition-colors duration-200`}
                          {...register('name', {
                            required: 'Name is required',
                            validate: (value) => !isNameDuplicate(value) || 'Name already exists'
                          })}
                        />
                        {errors.name && (
                          <p className='text-red-500 absolute lg:text-lg text-sm'>{errors.name.message}</p>
                        )}
                      </div>

                      <div className='lg:mb-4 relative col-span-1'>
                        <label
                          htmlFor='volume'
                          className={`absolute lg:text-lg text-sm -top-[12px] left-3 text-red-500 ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } font-semibold`}
                        >
                          Volume:
                        </label>
                        <input
                          type='number'
                          id='volume'
                          placeholder='Enter volume'
                          className={`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } border border-black rounded-lg focus:outline-none transition-colors duration-200`}
                          {...register('volume', {
                            required: 'Volume is required',
                            min: { value: 0, message: 'Volume is must more than 0' }
                          })}
                        />
                        {errors.volume && (
                          <p className='text-red-500 absolute lg:text-lg text-sm'>{errors.volume.message}</p>
                        )}
                      </div>

                      <div className='lg:mb-4 relative col-span-1'>
                        <label
                          htmlFor='depth'
                          className={`absolute lg:text-lg text-sm -top-[12px] left-3 text-red-500 ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } font-semibold`}
                        >
                          Depth (m)
                        </label>
                        <input
                          type='number'
                          id='depth'
                          placeholder='Enter depth in meters'
                          className={`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } border border-black rounded-lg focus:outline-none transition-colors duration-200`}
                          {...register('depth', {
                            required: 'Depth is required',
                            min: { value: 0, message: 'Depth is must more than 0' }
                          })}
                        />
                        {errors.depth && (
                          <p className='text-red-500 absolute lg:text-lg text-sm'>{errors.depth.message}</p>
                        )}
                      </div>

                      <div className='lg:mb-4 relative col-span-1'>
                        <label
                          htmlFor='drainCount'
                          className={`absolute -top-[12px] lg:text-lg text-sm left-3 text-red-500 ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } font-semibold`}
                        >
                          Drain Count
                        </label>
                        <input
                          type='number'
                          id='drainCount'
                          placeholder='Enter drain count'
                          className={`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } border border-black rounded-lg focus:outline-none transition-colors duration-200`}
                          {...register('drainCount', {
                            required: 'Drain Count is required',
                            min: { value: 0, message: 'Drain count is must more than 0' }
                          })}
                        />
                        {errors.drainCount && (
                          <p className='text-red-500 absolute lg:text-lg text-sm'>{errors.drainCount.message}</p>
                        )}
                      </div>

                      <div className='lg:mb-4 relative col-span-1'>
                        <label
                          htmlFor='skimmerCount'
                          className={`absolute -top-[12px] lg:text-lg text-sm left-3 text-red-500 ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } font-semibold`}
                        >
                          Skimmer Count
                        </label>
                        <input
                          type='number'
                          id='skimmerCount'
                          placeholder='Enter skimmer count'
                          className={`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } border border-black rounded-lg focus:outline-none transition-colors duration-200`}
                          {...register('skimmer', {
                            required: 'Skimmer is required',
                            min: { value: 0, message: 'Skimmer count count is must more than 0' }
                          })}
                        />
                        {errors.skimmer && (
                          <p className='text-red-500 absolute lg:text-lg text-sm'>{errors.skimmer.message}</p>
                        )}
                      </div>

                      <div className='lg:mb-4 relative col-span-1'>
                        <label
                          htmlFor='pumpCapacity'
                          className={`absolute -top-[12px] lg:text-lg text-sm left-3 text-red-500 ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } font-semibold`}
                        >
                          Pumping Capacity
                        </label>
                        <input
                          type='number'
                          id='pumpCapacity'
                          placeholder='Enter pumping capacity'
                          className={`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } border border-black rounded-lg focus:outline-none transition-colors duration-200`}
                          {...register('pumpCapacity', {
                            required: 'Pump Capacity is required',
                            min: { value: 0, message: 'Pump Capacity is must more than 0' }
                          })}
                        />
                        {errors.pumpCapacity && (
                          <p className='text-red-500 absolute lg:text-lg text-sm'>{errors.pumpCapacity.message}</p>
                        )}
                      </div>

                      <div className='mb-4 relative col-span-1'>
                        <label
                          htmlFor='pumpCapacity'
                          className={`absolute -top-[12px] lg:text-lg text-sm  left-3 text-red-500 ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } font-semibold`}
                        >
                          Date:
                        </label>
                        <input
                          type='date'
                          id='date'
                          className={`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } border border-black rounded-lg focus:outline-none transition-colors duration-200`}
                          {...register('date', { required: 'Date is required' })}
                        />
                        {errors.date && (
                          <p className='text-red-500 absolute lg:text-lg text-sm'>{errors.date.message}</p>
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {isEditFormVisible && (
              <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end z-40'>
                <div
                  className={`${
                    isDarkMode ? 'bg-custom-dark' : 'bg-white'
                  } lg:min-w-[80vh] m-auto p-6 rounded-lg shadow-lg`}
                >
                  <form onSubmit={handleSubmit(updatePond)} noValidate>
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
                            d='M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                          />
                        </svg>
                      </button>
                    </div>
                    <h3 className='mb-5 text-xl lg:text-2xl font-bold'>Edit Pond</h3>
                    <div className='grid grid-cols-2 grid-rows-4 gap-6'>
                      <div
                        id='imageSingle'
                        className='lg:mb-6 col-span-1 row-span-2 h-full w-full flex rounded-lg  items-center justify-center border border-black'
                      >
                        {baseImage ? (
                          <div className='pre-upload max-w-[40vw] relative lg:max-h-[154px] w-full h-full'>
                            <img src={baseImage} alt='Preview' className='absolute w-full h-full object-cover' />
                            <input
                              type='file'
                              id='upload-input'
                              className='absolute h-full w-full opacity-0 object-cover'
                              accept='image/*'
                              {...register('file')}
                              onChange={handleImageChange}
                            />

                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                              strokeWidth={1.5}
                              stroke='currentColor'
                              className='size-5 absolute text-white -top-3 -right-2 rounded-full bg-red-500'
                              onClick={() => setBaseImage(null)}
                            >
                              <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
                            </svg>
                          </div>
                        ) : (
                          <label className='pre-upload flex flex-col items-center justify-center text-center cursor-pointer'>
                            <div className='relative'>
                              <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width={16}
                                height={16}
                                fill='currentColor'
                                className='mx-auto text-gray-500 inline-block w-10 h-10'
                                viewBox='0 0 16 16'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z'
                                />
                                <path d='M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z' />
                              </svg>
                              <div className='py-3 text-sm lg:text-xl'>
                                <span>Choose images here</span>
                              </div>
                            </div>

                            <input
                              type='file'
                              id='upload-input'
                              className='absolute ml-20 opacity-0'
                              accept='image/*'
                              {...register('file')}
                              onChange={handleImageChange}
                            />
                          </label>
                        )}
                      </div>
                      <div className='lg:mb-4 relative col-span-1'>
                        <label
                          htmlFor='name'
                          className={`absolute block -top-[12px] ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } left-3 lg:text-lg text-sm text-red-500 font-semibold`}
                        >
                          Name:
                        </label>
                        <input
                          type='text'
                          id='name'
                          placeholder='Enter name'
                          className={`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } border border-black  rounded-lg focus:outline-none transition-colors duration-200`}
                          {...register('name', {
                            required: 'Name is required'
                          })}
                        />
                        {errors.name && (
                          <p className='text-red-500 absolute lg:text-lg text-sm'>{errors.name.message}</p>
                        )}
                      </div>

                      <div className='lg:mb-4 relative col-span-1'>
                        <label
                          htmlFor='volume'
                          className={`absolute lg:text-lg text-sm -top-[12px] left-3 text-red-500 ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } font-semibold`}
                        >
                          Volume:
                        </label>
                        <input
                          type='number'
                          id='volume'
                          placeholder='Enter volume'
                          className={`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } border border-black rounded-lg focus:outline-none transition-colors duration-200`}
                          {...register('volume', {
                            required: 'Volume is required',
                            min: { value: 0, message: 'Volume is must more than 0' }
                          })}
                        />
                        {errors.volume && (
                          <p className='text-red-500 absolute lg:text-lg text-sm'>{errors.volume.message}</p>
                        )}
                      </div>

                      <div className='lg:mb-4 relative col-span-1'>
                        <label
                          htmlFor='depth'
                          className={`absolute lg:text-lg text-sm -top-[12px] left-3 text-red-500 ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } font-semibold`}
                        >
                          Depth (m)
                        </label>
                        <input
                          type='number'
                          id='depth'
                          placeholder='Enter depth in meters'
                          className={`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } border border-black rounded-lg focus:outline-none transition-colors duration-200`}
                          {...register('depth', {
                            required: 'Depth is required',
                            min: { value: 0, message: 'Depth is must more than 0' }
                          })}
                        />
                        {errors.depth && (
                          <p className='text-red-500 absolute lg:text-lg text-sm'>{errors.depth.message}</p>
                        )}
                      </div>

                      <div className='lg:mb-4 relative col-span-1'>
                        <label
                          htmlFor='drainCount'
                          className={`absolute -top-[12px] lg:text-lg text-sm left-3 text-red-500 ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } font-semibold`}
                        >
                          Drain Count
                        </label>
                        <input
                          type='number'
                          id='drainCount'
                          placeholder='Enter drain count'
                          className={`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } border border-black rounded-lg focus:outline-none transition-colors duration-200`}
                          {...register('drainCount', {
                            required: 'Drain Count is required',
                            min: { value: 0, message: 'Drain Count Capacity is must more than 0' }
                          })}
                        />
                        {errors.drainCount && (
                          <p className='text-red-500 absolute lg:text-lg text-sm'>{errors.drainCount.message}</p>
                        )}
                      </div>

                      <div className='lg:mb-4 relative col-span-1'>
                        <label
                          htmlFor='skimmerCount'
                          className={`absolute -top-[12px] lg:text-lg text-sm left-3 text-red-500 ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } font-semibold`}
                        >
                          Skimmer Count
                        </label>
                        <input
                          type='number'
                          id='skimmerCount'
                          placeholder='Enter skimmer count'
                          className={`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } border border-black rounded-lg focus:outline-none transition-colors duration-200`}
                          {...register('skimmer', {
                            required: 'Skimmer is required',
                            min: { value: 0, message: 'Skimmer Count Capacity is must more than 0' }
                          })}
                        />
                        {errors.skimmer && (
                          <p className='text-red-500 absolute lg:text-lg text-sm'>{errors.skimmer.message}</p>
                        )}
                      </div>

                      <div className='lg:mb-4 relative col-span-1'>
                        <label
                          htmlFor='pumpCapacity'
                          className={`absolute -top-[12px] lg:text-lg text-sm left-3 text-red-500 ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } font-semibold`}
                        >
                          Pumping Capacity
                        </label>
                        <input
                          type='number'
                          id='pumpCapacity'
                          placeholder='Enter pumping capacity'
                          className={`w-full lg:p-3 px-2 py-1 lg:text-lg text-sm ${
                            isDarkMode ? 'bg-custom-dark' : 'bg-white'
                          } border border-black rounded-lg focus:outline-none transition-colors duration-200`}
                          {...register('pumpCapacity', {
                            required: 'Pump Capacity is required',
                            min: { value: 0, message: 'Pump Capacity Capacity is must more than 0' }
                          })}
                        />
                        {errors.pumpCapacity && (
                          <p className='text-red-500 absolute lg:text-lg text-sm'>{errors.pumpCapacity.message}</p>
                        )}
                      </div>
                    </div>
                  </form>
                  <div className='w-full flex flex-col justify-center'>
                    <button className='mx-auto' onClick={() => deletePond()}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='lg:size-12 size-8 mx-auto lg:p-2 p-1 rounded-full bg-red-500 text-white cursor-pointer mt-5'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z'
                        />
                      </svg>
                    </button>

                    <p className='text-center font-semibold'>Delete this pond</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyPond
