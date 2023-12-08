import React, { useState } from 'react';
import Modal from 'react-modal';
import Styles from './CustomModal.module.css';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UpdateClick } from '../store/Create/UpdateClick';
import { Questioner } from '../store/Create/Questioner';
import { CounterSign } from '../store/Create/CounterSign';
import { Challenge } from '../store/Create/Challenge';

const ConfirmModal = ({ message, updateModal, goToFirstStep, onNextStep }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const navigate = useNavigate();
  const [updateClick, setUpdateClick] = useRecoilState(UpdateClick);

  const handleClose = () => {
    setModalIsOpen(false);
    updateModal(false);
  };

  const handleconfirm = () => {
    if (message === '다이어리를 만드시겠어요?') {
      setModalIsOpen(false);
      setUpdateClick(true);
      navigate('/');
      goToFirstStep();
    } else if (message === '다시 만들면 이전 다이어리는 저장됩니다.') {
      onNextStep();
    }
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
          <button className={Styles.confirmBtn} onClick={handleconfirm}>
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
