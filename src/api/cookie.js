import { Cookies } from 'react-cookie';

const cookies = new Cookies();

export const setCookie = (name, value, options) => {
  return cookies.set(name, value, {
    path: '/',
    expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
    domain: '.gomgomdiary.site',
  });
};

export const getCookie = name => {
  return cookies.get(name);
};

export const removeCookie = name => {
  return cookies.remove(name);
};
