import {
  FaMoon,
  FaSun,
} from 'react-icons/fa';
import useDarkMode from '../../hooks/useDarkMode';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const TopNavigation = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-950 border-b border-gray-100 dark:border-gray-800 shadow-md backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95'>
      <div className='px-8 py-4 flex items-center justify-between'>
        <div className='flex items-center gap-8'>
          <div className='group cursor-pointer'>
            <h1 className='text-3xl font-bold bg-gradient-orange bg-clip-text text-transparent hover:opacity-80 transition-opacity duration-300'>
              🐛 BugTracker
            </h1>
            <div className='h-1 bg-gradient-orange rounded-full w-0 group-hover:w-full transition-all duration-500'></div>
          </div>
        </div>
        
        <div className='flex items-center gap-6'>
          <div className='text-right hidden md:block'>
            <p className='text-sm font-semibold text-gray-800 dark:text-gray-100'>{currentUser?.name}</p>
            <p className='text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400'>{currentUser?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className='px-3 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors duration-200'
            title='Logout'
          >
            Logout
          </button>
          <ThemeIcon />
        </div>
      </div>
    </div>
  );
};

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <button 
      onClick={handleMode} 
      className='p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-300 hover:scale-110'
      title={darkTheme ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkTheme ? (
        <FaSun size='18' className='text-yellow-500' />
      ) : (
        <FaMoon size='18' className='text-indigo-600' />
      )}
    </button>
  );
};

export default TopNavigation;
