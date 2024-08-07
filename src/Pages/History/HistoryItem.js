import React, { useEffect, useState } from 'react';
import Styles from './HistoryItem.module.css';
import Style from '../Create/DisplayAnswer.module.css';
import instance from '../../api/customAxios';
import { useParams } from 'react-router-dom';
import ResponseContent from '../../components/ResponseContent';
import AnswerModal from '../../components/AnswerModal';
import Header from '../../Home/Header';
import { getCookie, setCookie } from '../../api/cookie';

const HistoryItem = () => {
  const axiosInstance = instance();
  const { historyItemId } = useParams();

  const diaryId = getCookie('diaryAddress');
  const diaryUser = getCookie('diaryUser');
  const localDiaryId = localStorage.getItem('diaryAddress');
  const localDiaryUser = localStorage.getItem('diaryUser');

  useEffect(() => {
    if (diaryId || diaryUser) {
      localStorage.setItem('diaryAddress', diaryId);
      localStorage.setItem('diaryUser', diaryUser);
    } else if (localDiaryId || localDiaryUser) {
      setCookie('diaryAddress', localDiaryId);
      setCookie('diaryUser', localDiaryUser);
    }
  }, [diaryId, diaryUser, localDiaryId, localDiaryUser]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnswerer, setSelectedAnswerer] = useState(null);

  const [questioner, setQuestioner] = useState('');
  const [challenge, setChallenge] = useState('');
  const [numOfAnswerers, setNumOfAnswerers] = useState(0);
  const [question, setQuestion] = useState([]);
  const [answererList, setAnswererList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const getHistoryInfo = async () => {
      const handleInfo = await axiosInstance.get(
        `history/${historyItemId}?take=5&start=${(currentPage - 1) * 5}`
      );
      const challenge = handleInfo.data.challenge;
      setChallenge(challenge);
      const questioner = handleInfo.data.questioner;
      setQuestioner(questioner);
      const numOfAnswerers = handleInfo.data.numberOfAnswerers;
      setNumOfAnswerers(numOfAnswerers);
      const answererList = handleInfo.data.answerList;
      setAnswererList(answererList);
      const question = handleInfo.data.question;
      setQuestion(question);

      setTotalPages(Math.ceil(numOfAnswerers / 5));
    };
    getHistoryInfo();
  }, [currentPage, historyItemId]);

  const handleModalOpen = selectedAnswerer => {
    setSelectedAnswerer(selectedAnswerer);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAnswerer(null);
  };

  const handlePageClick = pageNumber => {
    setCurrentPage(pageNumber);
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className={Styles.Main}>
      <Header />
      <div className={Styles.center}>
        <section className={Styles.contentContainer}>
          <div className={Styles.content}>
            <div className={Styles.responseImg}>
              <ResponseContent content={numOfAnswerers} />
            </div>
            <div className={Styles.itemInfo}>
              <div className={Styles.title}>{questioner}님의 다이어리</div>
              <div className={Styles.challengeAndCounterSign}>
                우리가 설정한 암호: [{challenge}]
              </div>
            </div>

            <div className={Styles.listTable}>
              {answererList.map(person => (
                <ul
                  key={person._id}
                  className={Styles.answerer}
                  onClick={() => handleModalOpen(person)}
                >
                  <div>{person.answerer} 님의 답장</div>
                  <div className={Styles.createdAt}>
                    {new Date(person.createdAt).toLocaleDateString()}
                  </div>
                </ul>
              ))}
              {isModalOpen && (
                <AnswerModal
                  updateModal={handleModalClose}
                  selectedAnswerer={selectedAnswerer}
                  question={question}
                />
              )}
            </div>

            <div className={Styles.pageBtns}>
              <button
                onClick={() => handlePageClick(currentPage - 1)}
                disabled={currentPage <= 1}
                className={currentPage <= 1 ? Styles.isEndBtn : ''}
              >
                {'<'}
              </button>
              {generatePageNumbers().map(pageNumber => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageClick(pageNumber)}
                  className={
                    pageNumber === currentPage ? Styles.currentPage : null
                  }
                >
                  {pageNumber}
                </button>
              ))}
              <button
                className={answererList.length < 5 ? Styles.isEndBtn : null}
                disabled={answererList.length < 5 ? true : false}
                onClick={() => handlePageClick(currentPage + 1)}
              >
                {'>'}
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HistoryItem;
