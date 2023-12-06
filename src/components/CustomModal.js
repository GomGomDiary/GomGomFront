import React, { useState } from 'react';
import Modal from 'react-modal';
import Styles from './CustomModal.module.css';

const CustomModal = ({ message, updateModal }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const handleClose = () => {
    setModalIsOpen(false);
    updateModal(false);
  };

  return (
    <Modal
      className={Styles.Modal}
      overlayClassName={Styles.ModalOverlay}
      isOpen={modalIsOpen}
      appElement={document.getElementById('root')}
      onRequestClose={handleClose}
    >
      <div className={Styles.ModalContent}>
        <div>{message}</div>
        <button className={Styles.okBtn} onClick={handleClose}>
          확인
        </button>
      </div>
    </Modal>
  );
};

export default CustomModal;
