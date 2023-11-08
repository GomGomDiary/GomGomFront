import React from 'react';
import Styles from './Finish.module.css';
import ConfettiEffect from '../components/ConfettiEffect';

import Btn from '../components/Btn';
import WhiteBtn from '../components/WhiteBtn';
import { useRecoilValue } from 'recoil';
import { QuestionArr } from '../store/QuestionArr';

const Finish = () => {
  const questionArr = useRecoilValue(QuestionArr);
  console.log(questionArr);
  return (
    <div>
      <ConfettiEffect />
      <div className={Styles.Finish}>
        <div className={Styles.top}>
          <div>🎉</div>
          <div>곰곰다이어리가 완성됐어요!</div>
          <div>완성된 다이어리를 공유해보세요.</div>
        </div>
        <div className={Styles.middle}>
          <WhiteBtn text={'링크로 공유하기'} />
          <WhiteBtn text={'카톡으로 공유하기'} />
        </div>
        <div className={Styles.bottom}>
          <Btn text={'답변 현황 확인하기'} />
        </div>
      </div>
    </div>
  );
};

export default Finish;
