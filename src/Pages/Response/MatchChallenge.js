import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../api/customAxios';
import Styles from './MatchChallenge.module.css';

import Input from '../../components/Input';
import Btn from '../../components/Btn';
import CustomModal from '../../components/CustomModal';

import { useRecoilState, useRecoilValue } from 'recoil';
import { useParams } from 'react-router-dom';
import { UserCookie } from '../../store/Create/UserCookie';
import { Challenge } from '../../store/Create/Challenge';
import { Questioner } from '../../store/Create/Questioner';
import { AnswererToken } from '../../store/Response/AnswererToken';

const MatchChallenge = ({ onNextStep }) => {
  const [userCookie, setUserCookie] = useRecoilState(UserCookie);
  const [questioner, setQuestioner] = useRecoilState(Questioner);
  const [challenge, setChallenge] = useRecoilState(Challenge);
  const [answererToken, setAnswererToken] = useRecoilState(AnswererToken);

  const { diaryId } = useParams();

  const navigate = useNavigate('');
  const [countersign, setCountersign] = useState('');
  const axiosInstance = instance(answererToken);

  useEffect(() => {
    if (!!diaryId) {
      setUserCookie(diaryId);

      axiosInstance
        .get(`/challenge/${diaryId}`)
        .then((response) => {
          if (response.status === 200) {
            setChallenge(response.data.challenge);
            setQuestioner(response.data.questioner);
          }
        })
        .catch((error) => {
          alert('생성된 적 없는 다이어리예요.');
          navigate('/');
        });
    }
  }, [diaryId, setUserCookie, setChallenge, setQuestioner, navigate]);

  const CountersignInput = useRef();

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
      axiosInstance
        .post(`/countersign/${diaryId}`, { countersign })
        .then((response) => {
          alert('정답');
          setAnswererToken(response.data.diaryToken);
          onNextStep();
        })
        .catch(() => {
          alert('틀렸어요. 다시 입력해주세요.');
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
          {useRecoilValue(Questioner)}님의 질문지를 보려면 <p></p>암호를 맞춰야
          한다곰!
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
