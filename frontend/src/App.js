import {BrowserRouter, Routes, Route} from 'react-router-dom'
import React, { useState } from 'react';

import CreateForm from './components/CreateForm';
import AllItems from './components/AllItems';
import Register from './auth/Register';
import Login from './auth/Login';

function App() {

  const [token, setToken] = useState('');

  return (
    <div className="App">
        
      <BrowserRouter>

      <div className='pages'>
        <Routes>

          <Route exact path="/register" element={<Register setToken={setToken}/>} />
          <Route exact path="/" element={<Login setToken={setToken}/>} />

          <Route path='/createform' element={<CreateForm token={token} />} />
          <Route path='/dashboard' element={<AllItems token={token} setToken={setToken}/>} />

        </Routes>
      </div>
        
      </BrowserRouter>

    </div>
  );
}

export default App;
