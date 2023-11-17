import React, { useEffect } from 'react';
import axios from 'axios';
import Styles from './Done.module.css';
import ConfettiEffect from '../../components/ConfettiEffect';

import Btn from '../../components/Btn';
import WhiteBtn from '../../components/WhiteBtn';

import { UserCookie } from '../../store/Create/UserCookie';
import { getCookie } from '../../api/cookie';
import { Answerer } from '../../store/Response/Answerer';
import { Response } from '../../store/Response/Response';
import { Questioner } from '../../store/Create/Questioner';
import { useRecoilState, useRecoilValue } from 'recoil';
import { AnswererToken } from '../../store/Response/AnswererToken';

const Done = () => {
  const [userCookie, setUserCookie] = useRecoilState(UserCookie);
  const answererJWT = useRecoilValue(AnswererToken);
  const answerer = useRecoilValue(Answerer);
  const response = useRecoilValue(Response);

  const api = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_URL}`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${answererJWT}`,
    },
  });

  const diaryId = useRecoilValue(UserCookie);

  useEffect(() => {
    const fetchUserCookie = async () => {
      try {
        api.post(
          `/answer/${diaryId}`,
          {
            answerer: answerer,
            answers: response,
          },
          { withCredentials: true }
        );
      } catch (error) {
        console.error('error', error);
      }
    };
    fetchUserCookie();
  }, [setUserCookie]);

  console.log(answerer);
  return (
    <div>
      <ConfettiEffect />
      <div className={Styles.Done}>
        <div className={Styles.top}>
          <div>🎉</div>
          <div>곰곰다이어리가 완성됐어요!</div>
          <div>{useRecoilValue(Questioner)}님에게 알려보세요!</div>
        </div>
        <div className={Styles.middle}>
          <WhiteBtn text={'카톡으로 알리기'} />
          <WhiteBtn text={'내 답장 확인하기'} />
        </div>
        <div className={Styles.bottom}>
          <Btn text={'내 곰곰다이어리 만들기'} />
        </div>
      </div>
    </div>
  );
};

export default Done;
