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

  const handleMouseLeave = () => {
    setTimeout(() => {
      setIsActive(false);
    }, 5000);
  };

  const DisplayContent = () => {
    if (content >= 1 && content <= 5) {
      switch (content) {
        case 1:
          return '💙';
        case 2:
          return '💚';
        case 3:
          return '💛';
        case 4:
          return '🧡';
        case 5:
          return '❤️';
        default:
          return null;
      }
    } else if (content >= 6 && content <= 30) {
      const patterns = ['🩷', '💓', '💗', '💖', '❤️‍🔥'];
      const index =
        Math.floor((content - 6) / patterns.length) % patterns.length;
      return patterns[index];
    } else {
      return '📭';
    }
  };

  const infoMessage = () => {
    if (DisplayContent() === '❤️‍🔥') {
      return '축하한다곰! 모든 단계를 넘어섰다곰!';
    } else {
      return '다음 단계도 확인해보라곰!';
    }
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
