import axios from 'axios';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  const click = () => {
    axios
      .get('https://9c62-221-145-16-224.ngrok-free.app/auth', {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        alert('로그인에 실패했습니다.');
        console.error(error);
      });
  };

  const logout = () => {
    axios
      .post('https://9c62-221-145-16-224.ngrok-free.app/logout')
      .then((response) => {
        console.log(response);
        navigate('/login');
      })
      .catch((error) => {
        alert('로그아웃에 실패했습니다.');
        console.error(error);
      });
  };

  return (
    <div>
      <button onClick={click}>로그인 성공!</button>
      <button onClick={logout}>로그아웃!</button>
    </div>
  );
};

export default Main;
