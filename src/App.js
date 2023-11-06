import './App.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './Home/Header';
import Main from './Home/Main';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Header />
        <Main />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
