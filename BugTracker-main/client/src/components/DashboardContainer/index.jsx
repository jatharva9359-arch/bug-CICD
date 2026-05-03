import TopNavigation from '../TopNavigation';
import { BsPlusCircleFill } from 'react-icons/bs';
import PieChart from '../PieChartDashboard';
import AllWidgets from '../DashboardWidgets';
import { useEffect, useState } from 'react';
// import { useState } from 'react';

const DashboardContainer = () => {

  return (
    <div className='ml-72 pt-24 pb-16 pr-10 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-950 dark:to-gray-950 min-h-screen'>

    <div className='max-w-7xl mx-auto'>

    <div className='mb-10 animate-slide-down'>
      <h1 className="text-5xl font-bold bg-gradient-orange bg-clip-text text-transparent">Dashboard</h1>
      <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">Welcome back! Here's your issue summary</p>
      <div className='h-1 w-16 bg-gradient-orange rounded-full mt-4'></div>
    </div>

    <AllWidgets />
  

   
  

    </div>


  

      
    </div>
  );
};

export default DashboardContainer;
