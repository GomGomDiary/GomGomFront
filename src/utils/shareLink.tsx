import { EventTrigger } from '@/utils/gtag';

export const shareLink = async (link: string, onSuccess?: () => void) => {
  try {
    await navigator.clipboard.writeText(link);

    EventTrigger({
      action: '링크 공유하기',
      category: 'share',
      label: '링크 공유하기',
      value: 1,
    });

    if (onSuccess) onSuccess();
  } catch (error) {
    console.error('링크 복사 실패:', error);
  }
};
