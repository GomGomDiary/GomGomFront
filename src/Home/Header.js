import React, { useState } from 'react';
import Styles from './Header.module.css';
import { MdOutlineHistory } from 'react-icons/md';
import { IoMdHelpCircle } from 'react-icons/io';
import { RiMenuLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { Questioner } from '../store/Create/Questioner';
import { QuestionArr } from '../store/Create/QuestionArr';
import { QuestionNum } from '../store/Create/QuestionNum';
import { Challenge } from '../store/Create/Challenge';
import { CounterSign } from '../store/Create/CounterSign';
import { OriginQuestionNum } from '../store/Create/OriginQuestionNum';
import { OriginQuestionArr } from '../store/Create/OriginQuestionArr';
import CustomModal from '../components/CustomModal';

const Header = ({ questionerStep, answererStep }) => {
  const navigate = useNavigate('');

  const handleGoToHistory = () => {
    setQuestioner('');
    setQuestionArr(originQuestionArr);
    setChallenge('');
    setQuestionNum(originQuestionNum);
    setCountersign('');
    navigate('/history');
  };

  const [questioner, setQuestioner] = useRecoilState(Questioner);
  const [questionArr, setQuestionArr] = useRecoilState(QuestionArr);
  const [challenge, setChallenge] = useRecoilState(Challenge);
  const [questionNum, setQuestionNum] = useRecoilState(QuestionNum);
  const [countersign, setCountersign] = useRecoilState(CounterSign);
  const [originQuestionArr, setOriginQuestionArr] =
    useRecoilState(OriginQuestionArr);
  const [originQuestionNum, setOriginQuestionNum] =
    useRecoilState(OriginQuestionNum);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [isReceivedMessage, setIsReceivedMessage] = useState(false);

  const handleGoToMain = () => {
    if (
      questionerStep === 'questionNumber' ||
      questionerStep === 'questionList' ||
      questionerStep === 'writeChallenge' ||
      questionerStep === 'writeCounterSign' ||
      answererStep === 'writeAnswererName' ||
      answererStep === 'writeAnswererResponse'
    ) {
      setIsModalOpen(true);
    } else {
      setQuestioner('');
      setQuestionArr(originQuestionArr);
      setChallenge('');
      setQuestionNum(originQuestionNum);
      setCountersign('');
      navigate('/');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setIsReceivedMessage(false);
  };

  const handleDropdown = () => {
    setIsDropDownOpen(!isDropDownOpen);
  };

  const handleGoToInsta = () => {
    window.location.href = 'https://www.instagram.com/gom._.gom._.diary/';
  };

  const handleGoToForm = () => {
    window.location.href =
      'https://gomgomdiary.notion.site/136f315888588081bc18fa2fdc4ab0be?pvs=4';
  };

  // 채팅 알람
  const handleAlarm = () => {
    setIsReceivedMessage(!isReceivedMessage);
  };

  return (
    <div className={Styles.Header}>
      <MdOutlineHistory
        className={Styles.history}
        onClick={handleGoToHistory}
      />
      <div className={Styles.title} onClick={handleGoToMain}>
        GomGom Diary 🐻💭
      </div>

      {/* <FaBell
        className={
          isReceivedMessage
            ? `${Styles.haveNewMessage} ${Styles.noNewMessage}`
            : Styles.noNewMessage
        }
        onClick={handleAlarm}
      /> */}
      <RiMenuLine className={Styles.menu} onClick={handleDropdown} />
      {isDropDownOpen && (
        <ul className={Styles.dropdown}>
          <li onClick={handleGoToInsta}>공식 인스타그램</li>
          <li onClick={handleGoToForm}>곰곰 다이어리 소개 & 문의 페이지</li>
        </ul>
      )}
      {isModalOpen && (
        <CustomModal
          message={'작성중에는 메인으로 갈 수 없어요.'}
          updateModal={handleModalClose}
        />
      )}
      {isReceivedMessage && (
        <CustomModal
          message={'개발중입니다. 조금만 기다려주세요!'}
          updateModal={handleModalClose}
        />
      )}
    </div>
  );
};

export default Header;
