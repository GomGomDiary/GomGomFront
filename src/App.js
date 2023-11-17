import './App.css';

import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './Home/Header';
import Main from './Home/Main';
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie';
import MatchChallenge from './Pages/Response/MatchChallenge';

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <RecoilRoot>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/:diaryId" element={<Main />} />
            <Route path="/answerers/:diaryId" element={<Main />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
