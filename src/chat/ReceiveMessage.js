import React from 'react';
import Styles from './ReceiveMessage.module.css';

const ReceiveMessage = () => {
  return (
    <div className={Styles.ReceiveMessage}>
      <div className={Styles.receiver}>🍯 summermong</div>
      <div className={Styles.rMessage}>
        안녕하fadsfjklsdjfkalfjslflkasdj세요dfafdsfsdfs요요요
      </div>
      <div className={Styles.rTime}>오전 1:03</div>
    </div>
  );
};

export default ReceiveMessage;
