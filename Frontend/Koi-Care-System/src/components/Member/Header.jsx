import { useDarkMode } from '../../components/DarkModeContext'
import logo from '../../assets/logo.png'

function Header() {
  const { isDarkMode, toggleDarkMode } = useDarkMode()

  return (
    <div className={isDarkMode ? 'bg-custom-dark text-white' : 'bg-white text-black'}>
      <div className='flex items-center justify-between p-2'>
        <div className='flex justify-center items-center'>
          <button className='pt-2 rounded-md'>
            <img className='w-14 animate-slow-spin' src={logo} alt='Logo' />
          </button>
          <a href='#' className='pt-2 text-xl font-bold'>
            Koi Care System
          </a>
        </div>
        <div>
          <div className='container'>
            <div className=''>
              
            </div>
            <div className='switch-checkbox'>
              <label className='switch'>
                <input type='checkbox' checked={isDarkMode} onChange={toggleDarkMode} />
                <span className='slider round'> </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
