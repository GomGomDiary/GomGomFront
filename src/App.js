import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import React from 'react';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Main from './Pages/Main';
import { CookiesProvider } from 'react-cookie';

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
