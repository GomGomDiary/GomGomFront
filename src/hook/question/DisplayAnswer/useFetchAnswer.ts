import { useQuery } from '@tanstack/react-query';

import { instance } from '@/utils';

export type fetchAnswerProps = {
  diaryId: string | undefined;
  start: number;
  itemsPerPage: number;
  sortOrder: string;
};

export type fetchAnswerQueryProps = {
  diaryId: string | undefined;
  itemsPerPage: number;
  currentPage: number;
  sortOrder: string;
};

export const fetchAnswerers = async ({
  diaryId,
  start,
  itemsPerPage,
  sortOrder,
}: fetchAnswerProps) => {
  const response = await instance().get(
    `diary/answerers/${diaryId}/?start=${start}&take=${itemsPerPage}&sortOrder=${sortOrder}`
  );
  return response.data;
};

export const useAnswerersQuery = ({
  diaryId,
  currentPage,
  itemsPerPage,
  sortOrder,
}: fetchAnswerQueryProps) => {
  const start = (currentPage - 1) * itemsPerPage;

  return useQuery({
    queryKey: ['answerers', diaryId, currentPage, sortOrder],
    queryFn: () => fetchAnswerers({ diaryId, start, itemsPerPage, sortOrder }),
    enabled: !!diaryId,
    staleTime: 1000 * 60 * 5,
  });
};
