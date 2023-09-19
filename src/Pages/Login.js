import React, { useForm } from 'react-hook-form';
import { useRef, useEffect } from 'react';
import styles from './Login.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Login({ setIsLogin }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onLogin = ({ username, password }) => {
    const requestData = {
      username,
      password,
    };

    axios
      .post('https://9c62-221-145-16-224.ngrok-free.app/login', requestData, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': true,
        },
      })
      .then((response) => {
        // 세션 토큰을 받아와서 클라이언트 측 저장소에 저장
        const sessionToken = response.data.token;
        localStorage.setItem('sessionToken', sessionToken);

        // 로그인 상태 변경
        setIsLogin(true);
      })
      .catch((error) => {
        alert('로그인에 실패했습니다.');
        console.error(error);
      });
  };

  useEffect(() => {
    // 컴포넌트 로딩 시, 세션 토큰 확인하여 로그인 상태 변경
    const sessionToken = localStorage.getItem('sessionToken');
    if (sessionToken) {
      setIsLogin(true);
    }
  }, []);

  const password = useRef();
  password.current = watch('password');

  return (
    <div className={styles.Login}>
      <Link to="/" className={styles.title}>
        🧸 GomGom Login 🧸
      </Link>
      <form className={styles.form} onSubmit={handleSubmit(onLogin)}>
        <label>Name</label>
        <input
          name="username"
          type="text"
          autoComplete="on"
          placeholder="닉네임을 입력하세요."
          {...register('username', {
            required: true,
          })}
        />
        {errors.username && errors.username.type === 'required' && (
          <p>이 칸을 입력해주세요.</p>
        )}
        <label>Password</label>
        <input
          name="password"
          type="password"
          autoComplete="on"
          placeholder="비밀번호를 입력하세요."
          {...register('password', {
            required: true,
          })}
        />
        {errors.password && errors.password.type === 'required' && (
          <p>이 칸을 입력해주세요.</p>
        )}
        <Link to={'/signup'} className={styles.link}>
          Sign up
        </Link>
        <input className={styles.btn} type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
