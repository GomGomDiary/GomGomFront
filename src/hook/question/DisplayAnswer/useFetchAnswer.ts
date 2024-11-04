import { useQuery } from '@tanstack/react-query';

import { instance } from '@/utils';

export type fetchAnswerProps = {
  diaryId: string | undefined;
  start: number;
  sortOrder: string;
};

export type fetchAnswerQueryProps = {
  diaryId: string | undefined;
  currentPage: number;
  sortOrder: string;
};

export const fetchAnswerers = async ({
  diaryId,
  start,
  sortOrder,
}: fetchAnswerProps) => {
  const response = await instance().get(
    `diary/answerers/${diaryId}/?start=${start}&take=5&sortOrder=${sortOrder}`
  );
  return response.data;
};

export const useAnswerersQuery = ({
  diaryId,
  currentPage,
  sortOrder,
}: fetchAnswerQueryProps) => {
  const start = (currentPage - 1) * 5;

  return useQuery({
    queryKey: ['answerers', diaryId, currentPage, start, sortOrder],
    queryFn: () => fetchAnswerers({ diaryId, start, sortOrder }),
    enabled: !!diaryId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 5,
  });
};
