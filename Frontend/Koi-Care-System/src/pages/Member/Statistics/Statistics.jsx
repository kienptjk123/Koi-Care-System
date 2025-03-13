/* eslint-disable no-unused-vars */
import axios from 'axios'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import { useDarkMode } from '../../../hooks/DarkModeContext'
import TopLayout from '../../../layouts/TopLayout'

function Statistics() {
  const { isDarkMode } = useDarkMode()
  const [water, setWater] = useState([])
  const [ponds, setPonds] = useState([])
  const [kois, setKois] = useState([])
  const [growths, setGrowths] = useState([])
  const [koiHistoryStandard, setKoiHistoryStandard] = useState([])
  const [selectedKoi, setSelectedKoi] = useState(null)
  const navigate = useNavigate()
  const [selectedPond, setSelectedPond] = useState(null)
  const [dateFilter, setDateFilter] = useState('Day')
  const [koiByPondData, setKoiByPondData] = useState([])
  const [koiGrowthData, setKoiGrowthData] = useState([])
  const [opacity, setOpacity] = useState({
    nitrite: 1,
    nitrate: 1,
    phosphate: 1,
    ammonium: 1,
    oxygen: 1,
    carbonHardness: 1,
    phValue: 1,
    hardness: 1,
    totalChlorine: 1,
    carbonDioxide: 1,
    temperature: 1,
    temp: 1,
    amountFed: 1
  })

  const basicColors = [
    '#B22222', // Firebrick (đỏ đậm)
    '#228B22', // Forest Green (xanh lá đậm)
    '#00008B', // Dark Blue
    '#FFD700', // Gold
    '#8B008B', // Dark Magenta
    '#008B8B', // Dark Cyan
    '#2F4F4F', // Dark Slate Gray
    '#8B0000', // Dark Red
    '#556B2F', // Dark Olive Green
    '#006400', // Dark Green
    '#4B0082', // Indigo
    '#483D8B', // Dark Slate Blue
    '#FF4500', // Orange Red
    '#A52A2A', // Brown
    '#DC143C', // Crimson (đỏ tươi đậm)
    '#8B4513', // Saddle Brown
    '#4682B4', // Steel Blue
    '#D2691E', // Chocolate
    '#9932CC', // Dark Orchid
    '#191970' // Midnight Blue
  ]

  let availableColors = [...basicColors]

  const handlePondChange = (e) => {
    const pondId = e.target.value
    const pond = ponds.find((p) => p.id === parseInt(pondId))

    if (pond) {
      setSelectedPond(pond)
      getWater(pondId)
      getKoiByPond(pondId)
    } else {
      setSelectedPond(null)
    }
  }

  useEffect(() => {
    if (ponds.length === 1) {
      setSelectedPond(ponds[0])
    }
  }, [ponds])

  const getPond = async () => {
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
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.error('Unauthorized access - Token expired or invalid. Logging out...')
          localStorage.removeItem('token')
          localStorage.removeItem('id')
          toast.error('Token expired navigate to login')
          navigate('/login')
        } else {
          console.error('Error fetching ponds:', error.response?.status, error.message)
        }
      } else {
        console.error('An unexpected error occurred:', error)
      }
    }
  }

  useEffect(() => {
    getPond()
  }, [])

  const getWater = async (koiPondId) => {
    try {
      const token = localStorage.getItem('token')

      const res = await axios.get(
        `https://koicaresystemv2.azurewebsites.net/api/water-parameters/getByKoiPondId/${koiPondId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setWater(res.data.data)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getWater()
  }, [])

  const getKoi = async () => {
    try {
      const token = localStorage.getItem('token')
      const id = localStorage.getItem('id')
      if (!token) {
        throw new Error('No token found')
      }

      const res = await axios.get(`https://koicaresystemv2.azurewebsites.net/api/koifishs/user/${id}/allKoi`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setKois(res.data.data)
    } catch (error) {
      console.error('Error fetching koi:', error)
    }
  }

  useEffect(() => {
    getKoi()
  }, [])

  const getKoiByPond = async (pondId) => {
    // Define pondId as a parameter here
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token found')
      }

      // Fetch all koi in the selected pond
      const koiResponse = await axios.get(
        `https://koicaresystemv2.azurewebsites.net/api/koifishs/koipond/${pondId}/allKoi`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      const kois = koiResponse.data.data
      setKoiByPondData(kois)

      // Fetch growth history for each koi and aggregate it
      const growthPromises = kois.map((koi) =>
        axios
          .get(`https://koicaresystemv2.azurewebsites.net/api/growth-history/list/${koi.id}`, {
            headers: { Authorization: `Bearer ${token}` }
          })
          .then((response) => ({
            koiName: koi.name,
            growthData: response.data.data
          }))
      )

      const growthData = await Promise.all(growthPromises)
      setKoiGrowthData(growthData) // Store aggregated growth data
    } catch (error) {
      console.error('Error fetching koi or growth history by pond:', error)
    }
  }

  useEffect(() => {
    getKoiByPond()
  }, [])

  const getGrowthHistory = async (koifishId) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token found')
      }
      const res = await axios.get(`https://koicaresystemv2.azurewebsites.net/api/growth-history/list/${koifishId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setGrowths(res.data.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          console.error('Unauthorized access - Token expired or invalid. Logging out...')
          localStorage.removeItem('token')
          localStorage.removeItem('id')
          toast.error('Token expired navigate to login')
          navigate('/login')
        } else {
          console.error('Error fetching growth history:', error.response?.status, error.message)
        }
      } else {
        console.error('An unexpected error occurred:', error)
      }
    }
  }

  useEffect(() => {
    if (selectedKoi) {
      getGrowthHistory(selectedKoi.id)
      getKoiHistoryStandard(selectedKoi.id)
    }
  }, [selectedKoi])

  const handleKoiChange = (e) => {
    const koiId = e.target.value
    const koi = kois.find((k) => k.id === parseInt(koiId))

    if (koi) {
      setSelectedKoi(koi)
      // getGrowthHistory(koiId)
      // getKoiHistoryStandard(koiId)
    } else {
      setSelectedKoi(null)
    }
  }

  const getKoiHistoryStandard = async (koifishId) => {
    try {
      const token = localStorage.getItem('token')
      if (!token) {
        throw new Error('No token found')
      }

      const res = await axios.get(`https://koicaresystemv2.azurewebsites.net/api/reports/GrowthFish/${koifishId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('koi history', res.data.data)
      const filteredData = res.data.data.slice(1)
      setKoiHistoryStandard(filteredData)
    } catch (error) {
      console.error('Error fetching koi history:', error)
    }
  }

  const handleMouseEnter = useCallback(
    (o) => {
      const { dataKey } = o
      setOpacity({ ...opacity, [dataKey]: 0.5 })
    },
    [opacity, setOpacity]
  )

  const handleMouseLeave = useCallback(
    (o) => {
      const { dataKey } = o
      setOpacity({ ...opacity, [dataKey]: 1 })
    },
    [opacity, setOpacity]
  )

  const formatDate = (date) => {
    const parsedDate = new Date(date)
    if (dateFilter === 'Day') {
      return parsedDate.toLocaleString()
    } else if (dateFilter === 'Last month') {
      return parsedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    } else if (dateFilter === 'Last year') {
      return parsedDate.getFullYear()
    }
  }

  const aggregateGrowthHistory = (data, standardData) => {
    const dateMap = {}

    // Aggregate growth data
    data.forEach((entry) => {
      const date = formatDate(entry.createDate)
      if (!dateMap[date]) {
        dateMap[date] = { name: date, length: 0, weight: 0, count: 0, lengthStandard: 0, weightStandard: 0 }
      }
      dateMap[date].length += entry.length
      dateMap[date].weight += entry.weight
      dateMap[date].count += 1
    })

    // Aggregate standard data
    standardData.forEach((entry) => {
      const date = formatDate(entry.createDate)
      if (!dateMap[date]) {
        dateMap[date] = { name: date, length: 0, weight: 0, count: 0, lengthStandard: 0, weightStandard: 0 }
      }
      dateMap[date].lengthStandard = entry.length
      dateMap[date].weightStandard = entry.weight
    })

    return Object.values(dateMap).map((entry) => ({
      name: entry.name,
      length: entry.length / entry.count,
      weight: entry.weight / entry.count,
      lengthStandard: entry.lengthStandard,
      weightStandard: entry.weightStandard
    }))
  }

  const aggregateWaterData = (data) => {
    const dateMap = {}

    data.forEach((entry) => {
      const date = formatDate(entry.createDateTime)

      if (!dateMap[date]) {
        dateMap[date] = {
          name: date,
          nitrite: 0,
          nitrate: 0,
          phosphate: 0,
          carbonHardness: 0,
          phValue: 0,
          hardness: 0,
          count: 0,
          totalChlorine: 0,
          oxygen: 0,
          carbonDioxide: 0,
          temperature: 0,
          temp: 0,
          amountFed: 0
        }
      }

      dateMap[date].nitrite += entry.nitrite
      dateMap[date].nitrate += entry.nitrate
      dateMap[date].oxygen += entry.oxygen
      dateMap[date].carbonDioxide += entry.carbonDioxide
      dateMap[date].totalChlorine += entry.totalChlorine
      dateMap[date].phosphate += entry.phosphate
      dateMap[date].carbonHardness += entry.carbonHardness
      dateMap[date].phValue += entry.phValue
      dateMap[date].hardness += entry.hardness
      dateMap[date].temp += entry.temp
      dateMap[date].temperature += entry.temperature
      dateMap[date].amountFed += entry.amountFed
      dateMap[date].count += 1
    })

    return Object.values(dateMap).map((entry) => ({
      name: entry.name,
      nitrite: entry.nitrite / entry.count,
      nitrate: entry.nitrate / entry.count,
      phosphate: entry.phosphate / entry.count,
      carbonHardness: entry.carbonHardness / entry.count,
      phValue: entry.phValue / entry.count,
      hardness: entry.hardness / entry.count,
      totalChlorine: entry.totalChlorine / entry.count,
      oxygen: entry.oxygen / entry.count,
      carbonDioxide: entry.carbonDioxide / entry.count,
      temperature: entry.temperature / entry.count,
      temp: entry.temp / entry.count,
      amountFed: entry.amountFed / entry.count
    }))
  }

  const handleFilterChange = (e) => {
    setDateFilter(e.target.value)
  }

  const sortedWaterData = aggregateWaterData(
    [...water].sort((a, b) => new Date(a.createDateTime) - new Date(b.createDateTime))
  )

  const sortedGrowthData = aggregateGrowthHistory(
    [...growths].sort((a, b) => new Date(a.createDate) - new Date(b.createDate)),
    koiHistoryStandard
  )

  const formatTooltipValue = (value) => {
    return value ? value.toFixed(2) : value
  }

  const formatDateKoi = (date) => {
    const parsedDate = new Date(date)
    if (dateFilter === 'Day') {
      return parsedDate.toLocaleDateString()
    } else if (dateFilter === 'Last month') {
      return parsedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    } else if (dateFilter === 'Last year') {
      return parsedDate.getFullYear()
    }
  }

  const aggregateKoiGrowthData = () => {
    const lengthDataMap = {}
    const weightDataMap = {}

    koiGrowthData.forEach((koi) => {
      koi.growthData.forEach((entry) => {
        const date = formatDateKoi(entry.createDate)

        if (!lengthDataMap[date]) {
          lengthDataMap[date] = { date, lengthTotal: 0, count: 0 }
        }
        if (!weightDataMap[date]) {
          weightDataMap[date] = { date, weightTotal: 0, count: 0 }
        }

        lengthDataMap[date].lengthTotal += entry.length
        weightDataMap[date].weightTotal += entry.weight
        lengthDataMap[date].count += 1
        weightDataMap[date].count += 1

        lengthDataMap[date][koi.koiName] = entry.length
        weightDataMap[date][koi.koiName] = entry.weight
      })
    })

    const lengthChartData = Object.values(lengthDataMap)
      .map((entry) => ({
        date: entry.date,
        avgLength: entry.lengthTotal / entry.count,
        ...entry
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))

    const weightChartData = Object.values(weightDataMap)
      .map((entry) => ({
        date: entry.date,
        avgWeight: entry.weightTotal / entry.count,
        ...entry
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date))

    return {
      lengthChartData,
      weightChartData
    }
  }

  const { lengthChartData, weightChartData } = aggregateKoiGrowthData()

  return (
    <div>
      <TopLayout text='Statistics' links='member/statistics' />
      <div className='pb-6 lg:text-lg text-sm flex justify-between items-center'>
        <select
          id='ponds'
          className={`${isDarkMode ? 'bg-custom-dark' : ''} border rounded-lg p-2 outline-none`}
          onChange={handlePondChange}
        >
          <option value=''>Select a pond</option>
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

        <select
          onChange={handleFilterChange}
          className={`${isDarkMode ? 'bg-custom-dark' : ''} border rounded-lg p-2 outline-none`}
        >
          <option value='Day'>Day</option>
          <option value='Last month'>Last month</option>
          <option value='Last year'>Last year</option>
        </select>
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
        className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-7'
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0, transition: { delay: 0.6 } }
          }}
          className='border py-5 rounded-lg w-full border-gray-200 shadow-lg'
        >
          <div className='lg:text-xl md:text-lg text-sm mb-4 text-center'>Nitrite - Phosphate - Ammonium (mg/l)</div>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart
              className='w-full mx-auto'
              data={sortedWaterData}
              margin={{
                top: 10,
                right: 50,
                left: 0,
                bottom: 0
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip formatter={(value) => formatTooltipValue(value)} />
              <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
              <Line
                type='monotone'
                dataKey='nitrite'
                strokeOpacity={opacity.nitrite}
                stroke='#8884d8'
                activeDot={{ r: 6, fill: '#8884d8', stroke: 'white', strokeWidth: 2 }}
              />
              <Line
                type='monotone'
                dataKey='phosphate'
                strokeOpacity={opacity.phosphate}
                stroke='#ff7300'
                activeDot={{ r: 6, fill: '#ff7300', stroke: 'white', strokeWidth: 2 }}
              />
              <Line
                type='monotone'
                dataKey='totalChlorine'
                strokeOpacity={opacity.totalChlorine}
                stroke='#387908'
                activeDot={{ r: 6, fill: '#387908', stroke: 'white', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0, transition: { delay: 0.9 } }
          }}
          className='py-5 rounded-lg border border-gray-200 shadow-lg'
        >
          <div className='lg:text-xl md:text-lg text-sm mb-4 text-center'>Carbon - PH - Hardness (dH)</div>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart
              width={500}
              height={300}
              data={sortedWaterData}
              className='w-full mx-auto'
              margin={{
                top: 5,
                right: 60
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip formatter={(value) => formatTooltipValue(value)} />
              <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
              <Line
                type='monotone'
                dataKey='carbonHardness'
                strokeOpacity={opacity.carbonHardness}
                stroke='#8884d8'
                activeDot={{ r: 6, fill: '#8884d8', stroke: 'white', strokeWidth: 2 }}
              />
              <Line
                type='monotone'
                dataKey='phValue'
                strokeOpacity={opacity.phValue}
                stroke='#82ca9d'
                activeDot={{ r: 6, fill: '#82ca9d', stroke: 'white', strokeWidth: 2 }}
              />
              <LineChart
                type='monotone'
                dataKey='hardness'
                strokeOpacity={opacity.hardness}
                stroke='#ff7300'
                activeDot={{ r: 6, fill: '#ff7300', stroke: 'white', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 100 },
            visible: { opacity: 1, x: 0, transition: { delay: 1.2 } }
          }}
          className='py-5 rounded-lg border border-gray-200 shadow-lg'
        >
          <div className='text-xl mb-4 text-center'>Temperature - Temp (C)</div>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart
              width={500}
              height={300}
              data={sortedWaterData}
              className='w-full mx-auto'
              margin={{
                top: 5,
                right: 60
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
              <Line
                type='monotone'
                dataKey='temperature'
                strokeOpacity={opacity.temperature}
                stroke='#8884d8'
                activeDot={{ r: 6, fill: '#8884d8', stroke: 'white', strokeWidth: 2 }}
              />
              <Line
                type='monotone'
                dataKey='temp'
                strokeOpacity={opacity.temp}
                stroke='#82ca9d'
                activeDot={{ r: 6, fill: '#82ca9d', stroke: 'white', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
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
        className='grid lg:grid-cols-2 grid-cols-1 gap-7 mt-10'
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, x: 0 },
            visible: { opacity: 1, x: 0, transition: { delay: 0.6 } }
          }}
          className='py-5 px-2 rounded-lg border border-gray-200 shadow-lg'
        >
          <div className='text-xl mb-4 text-center'>CO₂ - O₂ - Total Chlorine (mg/l)</div>
          <ResponsiveContainer width='100%' height={320}>
            <AreaChart
              data={sortedWaterData}
              className='w-full mx-auto'
              margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient id='nitrateColor' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#ff7300' stopOpacity={0.6} />
                  <stop offset='95%' stopColor='#ff7300' stopOpacity={0} />
                </linearGradient>
                <linearGradient id='carbonDioxideColor' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#7CF0FF' stopOpacity={0.6} />
                  <stop offset='95%' stopColor='#7CF0FF' stopOpacity={0} />
                </linearGradient>
                <linearGradient id='oxygenColor' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#4570EA' stopOpacity={0.6} />
                  <stop offset='95%' stopColor='#4570EA' stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray='3 3' opacity={0.3} />
              <XAxis dataKey='name' tick={{ fill: '#555' }} />
              <YAxis tick={{ fill: '#555' }} />
              <Tooltip
                formatter={(value) => `${formatTooltipValue(value)} mg/l`}
                contentStyle={{ backgroundColor: '#f4f4f4', borderColor: '#ddd' }}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Area type='monotone' dataKey='nitrate' stackId='1' stroke='#ff7300' fill='url(#nitrateColor)' />
              <Area
                type='monotone'
                dataKey='carbonDioxide'
                stackId='1'
                stroke='#7CF0FF'
                fill='url(#carbonDioxideColor)'
              />
              <Area type='monotone' dataKey='oxygen' stackId='1' stroke='#4570EA' fill='url(#oxygenColor)' />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, x: 0 },
            visible: { opacity: 1, x: 0, transition: { delay: 0.9 } }
          }}
          className='py-5 px-2 rounded-lg border border-gray-200 shadow-lg'
        >
          <div className='text-xl mb-4 text-center'>Amount fed (g)</div>
          <ResponsiveContainer width='100%' height={300}>
            <BarChart data={sortedWaterData}>
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip />
              <Bar dataKey='amountFed' fill='#8884d8' />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
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
        className='grid lg:grid-cols-2 grid-cols-1 gap-7 mt-10'
      >
        <motion.div className='py-5 mt-10 rounded-lg border border-gray-200 shadow-lg'>
          <div className='text-xl mb-4 text-center'>Koi Length Growth History in Pond</div>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart
              data={lengthChartData}
              className='w-full mx-auto'
              margin={{
                top: 5,
                right: 60
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip />
              <Legend />
              {koiGrowthData.map((koi, index) => {
                const colorIndex = Math.floor(Math.random() * availableColors.length)
                const color = availableColors[colorIndex]
                availableColors.splice(colorIndex, 1)
                return (
                  <Line
                    key={index}
                    type='monotone'
                    dataKey={koi.koiName}
                    stroke={color}
                    activeDot={{ r: 8 }}
                    name={`${koi.koiName}`}
                  />
                )
              })}
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className='py-5 mt-10 rounded-lg border border-gray-200 shadow-lg'>
          <div className='text-xl mb-4 text-center'>Koi Weight Growth History in Pond</div>
          <ResponsiveContainer width='100%' height={300}>
            <LineChart
              data={weightChartData}
              className='w-full mx-auto'
              margin={{
                top: 5,
                right: 60
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip />
              <Legend />
              {koiGrowthData.map((koi, index) => {
                const colorIndex = Math.floor(Math.random() * availableColors.length)
                const color = availableColors[colorIndex]
                availableColors.splice(colorIndex, 1)

                return (
                  <Line
                    key={index}
                    type='monotone'
                    dataKey={koi.koiName}
                    stroke={color}
                    activeDot={{ r: 8 }}
                    name={`${koi.koiName}`}
                  />
                )
              })}
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
      <div className='pb-6 mt-10 text-lg flex justify-between items-center'>
        <select
          id='kois'
          className={`${isDarkMode ? 'bg-custom-dark' : ''} border rounded-lg p-2 outline-none`}
          onChange={handleKoiChange}
        >
          <option value=''>Select a Koi</option>
          {kois.length > 0 ? (
            kois.map((koi) => (
              <option key={koi.id} value={koi.id}>
                {koi.name}
              </option>
            ))
          ) : (
            <option disabled>Loading kois...</option>
          )}
        </select>
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
        className='grid lg:grid-cols-2 grid-cols-1 gap-7'
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0, transition: { delay: 1.2 } }
          }}
          className='border py-5 rounded-lg w-full border-gray-200 shadow-lg'
        >
          <div className='text-xl mb-4 text-center'>Length Growth History </div>
          <ResponsiveContainer width='100%' height={300}>
            <AreaChart
              data={sortedGrowthData}
              className='w-full mx-auto'
              margin={{
                top: 5,
                right: 60
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip formatter={(value) => formatTooltipValue(value)} />
              <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
              <Area
                type='monotone'
                dataKey='length'
                stroke='#8884d8'
                fillOpacity={1}
                fill='url(#lengthColor)'
                name='length'
              />
              <Area
                type='monotone'
                dataKey='lengthStandard'
                stroke='#ff7300'
                fillOpacity={0.6}
                fill='url(#lengthStandardColor)'
                name='standard length'
              />

              <defs>
                <linearGradient id='lengthColor' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                </linearGradient>
                <linearGradient id='lengthStandardColor' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#ffc658' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#ffc658' stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, x: -100 },
            visible: { opacity: 1, x: 0, transition: { delay: 1.5 } }
          }}
          className='border py-5 rounded-lg w-full border-gray-200 shadow-lg'
        >
          <div className='text-xl mb-4 text-center'>Weight Growth History </div>
          <ResponsiveContainer width='100%' height={300}>
            <AreaChart
              className='w-full mx-auto'
              data={sortedGrowthData}
              margin={{
                top: 5,
                right: 60
              }}
            >
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='name' />
              <YAxis />
              <Tooltip formatter={(value) => formatTooltipValue(value)} />
              <Legend onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />
              <Area
                type='monotone'
                dataKey='weight'
                stroke='#82ca9d'
                fillOpacity={1}
                fill='url(#weightColor)'
                name=' weight'
              />
              <Area
                type='monotone'
                dataKey='weightStandard'
                stroke='#ff7300'
                fillOpacity={0.6}
                fill='url(#weightStandardColor)'
                name='standard weight'
              />
              <defs>
                <linearGradient id='weightStandardColor' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#ff7300' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#ff7300' stopOpacity={0} />
                </linearGradient>
              </defs>
              <defs>
                <linearGradient id='weightColor' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#82ca9d' stopOpacity={0.8} />
                  <stop offset='95%' stopColor='#82ca9d' stopOpacity={0} />
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Statistics
