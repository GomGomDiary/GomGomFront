import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { CookiesProvider } from 'react-cookie';
import Layout from './design/Layout';
import Welcome from './pages/create/Welcome';
import QuestionNumber from './pages/create/QuestionNumber';

const App = () => {
  return (
    <CookiesProvider>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Welcome />} />
              <Route path="/1" element={<QuestionNumber />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </CookiesProvider>
  );
};
export default App;
