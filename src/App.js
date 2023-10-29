import './App.css';

import React from 'react';
import { BrowserRouter, Route, Routs } from 'react-router-dom';

import Header from './Home/Header';
import Main from './Home/Main';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <RecoilRoot>
        <div className="App">
          <Main />
        </div>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
