import { useQuery } from '@tanstack/react-query';
import { AxiosInstance } from 'axios';

export const useDiaryAnswerStatus = (
  diaryId: string | undefined,
  axiosInstance: AxiosInstance
) =>
  useQuery({
    queryKey: ['diaryAnswerStatus', diaryId],
    queryFn: async () => {
      const response = await axiosInstance.get(`/diary/${diaryId}`);
      return response.data;
    },
    enabled: !!diaryId,
  });
