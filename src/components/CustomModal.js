import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Styles from './CustomModal.module.css';

const CustomModal = () => {
  const [modalIsOpen, setModalIsOpenState] = useState(true);

  const handleClose = () => {
    setModalIsOpenState(false);
  };

  return (
    <Modal
      className={Styles.Modal}
      isOpen={modalIsOpen}
      appElement={document.getElementById('root')}
      style={{
        overlay: {
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          zIndex: '1',
        },
        content: {
          position: 'absolute',
          height: '100px',
          width: '250px',
          top: '60px',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: '40px',
          border: '1px solid #ccc',
          background: '#fff',
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
          padding: '20px',
        },
      }}
    >
      <button className={Styles.cancelBtn} onClick={handleClose}>
        ❌
      </button>
      <div>안녕</div>
    </Modal>
  );
};

export default CustomModal;
