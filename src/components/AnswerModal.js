import React, { useState } from 'react';
import Modal from 'react-modal';
import Styles from './AnswerModal.module.css';

const AnswerModal = ({ updateModal, selectedAnswerer, question }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const handleClose = () => {
    setModalIsOpen(false);
    updateModal(false);
  };

  const arr = [];

  for (let i = 0; i < question.length; i++) {
    arr.push(`${i + 1}번 `);
    arr.push(`A: ${question[i]}`);
    arr.push(`Q: ${selectedAnswerer.answers[i]}`);
  }

  return (
    <Modal
      className={Styles.Modal}
      overlayClassName={Styles.ModalOverlay}
      isOpen={modalIsOpen}
      appElement={document.getElementById('root')}
      onRequestClose={handleClose}
    >
      <div className={Styles.ModalContent}>
        <div className={Styles.answerer}>
          {selectedAnswerer.answerer}님의 답장 💌
        </div>
        <div className={Styles.content}>
          <div className={Styles.qna}>
            {arr.map((num, idx) => (
              <div key={idx}>{num}</div>
            ))}
          </div>
        </div>
        <div className={Styles.ModalBtns}>
          <button className={Styles.okBtn} onClick={handleClose}>
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AnswerModal;
