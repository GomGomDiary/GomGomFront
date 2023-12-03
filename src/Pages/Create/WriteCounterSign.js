import React, { useRef } from 'react';
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

import instance from '../../api/customAxios';

const WriteCounterSign = ({ onNextStep, onPreviousStep, goToFirstStep }) => {
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

  const submitcountersign = async () => {
    if (counterSign) {
      setCounterSign(counterSign);
      const axiosInstance = instance();

      const { status: statusCode } = await axiosInstance.post('/question', {
        question: questionArr,
        questioner,
        challenge,
        countersign,
      });

      const { data: isCreated } = await axiosInstance.get('/');

      if (statusCode === 201) {
        onNextStep();
        return;
      }

      if (isCreated) {
        if (window.confirm('다시 만들면 이전 다이어리는 저장됩니다.')) {
          onNextStep();
        } else {
          goToFirstStep();
        }
      }
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
