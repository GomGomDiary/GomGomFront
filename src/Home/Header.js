import React, { useState } from 'react';
import Styles from './Header.module.css';
import { MdOutlineHistory } from 'react-icons/md';
import CustomModal from '../components/CustomModal';

const Header = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleAlert = () => {
    setIsClicked(true);
  };

  const handleModalClose = () => {
    setIsClicked(false);
  };

  return (
    <div className={Styles.Header}>
      <MdOutlineHistory className={Styles.history} onClick={handleAlert} />
      <div className={Styles.title}>GomGom Diary 🐻💭</div>
      {isClicked && (
        <CustomModal
          message={`현재 개발중입니다. 조금만 기다려주세요 :)`}
          updateModal={handleModalClose}
        />
      )}
    </div>
  );
};

export default Header;
