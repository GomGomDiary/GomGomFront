import React from 'react';
import Styles from './ReceiveMessage.module.css';

const ReceiveMessage = ({ message }) => {
  return (
    <div className={Styles.ReceiveMessage}>
      <div className={Styles.receiver}>🐻 {message.nickname}</div>
      <div className={Styles.rMessage}>{message.chat}</div>
      <div className={Styles.rTime}>
        {message.time.toLocaleTimeString().slice(0, -3)}
      </div>
    </div>
  );
};

export default ReceiveMessage;
