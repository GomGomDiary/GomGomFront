import React, { useRef } from 'react';
import { useRecoilState } from 'recoil';
import { Nickname } from '../store/Nickname';
import Styles from './Welcome.module.css';
import Btn from '../components/Btn';
import Input from '../components/Input';

const Welcome = ({ onNextStep }) => {
  const [nickname, setNickname] = useRecoilState(Nickname);
  const NameInputRef = useRef();

  const writeName = (e) => {
    setNickname(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitName();
    }
  };

  const submitName = () => {
    if (nickname) {
      onNextStep();
    } else {
      alert('이름을 입력해주세요.');
      NameInputRef.current.focus();
    }
  };

  return (
    <div className={Styles.Welcome}>
      <div className={Styles.title}>
        <div>🐻💭</div>
        <p></p>상대에 대해 곰곰이 생각하고<p></p>답하는 곰곰이 다이어리
      </div>
      <section className={Styles.section}>
        1. 질문 개수를 정한 후 질문을 확인하세요.
        <p></p> 2. 질문은 원하는대로 수정할 수 있어요.
        <p></p> 3. 질문을 모두 확인했다면 암호를 설정하세요.
        <p></p> 4. 친구나 연인, 가족에게 링크로 공유하세요.
        <p></p> 5. 누가 어떤 답장을 보냈는지 확인해보세요.
      </section>
      <div className={Styles.nameInput}>
        <Input
          type="text"
          value={nickname}
          onChange={(e) => writeName(e)}
          onKeyUp={handleKeyPress}
          placeholder="이름을 입력하세요"
          ref={NameInputRef}
        />
        <Btn text={'시작'} onClick={submitName} />
      </div>
    </div>
  );
};

export default Welcome;
