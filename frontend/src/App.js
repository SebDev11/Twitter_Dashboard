import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react';

import CreateForm from './components/CreateForm';
import AllItems from './components/AllItems';
import UpdateForm from './components/UpdateForm';
// import View from './Oshan/View';
// import Create from './Oshan/Create';
// import Update from './Oshan/Update';
import Home from './components/Home';
// import Register from './auth/Register';
// import Login from './auth/Login';

function App() {


  return (
    <div className="App">
        
      <BrowserRouter>

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
          <Route path='/' element={<Home />} />

        </Routes>
      </div>
        
      </BrowserRouter>

    </div>
  );
}

export default App;
