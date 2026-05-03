import React from "react";
import { Link, useLocation } from "react-router-dom";
import { RiDashboardLine, RiBugFill, RiCheckboxBlankCircleLine, RiUserLine, RiLogoutBoxLine } from "react-icons/ri";
import { AiOutlineForm } from "react-icons/ai";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SidebarContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const isAdmin = currentUser?.role === "admin";

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: '/', icon: RiDashboardLine, label: 'Dashboard' },
    { path: '/mybugs', icon: RiCheckboxBlankCircleLine, label: 'My Issues' },
    { path: '/profile', icon: RiUserLine, label: 'Profile' },
  ];
  if (isAdmin) {
    navItems.push({ path: '/bugs', icon: RiBugFill, label: 'All Issues' });
    navItems.push({ path: '/report', icon: AiOutlineForm, label: 'Report Issue' });
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="space-y-1">
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium relative overflow-hidden group ${
                active
                  ? 'bg-blue-600 text-white shadow'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              {!active && (
                <div className='absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors duration-200'></div>
              )}
              <Icon size={20} className='relative z-10' />
              <span className='relative z-10'>{item.label}</span>
              {active && (
                <div className='ml-auto w-1 h-6 bg-white rounded-full'></div>
              )}
            </Link>
          );
        })}
      </nav>
      <button
        onClick={handleLogout}
        className="mt-4 w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 font-medium"
      >
        <RiLogoutBoxLine size={20} />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default SidebarContent;
