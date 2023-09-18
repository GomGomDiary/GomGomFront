import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Main from './Pages/Main';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={isLogin ? <Main /> : <Login setIsLogin={setIsLogin} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
