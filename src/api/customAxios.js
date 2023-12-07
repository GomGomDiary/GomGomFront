import axios from 'axios';

const instance = (answererJWT) => {
  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${answererJWT}`,
    },
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export default instance;
