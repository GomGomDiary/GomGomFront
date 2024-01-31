import React from 'react';
import Styles from './ReceiveMessage.module.css';

const ReceiveMessage = ({ message }) => {
  const time = new Date(message.createdAt).toLocaleString('ko-kr', {
    year: '2-digit',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
  return (
    <div className={Styles.ReceiveMessage}>
      <div className={Styles.receiver}>🐻 {message.nickname}</div>
      <div className={Styles.rMessage}>{message.chat}</div>
      <div className={Styles.rTime}>{time}</div>
    </div>
  );
};

export default ReceiveMessage;
