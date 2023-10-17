import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import styles from "./Login.module.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [cookie, setCookie] = useCookies(["token"]);

  const onLogin = ({ username, password }) => {
    const requestData = {
      username,
      password,
    };

    axios
      .post("https://9c62-221-145-16-224.ngrok-free.app/login", requestData, {
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": true,
        },
      })
      .then((response) => {
        setCookie("token", response.data.token);
        navigate("/");
      })
      .catch((error) => {
        alert("로그인에 실패했습니다.");
        console.error(error);
      });
  };

  const password = useRef();
  password.current = watch("password");

  return (
    <div className={styles.Login}>
      <Link to="/login" className={styles.title}>
        🧸 GomGom Login! 🧸
      </Link>
      <form className={styles.form} onSubmit={handleSubmit(onLogin)}>
        <label>Name</label>
        <input
          name="username"
          type="text"
          autoComplete="on"
          placeholder="닉네임을 입력하세요."
          {...register("username", {
            required: true,
          })}
        />
        {errors.username && errors.username.type === "required" && (
          <p>이 칸을 입력해주세요.</p>
        )}
        <label>Password</label>
        <input
          name="password"
          type="password"
          autoComplete="on"
          placeholder="비밀번호를 입력하세요."
          {...register("password", {
            required: true,
          })}
        />
        {errors.password && errors.password.type === "required" && (
          <p>이 칸을 입력해주세요.</p>
        )}
        <Link to={"/signup"} className={styles.link}>
          Sign up
        </Link>
        <input className={styles.btn} type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;
