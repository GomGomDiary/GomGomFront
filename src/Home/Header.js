import React from 'react';
import Styles from './Header.module.css';
import { MdOutlineHistory } from 'react-icons/md';

const Header = () => {
  const handleAlert = () => {
    alert('개발중입니다! 조금만 기다려주세요.');
  };

  return (
    <div className={Styles.Header}>
      <MdOutlineHistory className={Styles.float} onClick={handleAlert} />
      <div className={Styles.title}>GomGom Diary 🐻💭</div>
    </div>
  );
};

export default Header;
