import { Outlet } from 'react-router-dom'
import Header from '../components/Member/Header'
import LeftSideBar from '../components/Member/LeftSideBar'
import { useDarkMode } from '../hooks/DarkModeContext'

function UserLayout() {
  const { isDarkMode } = useDarkMode()

  return (
    <div className='h-screen flex'>
      <LeftSideBar />
      <div
        className={`relative ${
          isDarkMode ? 'bg-custom-dark text-white' : 'bg-white text-black'
        } shadow-xl flex-1 flex-col overflow-y-auto overflow-x-hidden`}
      >
        <Header />
        <div className='py-5 px-[30px] mx-auto max-w-[1750px]'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default UserLayout
