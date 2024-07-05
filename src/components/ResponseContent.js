import React, { useState } from 'react';
import _debounce from 'lodash/debounce';
import Styles from './ResponseContent.module.css';
import ConfettiEffect from './ConfettiEffect';

const ResponseContent = ({ content }) => {
  const [isActive, setIsActive] = useState(false);

  /*
  const handleTouchStart = () => {
    setIsActive(true);
  };

  const handleTouchMove = () => {
    setIsActive(false);
    console.log('Touch Move');
  };

  const handleTouchEnd = () => {
    console.log('Touch End');
    setIsActive(true);
  };
  */

  const handleMouseMove = _debounce(() => {
    setIsActive(true);
  }, 100);

  const handleMouseLeave = _debounce(() => {
    setIsActive(false);
  }, 5000);

  // const DisplayContent = () => {

  //   if (content === 1)

  // }

  const contentArr = [
    { emoji: '🖤', text: '1단계 돌파! 3명 이상이면 다음 단계라곰!' },
    { emoji: '🩶', text: '2단계 돌파! 5명 이상이면 다음 단계라곰!' },
    { emoji: '🤍', text: '3단계 돌파! 7명 이상이면 다음 단계라곰!' },
    { emoji: '💜', text: '4단계 돌파! 9명 이상이면 다음 단계라곰!' },
    { emoji: '💙', text: '5단계 돌파! 11명 이상이면 다음 단계라곰!' },
    { emoji: '🩵', text: '6단계 돌파! 13명 이상이면 다음 단계라곰!' },
    { emoji: '💚', text: '7단계 돌파! 15명 이상이면 다음 단계라곰!' },
    { emoji: '💛', text: '8단계 돌파! 17명 이상이면 다음 단계라곰!' },
    { emoji: '🧡', text: '9단계 돌파! 19명 이상이면 다음 단계라곰!' },
    { emoji: '❤️', text: '10단계 돌파! 25명 이상이면 다음 단계라곰!' },
    { emoji: '🩷', text: '11단계 돌파! 30명 이상이면 다음 단계라곰!' },
    { emoji: '💝', text: '12단계 돌파! 40명 이상이면 다음 단계라곰!' },
    { emoji: '💖', text: '13단계 돌파! 55명 이상이면 다음 단계라곰!' },
    { emoji: '💗', text: '14단계 돌파! 75명 이상이면 다음 단계라곰!' },
    { emoji: '❤️‍🔥', text: '15단계 돌파! 99명 이상이면 다음 단계라곰!' },
    { emoji: '🐻🍀', text: '축하한다곰! 마지막 단계까지 왔다곰!' },
  ];

  const thresholds = [3, 5, 7, 9, 11, 13, 15, 17, 19, 25, 30, 40, 55, 75, 99];

  const DisplayContent = () => {
    for (let i = 0; i < thresholds.length; i++) {
      if (content < thresholds[i]) {
        return contentArr[i].emoji;
      }
    }
    return contentArr[contentArr.length - 1].emoji;
  };

  const infoMessage = () => {
    for (let i = 0; i < thresholds.length; i++) {
      if (content < thresholds[i]) {
        return contentArr[i].text;
      }
    }
    return contentArr[contentArr.length - 1].text;
  };

  return (
    <div
      className={Styles.ResponseContent}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {isActive ? <ConfettiEffect /> : ''}
      {isActive ? (
        <div>
          {DisplayContent()}
          <div className={Styles.info}>{infoMessage()}</div>
        </div>
      ) : (
        <div className={Styles.contentEmoji}>
          📫
          <div className={Styles.info}>답장 수에 따라 우체통이 달라진다곰!</div>
        </div>
      )}
    </div>
  );
};

export default ResponseContent;
