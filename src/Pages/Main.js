import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Main.module.css";
import { useCookies } from "react-cookie";

const Main = () => {
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const navigate = useNavigate();

  const logout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <div className={styles.main}>
      <div className={styles.background}>
        <button onClick={logout}>로그아웃</button>
      </div>
    </div>
  );
};

export default Main;
