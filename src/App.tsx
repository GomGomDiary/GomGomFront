import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { CookiesProvider } from 'react-cookie';
import ReactGA from 'react-ga4';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Layout } from './design';
import {
  Done,
  MatchChallenge,
  WriteAnswer,
  WriteAnswererName,
} from './pages/answer';
import { History, HistoryItem } from './pages/history';
import { NotFound } from './pages/NotFound';
import {
  DisplayAnswer,
  DisplayAnswererList,
  Finish,
  QuestionList,
  QuestionNumber,
  Welcome,
  WriteChallenge,
  WriteCountersign,
} from './pages/question';

const App = () => {
  const queryClient = new QueryClient();

  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      ReactGA.initialize(`${process.env.REACT_APP_GA}`);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Welcome />} />
              <Route path="/question-number" element={<QuestionNumber />} />
              <Route path="/question-list" element={<QuestionList />} />
              <Route path="/challenge" element={<WriteChallenge />} />
              <Route path="/countersign" element={<WriteCountersign />} />
              <Route path="/finish" element={<Finish />} />

              <Route
                path="/answer/:diaryId/:answerId"
                element={<DisplayAnswer />}
              />
              <Route
                path="/answerers/:diaryId"
                element={<DisplayAnswererList />}
              />
              <Route path="/diary/:diaryId" element={<MatchChallenge />} />
              <Route
                path="/answerer/:diaryId"
                element={<WriteAnswererName />}
              />
              <Route path="/answer/:diaryId" element={<WriteAnswer />} />
              <Route path="/done/:diaryId" element={<Done />} />

              <Route path="/history" element={<History />} />
              <Route path="/history/:historyItemId" element={<HistoryItem />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CookiesProvider>
    </QueryClientProvider>
  );
};
export default App;
