import React, { useState } from 'react';
import Styles from './Header.module.css';
import { MdOutlineHistory } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate('');

  const handleGoToHistory = () => {
    navigate('/history');
  };

  return (
    <div className={Styles.Header}>
      <MdOutlineHistory
        className={Styles.history}
        onClick={handleGoToHistory}
      />
      <div className={Styles.title} onClick={() => navigate('/')}>
        GomGom Diary 🐻💭
      </div>
    </div>
  );
};

export default Header;
