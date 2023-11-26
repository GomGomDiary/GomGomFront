import React from 'react';
import Styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={Styles.Main}>
      <div className={Styles.center}>
        <div className={Styles.pin}>📌</div>
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
