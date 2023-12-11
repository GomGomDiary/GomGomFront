import React from 'react';
import Styles from './NotFound.module.css';
import Header from '../Home/Header';

const NotFound = () => {
  return (
    <div className={Styles.Main}>
      <Header />
      <div className={Styles.center}>
        <section className={Styles.content}>
          <div className={Styles.errorMessage}>
            <div className={Styles.error}>
              잘못된 경로예요.
              <p>🙅🏻</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NotFound;
