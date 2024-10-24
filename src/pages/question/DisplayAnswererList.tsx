import { useAtom } from 'jotai';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import {
  AnswererList,
  EmptyList,
} from '@/components/question/DisplayAnswererList';
import { Loading } from '@/design/Loading';
import { useAnswerersQuery } from '@/hook/question/DisplayAnswer/useFetchAnswer';
import { answerArrAtom } from '@/store/answer';
import { questionArrAtom } from '@/store/question';
import { AnswererListType } from '@/types/answererListType';
import { getCookie } from '@/utils';

export const DisplayAnswererList = () => {
  const { diaryId } = useParams();
  // const navigate = useNavigate();

  /* 쿠키 */
  const diaryIdCookie = getCookie('diaryAddress');
  // const diaryUser = getCookie('diaryUser');
  // const localDiaryId = localStorage.getItem('diaryAddress');
  // const localDiaryUser = localStorage.getItem('diaryUser');

  /* 다이어리 */
  const [answererList, setAnswererList] = useState<AnswererListType[]>([]);
  const [, setAnswerCount] = useState(0);
  // const [answer, setAnswer] = useAtom(answerArrAtom);
  // const [question, setQuestion] = useAtom(questionArrAtom);

  /* 페이지네이션 */
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');
  const itemsPerPage = 5;

  /* 자기 자신인지 확인 */
  const [, setIsDiaryOwner] = useState(false);

  useEffect(() => {
    if (diaryIdCookie === diaryId) {
      setIsDiaryOwner(true);
    }
  });

  const { data, isLoading, isError } = useAnswerersQuery({
    diaryId,
    currentPage,
    itemsPerPage,
    sortOrder,
  });

  useEffect(() => {
    if (data) {
      setAnswererList(data.answererList);
      setAnswerCount(data.answerCount);
    }
  }, [data]);

  if (isError) return <div>error</div>;

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : answererList.length > 0 ? (
        <AnswererList />
      ) : (
        <EmptyList />
      )}
    </div>
  );
};
