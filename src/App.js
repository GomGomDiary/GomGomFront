import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './Home/Header';
import Main from './Home/Main';
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie';
import NotFound from './Pages/NotFound';

function App() {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <RecoilRoot>
          <Header />
          <Routes>
            <Route path="/answerers/:diaryId" element={<Main />} />
            <Route path="/answer/:diaryId/:answerId" element={<Main />} />
            <Route path="/diary/:diaryId" element={<Main />} />
            <Route path="/" element={<Main />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </CookiesProvider>
  );
}

export default App;
