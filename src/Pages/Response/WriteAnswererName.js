import React, { useRef, useState } from 'react';
import Styles from './WriteAnswererName.module.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Questioner } from '../../store/Create/Questioner';
import { Answerer } from '../../store/response/Answerer';
import Input from '../../components/Input';
import Btn from '../../components/Btn';
import WhiteBtn from '../../components/WhiteBtn';
import CustomMoal from '../../components/CustomModal';

const WriteAnswererName = ({ onNextStep, onPreviousStep }) => {
  const [answerer, setAnswerer] = useRecoilState(Answerer);
  const NameInputRef = useRef();

  const writeName = e => {
    setAnswerer(e.target.value);
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      submitName();
    }
  };

  const [isNameWritten, setIsNameWritten] = useState(false);

  const submitName = () => {
    if (answerer) {
      setAnswerer(answerer);
      onNextStep();
    } else {
      setIsNameWritten(true);
      NameInputRef.current.focus();
    }
  };

  const handleModalClose = () => {
    setIsNameWritten(false);
  };

  return (
    <div className={Styles.MatchChallengeContainer}>
      <div className={Styles.top}>
        <div>🔓</div>
        <div>
          {useRecoilValue(Questioner)}님에게 <p></p>당신의 이름을 알려주세요.
        </div>
      </div>
      <div className={Styles.middle}>
        <Input
          type="text"
          value={answerer}
          onChange={e => writeName(e)}
          onKeyUp={handleKeyPress}
          placeholder="10자 이내로 이름을 입력하세요."
          ref={NameInputRef}
          maxLength={10}
        />
      </div>
      <div className={Styles.bottom}>
        <WhiteBtn text={'이전으로'} onClick={onPreviousStep} />
        <Btn text={'시작'} onClick={submitName} />
        {isNameWritten && (
          <CustomMoal
            message={'이름을 입력해주세요.'}
            updateModal={handleModalClose}
          />
        )}
      </div>
    </div>
  );
};

export default WriteAnswererName;
