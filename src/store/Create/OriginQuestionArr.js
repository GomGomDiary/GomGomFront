import { atom } from 'recoil';

export const OriginQuestionArr = atom({
  key: 'OriginQuestionArr',
  default: [
    '나는 어떤 사람이야?',
    '우리는 어떤 점이 비슷하고 달라?',
    '내가 가장 좋아하는 음식은?',
    '내가 너에게 준 좋은 영향은?',
    '10년 후 우리는 어떤 모습일까?',
    '나에게 하고 싶은 말 있어?',
    '나랑 가보고 싶은 곳 있어?',
    '네가 생각하는 나의 장점은 뭐야?',
    '나와 가장 소중한 추억은?',
    '나에게 추천하고 싶은 노래는?',
  ],
});
