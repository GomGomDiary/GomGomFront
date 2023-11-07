import React, { useRef } from 'react';
import Styles from './WriteCounterSign.module.css';
import { useRecoilState } from 'recoil';
import { CounterSign } from '../store/CounterSign';

import Input from '../components/Input';
import Btn from '../components/Btn';
import WhiteBtn from '../components/WhiteBtn';

const WriteCounterSign = ({ onNextStep, onPreviousStep }) => {
  const [counterSign, setCounterSign] = useRecoilState(CounterSign);
  const CounterSignInputRef = useRef();

  const writecountersign = (e) => {
    setCounterSign(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitcountersign();
    }
  };

  const submitcountersign = () => {
    if (counterSign) {
      setCounterSign(counterSign);
      onNextStep();
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
