import React, { useEffect, useState } from 'react';
import Styles from './Finish.module.css';

import ConfettiEffect from '../../components/ConfettiEffect';

import Btn from '../../components/Btn';
import WhiteBtn from '../../components/WhiteBtn';
import CustomModal from '../../components/CustomModal';

import { UserCookie } from '../../store/Create/UserCookie';
import { getCookie } from '../../api/cookie';
import { useRecoilState } from 'recoil';
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
    // ?fbclid= 이후의 부분을 찾아 제거
    const indexOfFbclid = link.indexOf('?fbclid=');
    if (indexOfFbclid !== -1) {
      link = link.substring(0, indexOfFbclid);
    }

    navigator.clipboard
      .writeText(link)
      .then(() => {
        setIsCopied(true);
        EventTrigger({
          action: '링크 공유하기',
          category: 'share',
          label: '링크 공유하기',
          value: 1,
        });
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
    if (window.Kakao) {
      const Kakao = window.Kakao;

      const kakaoAPI = process.env.REACT_APP_KAKAO_API;

      if (!Kakao.isInitialized()) {
        window.Kakao.init(kakaoAPI);
        window.Kakao.isInitialized();
      }

      Kakao.Link.sendDefault({
        objectType: 'feed',
        content: {
          title: '곰곰다이어리',
          description: '상대에 대해 곰곰이 생각하고 답해보세요!',
          imageUrl: `${process.env.PUBLIC_URL}/image/OG_Thumb.png`,
          link: {
            mobileWebUrl: `${location}diary/${userCookie}`,
            webUrl: `${location}diary/${userCookie}`,
          },
        },
        buttons: [
          {
            title: '답장하기',
            link: {
              mobileWebUrl: `${location}diary/${userCookie}`,
              webUrl: `${location}diary/${userCookie}`,
            },
          },
        ],
      });
    }
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
          <div>반드시 아래 버튼으로 링크를 공유해주세요!</div>
        </div>
        <div className={Styles.middle}>
          <WhiteBtn
            className={Styles.shareBtn}
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
