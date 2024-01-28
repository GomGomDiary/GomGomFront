import axios from 'axios';

const chatAxios = (chatToken) => {
  const chatInstance = axios.create({
    baseURL: `${process.env.REACT_APP_CHAT_URL}`,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${chatToken}`,
    },
  });

  // 응답 에러 핸들링
  chatInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 409) {
        console.log('409 Forbidden Error:', error);
      }
      return Promise.reject(error);
    }
  );

  return chatInstance;
};

export default chatAxios;
