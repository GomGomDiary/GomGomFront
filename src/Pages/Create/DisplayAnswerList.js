import React, { useEffect, useState } from 'react';
import Styles from './DisplayAnswerList.module.css';
import instance from '../../api/customAxios';

import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Answer } from '../../store/Create/Answer';
import { Question } from '../../store/Create/Question';
import { useNavigate } from 'react-router-dom';
import Btn from '../../components/Btn';
import { UpdateClick } from '../../store/Create/UpdateClick';

const DisplayAnswerList = () => {
  const navigate = useNavigate();
  const { diaryId } = useParams();

  const [countAnswerer, setCountAnswerer] = useState([]);
  const [answer, setAnswer] = useRecoilState(Answer);
  const [question, setQuestion] = useRecoilState(Question);
  const axiosInstance = instance();

  useEffect(() => {
    axiosInstance
      .get(`/answerers/${diaryId}`)
      .then((response) => {
        if (response.status === 200) {
          setCountAnswerer(response.data.answererList);
        }
      })
      .catch((e) => navigate('/error-route'));
  }, [setCountAnswerer]);

  const handleDisplayResponse = (answerId) => {
    axiosInstance
      .get(`/answer/${diaryId}/${answerId}`)
      .then((response) => {
        setAnswer(response.data.answer);
        setQuestion(response.data.question);
        navigate(`/answer/${diaryId}/${answerId}`);
      })
      .catch((error) => alert('다른 사람의 답변은 볼 수 없어요.'));
  };

  const [updateClick, setUpdateClick] = useRecoilState(UpdateClick);

  const handleNewDiary = async () => {
    const axiosInstance = instance();

    const { data: diaryData } = await axiosInstance.get('');

    if (diaryData) {
      if (window.confirm('다이어리를 다시 만드시겠어요?')) {
        setUpdateClick(true);
        navigate('/');
      }
    }
  };

  return (
    <div className={Styles.DisplayAnswerList}>
      {countAnswerer.length ? (
        <div className={Styles.haveResponse}>
          <div className={Styles.haveResponseImg}>💌</div>
          <div className={Styles.haveResponseTitle}>
            {countAnswerer.length}명이 질문에 답했어요.
          </div>
          <div className={Styles.listContainer}>
            {countAnswerer.map((person) => (
              <div className={Styles.haveResponseList} key={person._id}>
                <div onClick={() => handleDisplayResponse(person._id)}>
                  {person.answerer}님의 답장
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={Styles.noResponse}>
          <div className={Styles.noResponsetitle}>
            아직 아무도 답하지 않았어요.
          </div>
          <div className={Styles.noResponsecontent}>텅</div>
        </div>
      )}
      <Btn text={'새로 만들기'} onClick={handleNewDiary} />
    </div>
  );
};

export default DisplayAnswerList;
