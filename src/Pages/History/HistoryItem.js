import React, { useEffect, useState } from 'react';
import Styles from './HistoryItem.module.css';
import instance from '../../api/customAxios';
import { useParams } from 'react-router-dom';
import ResponseContent from '../../components/ResponseContent';
import AnswerModal from '../../components/AnswerModal';
import Header from '../../Home/Header';

const HistoryItem = () => {
  const axiosInstance = instance();
  const { historyItemId } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAnswerer, setSelectedAnswerer] = useState(null);

  const [questioner, setQuestioner] = useState('');
  const [challenge, setChallenge] = useState('');
  const [numOfAnswerers, setNumOfAnswerers] = useState(0);
  const [question, setQuestion] = useState([]);
  const [answererList, setAnswererList] = useState([]);

  useEffect(() => {
    const getHistoryInfo = async () => {
      const handleInfo = await axiosInstance.get(`history/${historyItemId}`);
      const challenge = handleInfo.data.challenge;
      setChallenge(challenge);
      const questioner = handleInfo.data.questioner;
      setQuestioner(questioner);
      const numOfAnswerers = handleInfo.data.answerList.length;
      setNumOfAnswerers(numOfAnswerers);
      const answererList = handleInfo.data.answerList;
      setAnswererList(answererList);
      const question = handleInfo.data.question;
      setQuestion(question);
    };
    getHistoryInfo();
  }, []);

  const handleModalOpen = (selectedAnswerer) => {
    setSelectedAnswerer(selectedAnswerer);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedAnswerer(null);
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
              <div>가장 오래된 답변 5개를 확인하라곰!</div>
              <div className={Styles.challengeAndCounterSign}>
                우리가 설정한 암호: [{challenge}]
              </div>
            </div>

            <div className={Styles.listContainer}>
              {answererList.map((person) => (
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
          </div>
        </section>
      </div>
    </div>
  );
};

export default HistoryItem;
