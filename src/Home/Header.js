import React from 'react';
import Styles from './Header.module.css';
import { MdOutlineHistory } from 'react-icons/md';

const Header = () => {
  return (
    <div className={Styles.Header}>
      <MdOutlineHistory className={Styles.float} />
      <div className={Styles.title}>GomGom Diary 🐻💭</div>
    </div>
  );
};

export default Header;
