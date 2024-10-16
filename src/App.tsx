import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Layout from './design/Layout';
import Welcome from './pages/create/Welcome';
import QuestionNumber from './pages/create/QuestionNumber';
import QuestionList from './pages/create/QuestionList';
import WriteChallenge from './pages/create/WriteChallenge';
import WriteCountersign from './pages/create/WriteCountersign';
import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import Finish from './pages/create/Finish';
import History from './pages/history/History';
import HistoryItem from './pages/history/HistoryItem';
import MatchChallenge from './pages/response/MatchChallenge';
import DisplayAnswerList from './pages/create/DisplayAnswerList';
import DisplayAnswer from './pages/create/DisplayAnswer';
import NotFound from './pages/NotFound';

const App = () => {
  useEffect(() => {
    if (!window.location.href.includes('localhost')) {
      ReactGA.initialize(`${process.env.REACT_APP_GA}`);
    }
  }, []);

  return (
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
            <Route path="/answerers/:diaryId" element={<DisplayAnswerList />} />
            <Route path="/answer/:diaryId" element={<DisplayAnswer />} />

            <Route path="/diary/:diaryId" element={<MatchChallenge />} />
            <Route path="/history" element={<History />} />
            <Route path="/history/:historyItemId" element={<HistoryItem />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
};
export default App;
