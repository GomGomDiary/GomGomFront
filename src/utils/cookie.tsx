import { Cookies } from 'react-cookie';

export interface CookieProps {
  name: string;
  value: string;
  options: object;
}

const cookies = new Cookies();

export const setCookie = ({ name, value, options }: CookieProps) => {
  return cookies.set(name, value, {
    path: '/',
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    domain: '.gomgomdiary.site',
  });
};

export const getCookie = (name: string) => {
  return cookies.get(name);
};

export const removeCookie = (name: string) => {
  return cookies.remove(name);
};
