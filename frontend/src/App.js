import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React from 'react';

import CreateForm from './components/CreateForm';
import AllItems from './components/AllItems';
import UpdateForm from './components/UpdateForm';
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

          <Route path='/createform' element={<CreateForm  />} />
          <Route path='/updateform/:id' element={<UpdateForm  />} />
          <Route path='/' element={<AllItems />} />

        </Routes>
      </div>
        
      </BrowserRouter>

    </div>
  );
}

export default App;
