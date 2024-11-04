import { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { getCookie } from '@/utils';

import { EmojiContent } from './EmojiContent';

export type AnswererDataType = {
  answerCount: number;
  answererList: {
    _id: string;
    answerer: string;
    createdAt: string;
    updatedAt: string;
  }[];
  questioner: string;
  _id: string;
};

export const AnswererList = ({
  answererData,
  handleSelectSortOrder,
  currentPage,
  onPageChange,
}: {
  answererData: AnswererDataType;
  handleSelectSortOrder: (e: ChangeEvent<HTMLSelectElement>) => void;
  currentPage: number;
  onPageChange: (page: number) => void;
}) => {
  const { diaryId } = useParams();
  const diaryIdCookie =
    getCookie('diaryAddress') || localStorage.getItem('diaryAddress');

  /* 페이지네이션 */
  const itemsPerPage = 5;
  const totalPages = Math.ceil(answererData.answerCount / itemsPerPage);
  const pageRange = 5;

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const totalPagesToShow = Math.min(pageRange, totalPages);
    const currentPageGroup = Math.ceil(currentPage / totalPagesToShow);
    const firstPageInGroup = (currentPageGroup - 1) * totalPagesToShow + 1;
    let endPage = currentPageGroup * totalPagesToShow;

    if (endPage > totalPages) {
      endPage = totalPages;
    }

    for (let i = firstPageInGroup; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handleClickPage = (pageNumber: number) => {
    if (pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  const handleClickPrevButton = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleClickNextButton = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <AnswererListContainer>
      <EmojiContent numOfContent={answererData.answerCount} />
      <SelectWarpper>
        <Select onChange={handleSelectSortOrder} defaultValue="최신 순">
          <Option value="최신 순">최신 순</Option>
          <Option value="오래된 순">오래된 순</Option>
        </Select>
      </SelectWarpper>
      <TableWapper>
        {answererData.answererList.map(data => (
          <Table key={data._id}>
            <Item
              $isDiaryOwner={diaryId === diaryIdCookie}
              $isAnswerer={data._id === diaryIdCookie}
            >
              {data.answerer}님의 답장
            </Item>
          </Table>
        ))}
      </TableWapper>
      <Buttons>
        <PrevButton $currentPage={currentPage} onClick={handleClickPrevButton}>
          {'<'}
        </PrevButton>
        {generatePageNumbers().map(pageNumber => (
          <CurrentButton
            key={pageNumber}
            $pageNumber={pageNumber}
            $currentPage={currentPage}
            onClick={() => handleClickPage(pageNumber)}
          >
            {pageNumber}
          </CurrentButton>
        ))}
        {currentPage <= totalPages && (
          <NextButton
            $answererListLength={answererData.answererList.length}
            onClick={handleClickNextButton}
          >
            {'>'}
          </NextButton>
        )}
      </Buttons>
    </AnswererListContainer>
  );
};

const AnswererListContainer = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const SelectWarpper = styled.div`
  width: 100%;
  text-align: right;
`;

const Select = styled.select`
  border: none;
  background-color: transparent;

  color: var(--point-color);
`;

const Option = styled.option`
  border: none;
  background-color: transparent;
  padding: 3px 0px;
  color: var(--point-color);
`;

const TableWapper = styled.div`
  width: 200px;
`;

const Table = styled.div`
  border-bottom: 1px solid var(--main-color);
  padding: 8px;
  cursor: pointer;
  display: flex;
  font-size: 16px;
  align-items: center;
  justify-content: center;
`;

const Item = styled.div<{ $isDiaryOwner: boolean; $isAnswerer: boolean }>`
  color: ${({ $isDiaryOwner, $isAnswerer }) =>
    $isDiaryOwner ? 'black' : $isAnswerer ? 'var(--point-color)' : ''};
`;

const Buttons = styled.div`
  display: flex;
  gap: 5px;
`;

const PageButton = styled.button`
  border: none;
  background-color: var(--main-color);
  border-radius: 100%;
  width: 20px;
  height: 20px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  margin: 3px;
`;

const PrevButton = styled(PageButton)<{
  $currentPage: number;
}>`
  background-color: ${({ $currentPage }) =>
    $currentPage <= 1 ? 'lightgray' : ''};
  cursor: ${({ $currentPage }) =>
    $currentPage <= 1 ? 'not-allowed' : 'pointer'};
`;

const CurrentButton = styled(PageButton)<{
  $currentPage: number;
  $pageNumber: number;
}>`
  background-color: ${({ $currentPage, $pageNumber }) =>
    $currentPage === $pageNumber ? 'var(--point-color)' : ''};
`;

const NextButton = styled(PageButton)<{ $answererListLength: number }>`
  background-color: ${({ $answererListLength }) =>
    $answererListLength < 5 ? 'lightgray' : ''};
  cursor: ${({ $answererListLength }) =>
    $answererListLength < 5 ? 'not-allowed' : 'pointer'};
`;
