import axios from 'axios';
import React from 'react';

const Main = () => {
  const click = () => {
    axios
      .get('https://9c62-221-145-16-224.ngrok-free.app/auth', {
        headers: {
          'set-cookie':
            'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IuycoOuLiOyuuCIsImlhdCI6MTY5NTA2MDg3OSwiZXhwIjoxNjk1MTQ3Mjc5fQ.PgtYHMJSzRxzAnOYdcsuCKFkxOBcG0M3Eto1EYOb-tA; Path=/',
        },
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

  return (
    <div>
      <button onClick={click}>로그인 성공!</button>
    </div>
  );
};

export default Main;
