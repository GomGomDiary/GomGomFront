import { Outlet } from 'react-router-dom';

import Frame from './Frame';

const Layout = () => {
  return (
    <Frame>
      <Outlet />
    </Frame>
  );
};

export default Layout;
