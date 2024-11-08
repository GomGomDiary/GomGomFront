import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Questioner } from '../../store/Create/Questioner';
import Styles from './Welcome.module.css';
import Btn from '../../components/Btn';
import Input from '../../components/Input';
import { getCookie, setCookie } from '../../api/cookie';
import { useNavigate } from 'react-router-dom';
import instance from '../../api/customAxios';
import { UpdateClick } from '../../store/Create/UpdateClick';
import CustomModal from '../../components/CustomModal';
import { EventTrigger } from '../../gtag';
import EventModal from '../../components/EventModal';

const Welcome = ({ onNextStep }) => {
  const [questioner, setQuestioner] = useRecoilState(Questioner);
  const NameInputRef = useRef();

  const writeName = e => {
    setQuestioner(e.target.value);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      submitName();
    }
  };

  const [isNameWritten, setIsNameWritten] = useState(false);

  const submitName = () => {
    if (questioner) {
      setQuestioner(questioner);
      onNextStep();
      EventTrigger({
        action: '다이어리 만들기',
        category: 'start',
        label: '다이어리 만들기',
        value: 1,
      });
    } else {
      NameInputRef.current.focus();
      setIsNameWritten(true);
    }
  };

  const handleModalClose = () => {
    setIsNameWritten(false);
  };

  const diaryId = getCookie('diaryAddress');
  const diaryUser = getCookie('diaryUser');
  const localDiaryId = localStorage.getItem('diaryAddress');
  const localDiaryUser = localStorage.getItem('diaryUser');

  const navigate = useNavigate();
  const axiosInstance = instance();
  const [updateClick, setUpdateClick] = useRecoilState(UpdateClick);

  useEffect(() => {
    // 쿠키에 있는 값이 로컬 스토리지로, 로컬 스토리지에 있는 값이 쿠키로 이동
    if (diaryId || diaryUser) {
      localStorage.setItem('diaryAddress', diaryId);
      localStorage.setItem('diaryUser', diaryUser);
    } else if (localDiaryId || localDiaryUser) {
      setCookie('diaryAddress', localDiaryId);
      setCookie('diaryUser', localDiaryUser);
    }
  }, [diaryId, diaryUser, localDiaryId, localDiaryUser]);

  useEffect(() => {
    const checkDiary = async () => {
      try {
        const response = await axiosInstance.get('/diary');
        if (response.data === true && !updateClick) {
          const redirectDiaryId = diaryId || localDiaryId;
          localStorage.setItem('diaryAddress', redirectDiaryId); // 로컬 스토리지에 저장
          navigate(`/answerers/${redirectDiaryId}`);
        }
      } catch (error) {
        console.error('다이어리 확인 중 오류 발생:', error);
      }
      setUpdateClick(false);
    };

    checkDiary();
  }, []);

  const noEventShow = getCookie('isEventNoShow');

  return (
    <div className={Styles.Welcome}>
      <div className={Styles.title}>
        <div>🐻💭</div>
        <p></p>상대에 대해 곰곰이 생각하고<p></p>답하는 곰곰 다이어리
      </div>
      <section className={Styles.section}>
        <div>반갑다곰!</div>
        <p></p>질문을 만들고 특별한 암호를 설정한 뒤<p></p>소중한 친구, 가족,
        연인과 공유해서<p></p>많은 답변과 추억을 쌓아보라곰!
      </section>
      <div className={Styles.nameInput}>
        <Input
          type="text"
          value={questioner}
          onChange={writeName}
          onKeyUp={handleKeyPress}
          placeholder="10자 이내로 이름을 입력하세요."
          ref={NameInputRef}
          maxLength={10}
        />
        <Btn text={'시작'} onClick={submitName} />
        {isNameWritten && (
          <CustomModal
            message={`이름을 입력해주세요.`}
            updateModal={handleModalClose}
          />
        )}
      </div>
      {!noEventShow && <EventModal />}
    </div>
  );
};

export default Welcome;
