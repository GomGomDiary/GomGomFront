import React from 'react';
import Styles from './SendMessage.module.css';

const SendMessage = ({ message }) => {
  return (
    <div className={Styles.SendMessage}>
      <div className={Styles.sender}>🍯 {message.nickname}</div>
      <div className={Styles.sMessage}>{message.chat}</div>

      <div className={Styles.sTime}>
        {message.time.toLocaleTimeString().slice(0, -3)}
      </div>
    </div>
  );
};

export default SendMessage;
