import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import React, { useState, useEffect, createContext } from 'react';
import axios from 'axios';
import CreateForm from './components/CreateForm';
import AllItems from './components/AllItems';
import UpdateForm from './components/UpdateForm';
// import View from './Oshan/View';
// import Create from './Oshan/Create';
// import Update from './Oshan/Update';
import Home from './components/Home';
import Explore from './components/explore';
import Notifications from './components/notifications';
import Messages from './components/messages';
import Lists from './components/lists';
import Profile from './components/profile';
import Bookmarks from './components/bookmarks';
import More from './components/more';
import Payment from './Chethmi/Client/Payment';
import SideNavPanel from './components/SideNavPanel';
import OrderForm from './components/order/OrderForm';
import AllOrders from './components/order/AllOrders';
import DownloadInvoice from './components/DownloadInvoice';
import Register from './auth/Register';
import Login from './auth/Login';
import UserProvider from './provider/userProvider';
// import { useNavigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider>
          <AppContent />
        </UserProvider>
      </BrowserRouter>
    </div>
  );
}

function AppContent() {

  const location = useLocation();

    // Array of routes where the navbar should be shown
    const showNavBarRoutes = ['/createform', '/payment'];

    // Function to determine whether to render the navbar
    const renderNavBar = () => {
      return showNavBarRoutes.includes(location.pathname);
    };

  return (

    <div className="App">
        

      {renderNavBar() && <SideNavPanel />}

      <div className='pages'>
        <Routes>

          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />

          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path='/messages' element={<Messages />} />
          <Route path='/bookmarks' element={<Bookmarks />} />
          <Route path='/lists' element={<Lists />} /> */
          <Route path='/profile' element={<Profile />} />
          <Route path='/more' element={<More />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
