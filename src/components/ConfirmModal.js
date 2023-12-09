import React, { useState } from 'react';
import Modal from 'react-modal';
import Styles from './CustomModal.module.css';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { UpdateClick } from '../store/Create/UpdateClick';
import { Questioner } from '../store/Create/Questioner';
import { CounterSign } from '../store/Create/CounterSign';
import { QuestionArr } from '../store/Create/QuestionArr';
import { Challenge } from '../store/Create/Challenge';
import { QuestionNum } from '../store/Create/QuestionNum';
import { OriginQuestionArr } from '../store/Create/OriginQuestionArr';
import { OriginQuestionNum } from '../store/Create/OriginQuestionNum';

const ConfirmModal = ({ message, updateModal, goToFirstStep, onNextStep }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const navigate = useNavigate();
  const [updateClick, setUpdateClick] = useRecoilState(UpdateClick);

  const [questioner, setQuestioner] = useRecoilState(Questioner);
  const [questionArr, setQuestionArr] = useRecoilState(QuestionArr);
  const [challenge, setChallenge] = useRecoilState(Challenge);
  const [questionNum, setQuestionNum] = useRecoilState(QuestionNum);
  const [countersign, setCountersign] = useRecoilState(CounterSign);
  const [originQuestionArr, setOriginQuestionArr] =
    useRecoilState(OriginQuestionArr);
  const [originQuestionNum, setOriginQuestionNum] =
    useRecoilState(OriginQuestionNum);

  const handleClose = () => {
    setModalIsOpen(false);
    updateModal(false);
  };

  const handleconfirm = () => {
    setModalIsOpen(false);
    setUpdateClick(true);
    navigate('/');

    setQuestioner('');
    setQuestionArr(originQuestionArr);
    setChallenge('');
    setQuestionNum(originQuestionNum);
    setCountersign('');
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
        <div className={Styles.message}>{message}</div>
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
