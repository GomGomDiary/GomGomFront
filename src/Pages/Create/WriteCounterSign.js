import React, { useState, useRef } from 'react';
import Styles from './WriteCounterSign.module.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { CounterSign } from '../../store/Create/CounterSign';
import { Questioner } from '../../store/Create/Questioner';
import { QuestionArr } from '../../store/Create/QuestionArr';
import { Challenge } from '../../store/Create/Challenge';

import Input from '../../components/Input';
import Btn from '../../components/Btn';
import WhiteBtn from '../../components/WhiteBtn';
import CustomModal from '../../components/CustomModal';

import instance from '../../api/customAxios';
import { EventTrigger } from '../../gtag';

const WriteCounterSign = ({ onNextStep, onPreviousStep, goToFirstStep }) => {
  const [counterSign, setCounterSign] = useRecoilState(CounterSign);
  const CounterSignInputRef = useRef();
  const [isCountersignWritten, setIsCountersignWritten] = useState(false);

  const questioner = useRecoilValue(Questioner);
  const questionArr = useRecoilValue(QuestionArr);
  const countersign = useRecoilValue(CounterSign);
  const challenge = useRecoilValue(Challenge);

  const writecountersign = (e) => {
    setCounterSign(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitcountersign();
    }
  };

  const [isRewrite, setIsRewrite] = useState(false);

  const submitcountersign = async () => {
    if (counterSign) {
      setCounterSign(counterSign);
      const axiosInstance = instance();

      const { status: statusCode } = await axiosInstance.post(
        'diary/question',
        {
          question: questionArr,
          questioner,
          challenge,
          countersign,
        }
      );

      if (statusCode === 201) {
        onNextStep();
        EventTrigger('click', 'end', '끝까지 만들기', 1);
        return;
      }

      const { data: isCreated } = await axiosInstance.get('diary/');

      if (isCreated) {
        setIsRewrite(true);
      }
    } else {
      setIsCountersignWritten(true);
      CounterSignInputRef.current.focus();
    }
  };

  const handleModalClose = () => {
    setIsCountersignWritten(false);
    setIsRewrite(false);
  };

  return (
    <div className={Styles.WriteCounterSignContainer}>
      {isCountersignWritten && (
        <CustomModal
          message={'암호의 답을 입력해주세요.'}
          updateModal={handleModalClose}
        />
      )}
      <div className={Styles.top}>
        <div>🔑</div>
        <div>거의 다 왔다곰!</div>
        <div>우리만의 암호를 아는 사람만 답장할 수 있도록</div>
        <div>암호의 답을 정확하게 입력해주세요.</div>
        <div>(ex. 0718, INFJ 등)</div>
      </div>
      <div className={Styles.middle}>
        <div className={Styles.countersign}>
          <Input
            text={'다음'}
            value={counterSign}
            onChange={(e) => writecountersign(e)}
            onKeyUp={handleKeyPress}
            placeholder="50자 내외로 입력해주세요."
            ref={CounterSignInputRef}
            maxLength={50}
          />
          <div className={Styles.countersignLength}>
            {counterSign.length}/50
          </div>
        </div>
      </div>
      <div className={Styles.bottom}>
        <WhiteBtn text={'이전으로'} onClick={onPreviousStep} />
        <Btn text={'다음'} onClick={submitcountersign} />
      </div>
      {isRewrite && (
        <CustomModal
          message={'이전 다이어리는 저장됐어요.'}
          updateModal={handleModalClose}
          onNextStep={onNextStep}
        />
      )}
    </div>
  );
};

export default WriteCounterSign;
