import { useRoutes } from 'react-router-dom'
import './App.css'
import path from './constants/path'
import { ToastContainer } from 'react-toastify'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Member from './pages/Member/Member'
import Dashboard from './pages/Member/Dashboard/Dashboard'
import MyKoi from './pages/Member/MyKoi/MyKoi'
import WaterParameters from './pages/Member/WaterParameters/WaterParameters'
import Reminders from './pages/Member/Reminders/Reminders'
import Recommendations from './pages/Member/Recommendations/Recommendations'
import FoodCalculator from './pages/Member/FoodCalculator/FoodCalculator'
import SaltCalculator from './pages/Member/SaltCalculator/SaltCalculator'
import Statistics from './pages/Member/Statistics/Statistics'
import News from './pages/Member/News/News'

function App() {
  const routeElements = useRoutes([
    {
      path: path.home,
      element: <Home />
    },
    {
      path: path.login,
      element: <Login />
    },
    {
      path: path.register,
      element: <Register />
    },
    {
      path: path.member,
      element: <Member />,
      children: [
        {
          path: path.dashboard,
          element: <Dashboard />
        },
        {
          path: path.myPond,
          element: <MyKoi />
        },
        {
          path: path.waterParameters,
          element: <WaterParameters />
        },
        {
          path: path.reminders,
          element: <Reminders />
        },
        {
          path: path.recommendations,
          element: <Recommendations />
        },
        {
          path: path.foodCalculator,
          element: <FoodCalculator />
        },
        {
          path: path.saltCalculator,
          element: <SaltCalculator />
        },
        {
          path: path.statistics,
          element: <Statistics />
        },
        {
          path: path.news,
          element: <News />
        }
      ]
    }
  ])

  return (
    <>
      {routeElements}
      <ToastContainer />
    </>
  )
}

export default App
