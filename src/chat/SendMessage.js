import React from 'react';
import Styles from './SendMessage.module.css';

const SendMessage = ({ message }) => {
  const time = new Date(message.createdAt).toLocaleString('ko-kr', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <div className={Styles.SendMessage}>
      <div className={Styles.sender}>🍯 {message.nickname}</div>
      <div className={Styles.sMessage}>{message.chat}</div>

      <div className={Styles.sTime}>{time}</div>
    </div>
  );
};

export default SendMessage;
