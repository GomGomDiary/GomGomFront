import React from 'react';
import Styles from './SendMessage.module.css';

const SendMessage = ({ messages }) => {
  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index} className={Styles.SendMessage}>
          <div className={Styles.sender}>🐻 {msg.sender}</div>
          <div className={Styles.sMessage}>{msg.text}</div>
          <div className={Styles.sTime}>
            {msg.time.toLocaleTimeString().slice(0, -3)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SendMessage;
