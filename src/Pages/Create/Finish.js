import React, { useEffect, useState } from 'react';
import Styles from './Finish.module.css';
import ConfettiEffect from '../../components/ConfettiEffect';

import Btn from '../../components/Btn';
import WhiteBtn from '../../components/WhiteBtn';
import CustomModal from '../../components/CustomModal';

import { UserCookie } from '../../store/Create/UserCookie';
import { getCookie } from '../../api/cookie';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { EventTrigger } from '../../gtag';

const Finish = ({ goToFirstStep }) => {
  const [userCookie, setUserCookie] = useRecoilState(UserCookie);

  const navigate = useNavigate('');

  useEffect(() => {
    const fetchUserCookie = async () => {
      try {
        const diaryId = await getCookie('diaryAddress');
        setUserCookie(diaryId);
      } catch (error) {
        console.error('error', error);
      }
    };
    fetchUserCookie();
  }, [setUserCookie]);

  const [isCopied, setIsCopied] = useState(false);

  const handleShareLink = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        setIsCopied(true);
        EventTrigger('click', 'share', '공유하기', 1);
      })
      .catch((error) => {
        console.error('error', error);
      });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsCopied(false);
    setIsModalOpen(false);
  };

  const location = window.location.href;

  const handleKaKaoTalk = () => {
    setIsModalOpen(true);
  };

  const handleGoToAnswerList = () => {
    goToFirstStep();
    navigate(`/answerers/${userCookie}`);
  };

  return (
    <div>
      <ConfettiEffect />
      <div className={Styles.Finish}>
        <div className={Styles.top}>
          <div>🎉</div>
          <div>곰곰다이어리가 완성됐다곰!</div>
          <div>완성된 다이어리를 공유해보세요.</div>
        </div>
        <div className={Styles.middle}>
          <WhiteBtn
            text={'링크로 공유하기'}
            onClick={() => {
              handleShareLink(`${location}diary/${userCookie}`);
            }}
          />
          {isCopied && (
            <CustomModal
              message={'링크를 복사했어요.'}
              updateModal={handleModalClose}
            />
          )}
          <WhiteBtn text={'카톡으로 공유하기'} onClick={handleKaKaoTalk} />
          {isModalOpen && (
            <CustomModal
              message={'현재 개발중입니다. 조금만 기다려주세요 :)'}
              updateModal={handleModalClose}
            />
          )}
        </div>
        <div className={Styles.bottom}>
          <Btn text={'답변 현황 확인하기'} onClick={handleGoToAnswerList} />
        </div>
      </div>
    </div>
  );
};

export default Finish;
