import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import Layout from './design/Layout';
import Welcome from './pages/create/Welcome';
import QuestionNumber from './pages/create/QuestionNumber';
import QuestionList from './pages/create/QuestionList';

const App = () => {
  return (
    <CookiesProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Welcome />} />
            <Route path="/question-number" element={<QuestionNumber />} />
            <Route path="/question-list" element={<QuestionList />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CookiesProvider>
  );
};
export default App;
