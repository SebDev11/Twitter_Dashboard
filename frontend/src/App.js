import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom'
import React from 'react';

import CreateForm from './components/CreateForm';
import AllItems from './components/AllItems';
import UpdateForm from './components/UpdateForm';
// import View from './Oshan/View';
// import Create from './Oshan/Create';
// import Update from './Oshan/Update';
import Home from './components/Home';
import Payment from './Chethmi/Client/Payment';
import SideNavPanel from './components/SideNavPanel';
import OrderForm from './components/order/OrderForm';
import AllOrders from './components/order/AllOrders';
import DownloadInvoice from './components/DownloadInvoice';
// import Register from './auth/Register';
// import Login from './auth/Login';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent />
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

          {/* <Route exact path="/register" element={<Register />} />
          <Route exact path="/" element={<Login />} /> */}

          {/* <Route path='/createform' element={<Create  />} /> */}
          <Route path='/createform' element={<CreateForm  />} />
          {/* <Route path='/updateform/:id' element={<Update />} /> */}
          <Route path='/updateform/:id' element={<UpdateForm  />} />
          {/* <Route path='/view' element={<View />} /> */}
          <Route path='/allItems' element={<AllItems />} />
          <Route path='/payment/:id' element={<Payment />} />
          <Route path='/' element={<Home />} />

          <Route path='/downloadInvoice' element={<DownloadInvoice />} />


          <Route path='/ordercreate' element={<OrderForm />} />
          <Route path='/allorders' element={<AllOrders />} />

        </Routes>
      </div>
        

    </div>
  );
}

export default App;
