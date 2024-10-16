const kakaoAPI = process.env.REACT_APP_KAKAO_API;

export const initializeKakao = () => {
  const Kakao = window.Kakao;

  if (!Kakao.isInitialized()) {
    Kakao.init(kakaoAPI);
  }
};

export const sendKakaoLink = (
  description: string,
  imageUrl: string,
  link: string,
  buttonTitle: string
) => {
  const Kakao = window.Kakao;

  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: '곰곰 다이어리',
      description,
      imageUrl: imageUrl,
      link: {
        mobileWebUrl: link,
        webUrl: link,
      },
    },
    buttons: [
      {
        title: buttonTitle,
        link: {
          mobileWebUrl: link,
          webUrl: link,
        },
      },
    ],
  });
};
