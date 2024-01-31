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
import Chat from './chat/Chat';

function App() {
  useEffect(() => {
    ReactGA.initialize(`${process.env.REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID}`);
  }, []);

  useEffect(() => {
    // 현재 페이지의 URL 가져오기
    const currentUrl = window.location.href;

    // Open Graph 메타 태그 설정
    const ogUrlMetaTag = document.querySelector('meta[property="og:url"]');
    if (ogUrlMetaTag) {
      ogUrlMetaTag.setAttribute('content', currentUrl);
    }
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
            <Route path="/chat/enter_room" element={<Chat />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </CookiesProvider>
  );
}

export default App;
