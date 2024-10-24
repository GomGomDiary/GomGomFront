import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

export const useFetchDiaryInfo = (
  diaryId: string | undefined,
  axiosInstance: AxiosInstance
) =>
  useQuery({
    queryKey: ['diaryInfo', diaryId],
    queryFn: async () => {
      if (!diaryId) throw new Error('diaryId가 없습니다.');
      const response = await axiosInstance.get(`diary/challenge/${diaryId}`);
      if (response.status !== 200) throw new Error('countersign이 틀렸습니다.');
      return response.data;
    },
    enabled: !!diaryId,
  });
