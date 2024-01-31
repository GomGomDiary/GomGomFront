import React from 'react';
import Styles from './NotFound.module.css';
import Header from '../Home/Header';
import Btn from '../components/Btn';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate('');

  const handleGoToMain = () => {
    navigate('/');
  };

  return (
    <div className={Styles.Main}>
      <Header />
      <div className={Styles.center}>
        <section className={Styles.content}>
          <div className={Styles.errorMessage}>
            <div className={Styles.error}>
              잘못된 경로예요.
              <p>🙅🏻</p>
              <Btn onClick={handleGoToMain} text={'메인으로 가기'} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NotFound;
