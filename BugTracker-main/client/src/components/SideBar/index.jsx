import { Link } from 'react-router-dom';
import SidebarContent from '../SideBarContent';


const SideBar = () => {

  return (
    <div className="fixed left-0 top-20 w-72 h-screen bg-white shadow z-40 border-r border-blue-100 flex flex-col overflow-y-auto">
      {/* Branding Section */}
      <div className="px-6 py-8 border-b border-blue-100 bg-white sticky top-0">
        <div className='flex items-center gap-2'>
          <span className='text-3xl'>🐛</span>
          <h2 className='text-2xl font-bold text-blue-600'>
            BugTracker
          </h2>
        </div>
        <p className="text-xs text-gray-500 mt-2 ml-10">Issue Tracking System</p>
      </div>
      
      {/* Navigation Section */}
      <div className="flex-1 pt-6 px-3">
        <SidebarContent />
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-blue-100 bg-white">
        <p className="text-xs text-gray-500 text-center">
          <span className='text-blue-600'>v1.0</span> • Bug Tracker Pro
        </p>
      </div>
    </div>
  );
};

export default SideBar;
