import React, { useEffect, useState } from 'react';
import instance from '../../api/customAxios';
import Styles from './History.module.css';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../../components/CustomModal';

const History = () => {
  const axiosInstance = instance();
  const navigate = useNavigate('');

  const [isError, setIsError] = useState(false);
  const [originNext, setOriginNext] = useState('');
  const [historyList, setHistoryList] = useState([]);
  const [end, setEnd] = useState(false);
  const [loading, setLoading] = useState(false);

  /* 처음에 데이터 받아 오기*/
  useEffect(() => {
    fetchOriginList();
  }, []);

  const fetchOriginList = async () => {
    try {
      const originList = await axiosInstance.get(`history?take=5`);
      if (originList.data.historyList.length === 0) {
        setIsError(true);
      } else {
        setHistoryList(originList.data.historyList);
        setOriginNext(originList.data.next);
        setLoading(true);
      }
    } catch (e) {
      setIsError(true);
    }
  };

  const handleModalClose = () => {
    setIsError(false);
    navigate('/');
  };

  /* 첫 데이터 next를 기준으로 다음 리스트 요청 */
  const fetchNextList = async (next) => {
    try {
      const response = await axiosInstance.get(`history?next=${next}&take=5`);
      const nextList = response.data.historyList;
      setOriginNext(response.data.next);
      return nextList;
    } catch (e) {
      return [];
    }
  };

  /* 추가 데이터 받아 오기 */
  const [fetching, setFetching] = useState(false);
  const fetchMoreHistory = async () => {
    setFetching(true);

    const nextList = await fetchNextList(originNext);

    if (nextList.length > 0) {
      setHistoryList((prevList) => [...prevList, ...nextList]);
      setEnd(false);
    } else {
      setEnd(true);
    }
    setFetching(false);
    console.log(nextList);
  };

  /* 스크롤 이벤트 핸들러 */
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
      /* 페이지 끝에 오면 추가 데이터 받기 */
      fetchMoreHistory();
      setEnd(true);
    } else {
      setLoading(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  });

  const navigateHistoryItem = async (userId) => {
    const { data: getId } = await axiosInstance.get(`history/${userId}`);

    const historyItemId = getId._id;
    navigate(`/history/${historyItemId}`);
  };

  return (
    <div className={Styles.Main}>
      <div className={Styles.center}>
        <section className={Styles.content}>
          <div className={Styles.title}>
            <div>📮</div>
            <div>
              저장된 다이어리를<p></p> 확인해보라곰!
            </div>
          </div>
          <div className={Styles.historyList}>
            {historyList.map((historyItem, index) => (
              <ul
                key={historyItem._id}
                className={Styles.history}
                onClick={() => navigateHistoryItem(historyItem._id)}
              >
                <div>
                  💌 {index + 1}번째 다이어리 답장 수:
                  {historyItem.numberOfAnswerers}
                </div>
                <div>
                  {new Date(historyItem.createdAt).toLocaleDateString()}
                </div>
              </ul>
            ))}
          </div>
          {loading && (
            <div className={Styles.description}>
              {end ? '더 이상 다이어리가 없어요.' : 'Loading...'}
            </div>
          )}
          {isError && (
            <CustomModal
              message={'저장된 다이어리가 없어요.'}
              updateModal={handleModalClose}
            />
          )}
        </section>
      </div>
    </div>
  );
};

export default History;
