import React, { useRef, useState } from 'react';
import Styles from './WriteChallenge.module.css';
import { useRecoilState } from 'recoil';
import { Challenge } from '../../store/Create/Challenge';

import Input from '../../components/Input';
import Btn from '../../components/Btn';
import WhiteBtn from '../../components/WhiteBtn';
import CustomModal from '../../components/CustomModal';

const WriteChallenge = ({ onNextStep, onPreviousStep }) => {
  const [challenge, setChallenge] = useRecoilState(Challenge);
  const [isSetted, setIsSetted] = useState(false);

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
      onNextStep();
    } else {
      setIsSetted(true);
      challengeInputRef.current.focus();
    }
  };

  const handleModalClose = () => {
    setIsSetted(false);
  };

  return (
    <div className={Styles.WriteChallengeContainer}>
      {isSetted && (
        <CustomModal
          message={'암호를 설정해주세요.'}
          updateModal={handleModalClose}
        />
      )}
      <div className={Styles.top}>
        <div>🔒</div>
        <div>모든 질문이 완성됐다곰!</div>
        <div>우리만의 암호를 아는 사람만 답장할 수 있도록</div>
        <div>암호는 정확하고 명확한 것으로 입력해주세요.</div>
        <div>(ex. 내 생일 4자리, 내 MBTI 대문자 등)</div>
      </div>
      <div className={Styles.middle}>
        <Input
          text={'다음'}
          value={challenge}
          onChange={(e) => writingChallenge(e)}
          onKeyUp={handleKeyPress}
          placeholder="50자 내외로 입력해주세요."
          ref={challengeInputRef}
          maxLength={50}
        />
      </div>
      <div className={Styles.bottom}>
        <WhiteBtn text={'이전으로'} onClick={onPreviousStep} />
        <Btn text={'다음'} onClick={submitChallenge} />
      </div>
    </div>
  );
};

export default WriteChallenge;
