import React, { useEffect } from 'react';
import Styles from './Finish.module.css';
import ConfettiEffect from '../../components/ConfettiEffect';

import Btn from '../../components/Btn';
import WhiteBtn from '../../components/WhiteBtn';

import { UserCookie } from '../../store/Create/UserCookie';
import { getCookie } from '../../api/cookie';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

const Finish = () => {
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

  const handleShareLink = (link) => {
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert('복사 완료!');
      })
      .catch((error) => {
        console.error('error', error);
      });
  };

  const location = window.location.href;

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
          <WhiteBtn
            text={'링크로 공유하기'}
            onClick={() => {
              handleShareLink(`${location}diary/${userCookie}`);
            }}
          />
          <WhiteBtn text={'카톡으로 공유하기'} />
        </div>
        <div className={Styles.bottom}>
          <Btn
            text={'답변 현황 확인하기'}
            onClick={() => navigate(`/answerers/${userCookie}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default Finish;
