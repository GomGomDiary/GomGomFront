import { Outlet } from 'react-router-dom';

import { Frame } from './Frame';

export const Layout = () => {
  return (
    <Frame>
      <Outlet />
    </Frame>
  );
};
