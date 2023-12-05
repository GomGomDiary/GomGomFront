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
import { getCookie } from '../../api/cookie';
import ResponseContent from '../../components/ResponseContent';

const DisplayAnswerList = () => {
  const navigate = useNavigate();
  const { diaryId } = useParams();

  const [answererList, setAnswererList] = useState([]);
  const [answererCount, setAnswerCount] = useState(0);
  const [answer, setAnswer] = useRecoilState(Answer);
  const [question, setQuestion] = useRecoilState(Question);
  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(0);
  const axiosInstance = instance();

  const itemsPerPage = 5;
  const totalPages = Math.ceil(answererCount / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const [isOwner, setIsOwner] = useState('');

  useEffect(() => {
    axiosInstance
      .get(`/answerers/${diaryId}/?start=${start}&take=${itemsPerPage}`)
      .then((response) => {
        if (response.status === 200) {
          setAnswererList(response.data.answererList);
          setIsOwner(response.data._id);
          setAnswerCount(response.data.answerCount);
        }
      })
      .catch((e) => /*navigate('/error-route'),*/ console.error());
  }, []);

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

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setStart(start + itemsPerPage);
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setStart(start - itemsPerPage);
      setCurrentPage(currentPage - 1);
    }
  };

  const correctAnswerer = getCookie('diaryAddress');

  return (
    <div className={Styles.DisplayAnswerList}>
      {answererList.length ? (
        <div className={Styles.haveResponse}>
          <div className={Styles.haveResponseImg}>
            <ResponseContent content={answererCount} />
          </div>
          <div className={Styles.haveResponseTitle}>
            {answererCount}명이 질문에 답했어요.
          </div>
          <div className={Styles.listContainer}>
            <table>
              <tbody>
                {answererList.map((person) => (
                  <tr key={person._id}>
                    <td
                      onClick={() => handleDisplayResponse(person._id)}
                      className={
                        person._id === correctAnswerer
                          ? Styles.correctAnswerer
                          : person._id
                          ? Styles.owner
                          : Styles.notCorrect
                      }
                    >
                      {person.answerer} 님의 답장
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={Styles.btns}>
            <button
              className={Styles.preBtn}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              {'<'}
            </button>
            <button
              className={Styles.nextBtn}
              onClick={handleNextPage}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              {'>'}
            </button>
          </div>
          <Btn text={'새로 만들기'} onClick={handleNewDiary} />
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
