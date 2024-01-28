import React from 'react';
import Styles from './ReceiveMessage.module.css';

const ReceiveMessage = ({ receivedMessages }) => {
  return (
    <div>
      {receivedMessages.map((msg, index) => (
        <div key={index} className={Styles.ReceiveMessage}>
          <div className={Styles.receiver}>🐻 {msg.sender}</div>
          <div className={Styles.rMessage}>{msg.text}</div>
          <div className={Styles.rTime}>
            {msg.time.toLocaleTimeString().slice(0, -3)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReceiveMessage;
