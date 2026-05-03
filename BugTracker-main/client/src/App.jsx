import DashboardContainer from './components/DashboardContainer';
import SideBar from './components/SideBar';
import TopNavigation from './components/TopNavigation'
import React from 'react';
import BugTable from './components/BugContainer/BugTable';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MyBugs from './components/BugContainer/MyBugs'
import ReportBugContainer from './components/ReportBugContainer';
import LoginPage from './components/Auth/LoginPage';
import ProfilePage from './components/ProfilePage';
import { useAuth } from './context/AuthContext';

function App() {
  const { currentUser, isAuthenticated } = useAuth();
  const isAdmin = currentUser?.role === "admin";

  return (
    <Router>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <>
        <TopNavigation />
        <SideBar />
        <Routes>
          <Route path='/' element={<DashboardContainer />} />
          <Route path='bugs' element={isAdmin ? <BugTable /> : <Navigate to="/mybugs" replace />} />
          <Route path='mybugs' element={<MyBugs />} />
          <Route path='report' element={isAdmin ? <ReportBugContainer /> : <Navigate to="/mybugs" replace />} />
          <Route path='profile' element={<ProfilePage />} />
          <Route path='/login' element={<Navigate to="/" replace />} />
          <Route path='*' element={<Navigate to="/" replace />} />
        </Routes>
        </>
      )}
    </Router>
  );
}

export default App;