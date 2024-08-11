import { Outlet } from 'react-router-dom';
import Frame from './Frame';

export default function Layout() {
  return (
    <Frame>
      <Outlet />
    </Frame>
  );
}
