import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Styles from './MatchChallenge.module.css';

import Input from '../../components/Input';
import Btn from '../../components/Btn';
import CustomModal from '../../components/CustomModal';

import { useRecoilState, useRecoilValue } from 'recoil';
import { UserCookie } from '../../store/Create/UserCookie';
import { Challenge } from '../../store/Create/Challenge';
import { getCookie } from '../../api/cookie';
import { Questioner } from '../../store/Create/Questioner';
import { AnswererToken } from '../../store/Response/AnswererToken';
import { useNavigate } from 'react-router-dom';
import { AnswererCookie } from '../../store/Response/AnswererCookie';

const MatchChallenge = ({ onNextStep }) => {
  const [userCookie, setUserCookie] = useRecoilState(UserCookie);
  const [questioner, setQuestioner] = useRecoilState(Questioner);
  const [challenge, setChallenge] = useRecoilState(Challenge);
  const [answererToken, setAnswererToken] = useRecoilState(AnswererToken);
  const [answererCookie, setAnswererCookie] = useRecoilValue(AnswererCookie);

  useEffect(() => {
    const fetchUserCookie = () => {
      try {
        const diaryId = getCookie('diaryUser');
        setUserCookie(diaryId);
      } catch (error) {
        console.error('error', error);
      }
    };
    fetchUserCookie();
  }, []);

  const diaryId = useRecoilValue(UserCookie);
  const answerId = useRecoilValue(AnswererCookie);

  const navigate = useNavigate('');

  useEffect(() => {
    if (diaryId === answerId) {
      alert('자신의 다이어리엔 답할 수 없어요.');
      navigate('/');
    } else if (!!diaryId) {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/challenge/${diaryId}`)
        .then((response) => {
          if (response.status === 200) {
            setChallenge(response.data.challenge);
            setQuestioner(response.data.questioner);
          } else {
            console.error('nono');
          }
        })
        .catch((error) => {
          alert('생성된 적 없는 다이어리예요.');
          navigate('/');
        });
    }
  }, [diaryId]);

  const CountersignInput = useRef();
  const [countersign, setCountersign] = useState('');

  const writeCountersign = (e) => {
    setCountersign(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      submitCountersign();
    }
  };

  const submitCountersign = () => {
    if (countersign) {
      axios
        .post(
          `${process.env.REACT_APP_SERVER_URL}/countersign/${diaryId}`,
          { countersign },
          { withCredentials: true }
        )
        .then((response) => {
          alert('정답');
          setAnswererToken(response.data.diaryToken);
          onNextStep();
        })
        .catch((error) => {
          alert('에러가 났어요. 다시 입력해주세요.');
          console.error(error);
          CountersignInput.current.focus();
        });
    } else {
      alert('다시 입력해주세요.');
      CountersignInput.current.focus();
    }
  };

  return (
    <div className={Styles.MatchChallengeContainer}>
      <div className={Styles.top}>
        <div>🔒</div>
        <div>
          {useRecoilValue(Questioner)}님의 질문지를 보려면 <p></p>암호를
          맞춰야해요!
        </div>
      </div>
      <div className={Styles.middle}>{useRecoilValue(Challenge)}</div>
      <div className={Styles.bottom}>
        <Input
          type="text"
          value={countersign}
          onChange={(e) => writeCountersign(e)}
          placeholder="암호를 입력하세요."
          onKeyUp={handleKeyPress}
          ref={CountersignInput}
        />
        <Btn text={'다음'} onClick={submitCountersign} />
      </div>
    </div>
  );
};

export default MatchChallenge;
