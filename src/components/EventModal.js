import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Styles from './CustomModal.module.css';
import { Cookies } from 'react-cookie';

const EventModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);

  const handleClose = () => {
    setModalIsOpen(false);
  };

  const handleGoToEvent = () => {
    window.open(
      'https://www.instagram.com/p/DCGs2VDS9eE/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=='
    );
    setModalIsOpen(false);
  };

  const handleGoToTest = () => {
    window.open('https://pepero-test.vercel.app/');
    setModalIsOpen(false);
  };

  const handleNoShow = () => {
    const cookies = new Cookies();
    cookies.set('isEventNoShow', true, {
      path: '/',
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    });

    setModalIsOpen(false);
  };

  return (
    <Modal
      className={Styles.EventModal}
      overlayClassName={Styles.ModalOverlay}
      isOpen={modalIsOpen}
      appElement={document.getElementById('root')}
      onRequestClose={handleClose}
    >
      <div className={Styles.event}>
        <div className={Styles.eventText}>
          빼빼로데이 테스트를 하고
          <br />
          빼빼로 받아가라곰! 🎁
        </div>
        <img
          src="/image/peperoEvent.webp"
          alt="이벤트 이미지"
          width={200}
          height={200}
        />
        <div className={Styles.eventBtns}>
          <button className={Styles.eventBtn} onClick={handleGoToEvent}>
            이벤트 확인하기
          </button>
          <button className={Styles.eventBtn} onClick={handleGoToTest}>
            테스트 하기
          </button>
          <button className={Styles.closeBtn} onClick={handleClose}>
            닫기
          </button>
        </div>
        <button className={Styles.noShowBtn} onClick={handleNoShow}>
          1일동안 보지않기
        </button>
      </div>
    </Modal>
  );
};

export default EventModal;
