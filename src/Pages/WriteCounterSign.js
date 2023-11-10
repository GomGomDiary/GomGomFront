import React, { useRef } from 'react';
import Styles from './WriteCounterSign.module.css';
import { useRecoilState, useRecoilValue } from 'recoil';

import { CounterSign } from '../store/CounterSign';
import { Questioner } from '../store/Questioner';
import { QuestionArr } from '../store/QuestionArr';
import { Challenge } from '../store/Challenge';

import Input from '../components/Input';
import Btn from '../components/Btn';
import WhiteBtn from '../components/WhiteBtn';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const WriteCounterSign = ({ onNextStep, onPreviousStep }) => {
  const [counterSign, setCounterSign] = useRecoilState(CounterSign);
  const CounterSignInputRef = useRef();

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

  const navigate = useNavigate();

  const submitcountersign = () => {
    if (counterSign) {
      setCounterSign(counterSign);

      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/question`, {
          question: questionArr,
          questioner,
          challenge,
          countersign,
        })
        .then((response) => {
          if (response.status === 201) {
            onNextStep();
          } else if (response.status === 204) {
            if (
              window.confirm(
                '이전에 만든 질문과 받았던 답장들이 모두 사라져도 괜찮나요?'
              )
            ) {
              onNextStep();
            } else {
              alert('처음으로 돌아갈게요!');
              navigate('/');
            }
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      alert('암호의 답을 입력해주세요.');
      CounterSignInputRef.current.focus();
    }
  };

  return (
    <div className={Styles.WriteCounterSignContainer}>
      <div className={Styles.top}>
        <div>🔑</div>
        <div>거의 다 왔어요!</div>
        <div>암호를 푼 사람만 질문을 확인할 수 있어요.</div>
        <div>암호의 답을 정확하고 신중하게 입력해주세요.</div>
      </div>
      <div className={Styles.middle}>
        <Input
          text={'다음'}
          value={counterSign}
          onChange={(e) => writecountersign(e)}
          onKeyUp={handleKeyPress}
          placeholder="암호의 답을 입력하세요."
          ref={CounterSignInputRef}
        />
      </div>
      <div className={Styles.bottom}>
        <WhiteBtn text={'이전으로'} onClick={onPreviousStep} />
        <Btn text={'다음'} onClick={submitcountersign} />
      </div>
    </div>
  );
};

export default WriteCounterSign;
