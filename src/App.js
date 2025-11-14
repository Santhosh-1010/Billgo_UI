import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { Loader } from './interceptor/interceptor';
import LoginPage from './components/LoginPage';
import { AdminDashboard } from './components/AdminDashboard';
import RedirectRoute from './RedirectRoute';
import ProtectRoute from './ProtectRoute';
import Register from './components/Register';
import { HeaderComponent } from './components/Header';
import { BootstrapSidebar } from './components/SideNav';
import { Chathistory } from './components/Chathistory'
import { ModuleRegistry } from 'ag-grid-community';
import { ClientSideRowModelModule } from 'ag-grid-community';
import  GitMetrics  from './components/GitMetrics'
import { useEffect } from "react";
ModuleRegistry.registerModules([ClientSideRowModelModule]);
function DisableSwipeNavigation() {
  useEffect(() => {
    const handlePopState = (event) => {
      window.history.pushState(null, '', window.location.href);
    };

    window.history.pushState(null, '', window.location.href); // initial
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null;
}

function AppLayout({ children }) {
  const location = useLocation();
  const isPublicRoute = ["/", "/register"].includes(location.pathname);
  return (
    <>
      {!isPublicRoute && (
        <>
          <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
            <HeaderComponent />
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ width:  "70px" }}>
              <BootstrapSidebar />
            </div>
            <div className='main-content' style={{ flexGrow: 1 }}>
              {children}
            </div>
          </div>
        </>
      )}
      {isPublicRoute && children}
    </>
  );
}

function App() {
  return (
    <Router>
            <DisableSwipeNavigation />

      <Loader />
      <AppLayout>
        <Routes>
              <Route path="/" element={<RedirectRoute><LoginPage /></RedirectRoute>} />
              <Route path="/register" element={<Register />} />
              <Route path="/chat" element={<ProtectRoute><Chathistory/></ProtectRoute>}/>
              <Route path="/admin" element={<ProtectRoute><AdminDashboard /></ProtectRoute>} />
              <Route path="/adminDashBoard" element={<ProtectRoute><AdminDashboard /></ProtectRoute>} />
              <Route path="/gitmetrics" element={<ProtectRoute><GitMetrics /></ProtectRoute>} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
