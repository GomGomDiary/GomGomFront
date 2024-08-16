import { useState } from 'react';
import Modal from 'react-modal';
import styles from './Dialog.module.css';

export interface DialogProps {
  message: string;
  updateModal: (isOpen: boolean) => void;
}

const Dialog = ({ message, updateModal }: DialogProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const handleClose = () => {
    setModalIsOpen(false);
    updateModal(false);
  };

  return (
    <Modal
      className={styles.modal}
      overlayClassName={styles.modalOverlay}
      isOpen={modalIsOpen}
      appElement={document.getElementById('root')!}
      onRequestClose={handleClose}
    >
      <div className={styles.modalContent}>
        <div className={styles.message}>{message}</div>
        <div className={styles.modalBtns}>
          {/* <button className={styles.cancelBtn}>취소</button> */}
          <button className={styles.confirmBtn} onClick={handleClose}>
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
};
export default Dialog;
