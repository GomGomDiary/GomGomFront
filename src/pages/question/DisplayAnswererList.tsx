import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import {
  AnswererList,
  EmptyList,
} from '@/components/question/DisplayAnswererList';
import { AnswererListButtons } from '@/components/question/DisplayAnswererList/AnswererListButtons';
import { Loading } from '@/design/Loading';
import { useAnswerersQuery } from '@/hook/question/DisplayAnswer/useFetchAnswer';
import { AnswererListType } from '@/types/answererListType';
import { getCookie, setCookie } from '@/utils';

export const DisplayAnswererList = () => {
  const { diaryId } = useParams();

  const diaryIdCookie = getCookie('diaryAddress');
  const diaryUser = getCookie('diaryUser');
  const localDiaryId = localStorage.getItem('diaryAddress');
  const localDiaryUser = localStorage.getItem('diaryUser');

  const [answererList, setAnswererList] = useState<AnswererListType[]>([]);
  const [, setAnswerCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState('desc');
  const [isDiaryOwner, setIsDiaryOwner] = useState(false);

  useEffect(() => {
    if (diaryIdCookie || diaryUser) {
      localStorage.setItem('diaryAddress', diaryIdCookie);
      localStorage.setItem('diaryUser', diaryUser);
    } else if (localDiaryId || localDiaryUser) {
      setCookie({
        name: 'diaryAddress',
        value: localDiaryId,
        options: {},
      });
      setCookie({
        name: 'diaryUser',
        value: localDiaryUser,
        options: {},
      });
    }
  }, [diaryIdCookie, diaryUser, localDiaryId, localDiaryUser]);

  useEffect(() => {
    if (diaryIdCookie === diaryId) {
      setIsDiaryOwner(true);
    }
  }, [diaryId, diaryIdCookie]);

  const { data, isLoading, isError } = useAnswerersQuery({
    diaryId,
    currentPage,
    sortOrder,
  });

  useEffect(() => {
    if (data) {
      setAnswererList(data.answererList);
      setAnswerCount(data.answerCount);
    }
  }, [data]);

  const handleSelectSortOrder = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value === '오래된 순' ? 'asc' : 'desc');
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>error</div>;

  return (
    <AnswererListContainer>
      {answererList.length > 0 ? (
        <AnswererList
          answererData={data}
          handleSelectSortOrder={handleSelectSortOrder}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      ) : (
        <EmptyList />
      )}
      <AnswererListButtons isDiaryOwner={isDiaryOwner} />
    </AnswererListContainer>
  );
};

const AnswererListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
