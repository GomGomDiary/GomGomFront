import React from 'react';
import Styles from './Chat.module.css';
import Header from '../Home/Header';
import ReceiveMessage from './ReceiveMessage';
import SendMessage from './SendMessage';

const Chat = () => {
  return (
    <div className={Styles.Chat}>
      <Header />
      <div className={Styles.ChatContainer}>
        <ReceiveMessage />
        <SendMessage />
        <ReceiveMessage />
        <SendMessage />
        <ReceiveMessage />
        <SendMessage />
        <ReceiveMessage />
        <SendMessage />
      </div>
      <input className={Styles.messageInput} type="input" />
    </div>
  );
};

export default Chat;
