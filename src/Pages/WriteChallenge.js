import React, { useState, useRef } from 'react';
import Styles from './WriteChallenge.module.css';
import { useRecoilState } from 'recoil';
import { Challenge } from '../store/Challenge';

import Input from '../components/Input';
import Btn from '../components/Btn';

const WriteChallenge = ({ onNextStep }) => {
  const [challenge, setChallenge] = useRecoilState(Challenge);
  const challengeInputRef = useRef();

  const writingChallenge = (e) => {
    setChallenge(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitChallenge();
    }
  };

  const submitChallenge = () => {
    if (challenge) {
      console.log(challenge);
      onNextStep();
    } else {
      alert('암호를 입력해주세요.');
      challengeInputRef.current.focus();
    }
  };

  return (
    <div className={Styles.WriteChallengeContainer}>
      <div className={Styles.top}>
        <div>🔒</div>
        <div>모든 질문이 완성됐어요!</div>
        <div>특별한 사람만 답할 수 있게 암호를 설정하세요.</div>
        <div>암호는 신중하고 정확하게 입력해주세요.</div>
      </div>
      <div className={Styles.bottom}>
        <Input
          text={'다음'}
          value={challenge}
          onChange={(e) => writingChallenge(e)}
          onKeyUp={handleKeyPress}
          placeholder="암호를 입력하세요"
          ref={challengeInputRef}
        />
        <Btn text={'다음'} onClick={submitChallenge} />
      </div>
    </div>
  );
};

export default WriteChallenge;
