import React, { useState } from 'react';
import Modal from 'react-modal';
import Styles from './CustomModal.module.css';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UpdateClick } from '../store/Create/UpdateClick';

const ConfirmModal = ({ message, updateModal, goToFirstStep }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const navigate = useNavigate();
  const [updateClick, setUpdateClick] = useRecoilState(UpdateClick);

  const handleClose = () => {
    setModalIsOpen(false);
    updateModal(false);
  };

  const handleComfirm = () => {
    setModalIsOpen(false);
    setUpdateClick(true);
    navigate('/');
    goToFirstStep();
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
        <div className={Styles.ModalBtns}>
          <button className={Styles.cancelBtn} onClick={handleClose}>
            취소
          </button>
          <button className={Styles.comfirmBtn} onClick={handleComfirm}>
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
