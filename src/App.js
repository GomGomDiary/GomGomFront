import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './Home/Main';
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie';
import NotFound from './Pages/NotFound';
import History from './Pages/History/History';
import HistoryItem from './Pages/History/HistoryItem';

import ReactGA from 'react-ga4';

function App() {
  useEffect(() => {
    ReactGA.initialize(`${process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID}`);
  }, []);

  return (
    <CookiesProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/history" element={<History />} />
            <Route path="/history/:historyItemId" element={<HistoryItem />} />
            <Route path="/answerers/:diaryId" element={<Main />} />
            <Route path="/answer/:diaryId/:answerId" element={<Main />} />
            <Route path="/diary/:diaryId" element={<Main />} />

            <Route path="/" element={<Main />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </CookiesProvider>
  );
}

export default App;
