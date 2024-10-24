import axios, { AxiosInstance } from 'axios';

export const instance = (answererJWT?: string): AxiosInstance => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: answererJWT ? `Bearer ${answererJWT}` : '',
    },
  });

  axiosInstance.interceptors.response.use(
    response => response,
    error => Promise.reject(error)
  );

  return axiosInstance;
};
