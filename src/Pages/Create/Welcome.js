import React, { useEffect, useRef, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Questioner } from '../../store/Create/Questioner';
import Styles from './Welcome.module.css';
import Btn from '../../components/Btn';
import Input from '../../components/Input';
import { getCookie } from '../../api/cookie';
import { useNavigate } from 'react-router-dom';
import instance from '../../api/customAxios';
import { UpdateClick } from '../../store/Create/UpdateClick';
import CustomModal from '../../components/CustomModal';

const Welcome = ({ onNextStep }) => {
  const [questioner, setQuestioner] = useRecoilState(Questioner);
  const NameInputRef = useRef();

  const writeName = (e) => {
    setQuestioner(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitName();
    }
  };

  const [isWritten, setIsWritten] = useState(false);

  const submitName = () => {
    if (questioner) {
      setQuestioner(questioner);
      onNextStep();
    } else {
      NameInputRef.current.focus();
      setIsWritten(true);
    }
  };

  const handleModalClose = () => {
    setIsWritten(false);
  };

  const diaryId = getCookie('diaryAddress');
  const navigate = useNavigate('');

  const axiosInstance = instance();
  const updateClick = useRecoilValue(UpdateClick);

  useEffect(() => {
    axiosInstance.get('/').then((response) => {
      if (response.data === true && !updateClick) {
        navigate(`/answerers/${diaryId}`);
      }
    });
  }, []);

  return (
    <div className={Styles.Welcome}>
      <div className={Styles.title}>
        <div>🐻💭</div>
        <p></p>상대에 대해 곰곰이 생각하고<p></p>답하는 곰곰 다이어리
      </div>
      <section className={Styles.section}>
        <div>
          반갑다곰! <br></br>먼저 설명을 확인하라곰!
        </div>
        <p></p> 1️⃣ 원하는 만큼, 원하는 대로 질문 만들기
        <p></p> 2️⃣ 나와 관련된 특별한 암호 설정하기
        <p></p> 3️⃣ 친구, 가족, 연인에게 공유하기
        <p></p> 4️⃣ 내 다이어리의 답장 확인하기
      </section>
      <div className={Styles.nameInput}>
        <Input
          type="text"
          value={questioner}
          onChange={(e) => writeName(e)}
          onKeyUp={handleKeyPress}
          placeholder="이름을 입력하세요."
          ref={NameInputRef}
        />
        <Btn text={'시작'} onClick={submitName} />
        {isWritten && (
          <CustomModal
            message={`이름을 입력해주세요.`}
            updateModal={handleModalClose}
          />
        )}
      </div>
    </div>
  );
};

export default Welcome;
