import React, { useForm } from 'react-hook-form';
import { useRef } from 'react';
import styles from './Signup.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Signup() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ username, password }) => {
    const requestData = {
      username,
      password,
    };

    axios
      .post('https://9c62-221-145-16-224.ngrok-free.app/signup', requestData, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': true,
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const password = useRef();
  password.current = watch('password');

  return (
    <div className={styles.Signup}>
      <Link to="/signup" className={styles.title}>
        🧸 GomGom Signup 🧸
      </Link>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input
          name="username"
          type="text"
          autoComplete="on"
          placeholder="닉네임은 최대 10자 내외로 입력해주세요."
          {...register('username', {
            required: true,
            maxLength: 10,
          })}
        />
        {errors.username && errors.username.type === 'required' && (
          <p>이 칸을 입력해주세요.</p>
        )}
        {errors.username && errors.username.type === 'maxLength' && (
          <p>닉네임은 최대 10자 내외로 입력해주세요.</p>
        )}
        <label>Password</label>
        <input
          name="password"
          type="password"
          autoComplete="on"
          placeholder="영문+숫자+특수문자 조합의 7~15자 내외로 입력해주세요."
          {...register('password', {
            required: true,
            pattern:
              /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,16}$/i,
          })}
        />
        {errors.password && errors.password.type === 'required' && (
          <p>이 칸을 입력해주세요.</p>
        )}
        {errors.password && errors.password.type === 'pattern' && (
          <p>영문+숫자+특수문자 조합의 7~15자 내외로 입력해주세요.</p>
        )}
        <label>Password Confirm</label>
        <input
          name="confirm"
          type="password"
          autoComplete="on"
          placeholder="비밀번호를 확인해주세요."
          {...register('confirm', {
            required: true,
            validate: (value) => value === password.current,
          })}
        />
        {errors.confirm && errors.confirm.type === 'required' && (
          <p>이 칸을 입력해주세요.</p>
        )}
        {errors.confirm && errors.confirm.type === 'validate' && (
          <p>비밀번호를 다시 입력해주세요.</p>
        )}

        <input className={styles.btn} type="submit" value="Signup" />
      </form>
    </div>
  );
}

export default Signup;
