import React from 'react';
import Styles from './SendMessage.module.css';

const SendMessage = () => {
  return (
    <div className={Styles.SendMessage}>
      <div className={Styles.sender}>🐻 yoyoo</div>
      <div className={Styles.sMessage}>
        안녕하세요fdfaskfjsfklsdjldfafdsfsdfs요요요
      </div>
      <div className={Styles.sTime}>오전 1:03</div>
    </div>
  );
};

export default SendMessage;
