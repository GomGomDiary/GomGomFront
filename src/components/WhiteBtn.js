import React from 'react';
import Styles from './WhiteBtn.module.css';

const WhiteBtn = ({ text, onClick }) => {
  return (
    <button className={Styles.WhiteBtn} onClick={onClick}>
      {text}
    </button>
  );
};

export default WhiteBtn;
