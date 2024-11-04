import { Cookies } from 'react-cookie';

export interface CookieProps {
  name: string;
  value: string | null;
  options?: object;
}

const cookies = new Cookies();

export const setCookie = ({ name, value, options }: CookieProps) => {
  return cookies.set(name, value, {
    path: '/',
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    // TODO: 배포 전 변경
    domain: 'localhost',
    ...options,
  });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  return cookies.remove(name);
};
