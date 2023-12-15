import React from 'react';
import Styles from './WhiteBtn.module.css';

const WhiteBtn = ({ text, onClick }) => {
  const isShare =
    text === '링크로 공유하기'
      ? `${Styles.WhiteBtn} ${Styles.LinkBtn}`
      : Styles.WhiteBtn;

  return (
    <button className={isShare} onClick={onClick}>
      {text}
    </button>
  );
};

export default WhiteBtn;
