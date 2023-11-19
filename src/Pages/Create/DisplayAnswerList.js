import React, { useEffect, useState } from 'react';
import Styles from './DisplayAnswerList.module.css';
import axios from 'axios';

import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { AnswererCookie } from '../../store/Response/AnswererCookie';
import { UserCookie } from '../../store/Create/UserCookie';
import { getCookie } from '../../api/cookie';

const DisplayAnswerList = () => {
  const { diaryId } = useParams();

  const [countAnswerer, setCountAnswerer] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/answerers/${diaryId}`)
      .then((response) => {
        if (response.status === 200) {
          setCountAnswerer(response.data.answererList);
        }
      });
  }, [setCountAnswerer]);

  const handleDisplayResponse = (answerId) => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/answer/${diaryId}/${answerId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(diaryId));
  };

  return (
    <div>
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
                <div>{person._id}</div>
                <div>{diaryId}</div>
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
    </div>
  );
};

export default DisplayAnswerList;
