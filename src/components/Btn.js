import React from 'react';
import Styles from './Btn.module.css';

const Btn = ({ text, onClick }) => {
  return (
    <button className={Styles.Btn} onClick={onClick}>
      {text}
    </button>
  );
};

export default Btn;
