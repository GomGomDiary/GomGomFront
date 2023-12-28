<h1>🐻 GOMGOM DIARY 💌</h1>

> 상대에 대해 곰곰이 생각하고 답하는 곰곰 다이어리

1. 질문의 개수와 내용을 정해 다이어리를 만들어보세요.
2. 나와 관련된 특별한 암호를 설정해보세요.
3. 소중한 친구, 가족, 연인과 공유해 많은 답변을 모아보세요.
4. 답변의 개수에 따라 우체통의 이모지가 달라집니다.

<h2>🐻 배포 링크 </h2>

<img src="https://img.shields.io/badge/AmazonECS-FF9900?style=flat-square&logo=AmazonECS&logoColor=white"/> <img src="https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=Vercel&logoColor=white"/>

- https://gomgomdiary.site/

<h2>🐻 피그마 & 개발 기록 링크 </h2>

- 피그마 ([클릭](https://www.figma.com/file/pAsCM4uEgsCYwCNH907xps/Yoyoo-%26-summermong?type=design&node-id=0-1&mode=design&t=N4pwOJY5is1YHGme-0))
- 개발 기록 (작성중)

<h2>🐻 기획 및 개발 기간 </h2>

- 2023.10.29 ~ 2023.12.10

<h2>🐻 팀원 </h2>

| <img src="https://img.dmitory.com/img/201810/6d1/qxm/6d1qxmdXEIamYoam4QeaYy.jpg" width="200" height="200" /> | <img src="https://avatars.githubusercontent.com/u/124887974?v=4" width="200" height="200" /> |
| :----------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: |
|                                                yoyoo(유영석)                                                 |                                       summermong(황윤)                                       |
|                                                   Backend                                                    |                                           Frontend                                           |

<h2>🐻 기술 스택 </h2>

| Stack                                                                                                                    | Desc                         |
| :----------------------------------------------------------------------------------------------------------------------- | :--------------------------- |
| <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>                      | React                        |
| <img src="https://img.shields.io/badge/Recoil-3578E5?style=flat-square&logo=Recoil&logoColor=white"/>                    | 전역 상태 관리               |
| <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=Axios&logoColor=white"/>                      | API 통신                     |
| <img src="https://img.shields.io/badge/React Router-CA4245?style=flat-square&logo=ReactRouter&logoColor=white"/>         | 라우팅 연결                  |
| <img src="https://img.shields.io/badge/React modal-10539F?style=flat-square&logoColor=white"/>                           | 커스텀 모달 구현             |
| <img src="https://img.shields.io/badge/React Icons-E7157B?style=flat-square&logo=ReactIcons&logoColor=white"/>           | 아이콘                       |
| <img src="https://img.shields.io/badge/CSS Modules-000000?style=flat-square&logo=CSSModules&logoColor=white"/>           | CSS                          |
| <img src="https://img.shields.io/badge/KakaoTalk-FFCD00?style=flat-square&logo=KakaoTalk&logoColor=white"/>              | 카카오톡 메세지 공유하기 API |
| <img src="https://img.shields.io/badge/Google Analytics-E37400?style=flat-square&logo=GoogleAnalytics&logoColor=white"/> | GA4 연결                     |

<h2>🐻 구현 기능 </h2>

- 다이어리 만들기
  - 이름 작성, 질문 개수 설정, 질문 업데이트, 챌린지 & 카운터 사인 생성, 컨페티 효과
- 답장하기
  - 이름 작성, 챌린지 작성, 답변 작성, 컨페티 효과
- 공유하기
  - 링크 복사 & 카카오톡 메세지 공유하기
- 답변 조회하기
  - 오프셋 기반 페이지네이션
- 이전 다이어리 확인하기
  - 커서 기반 페이지네이션(무한 스크롤)

<h2>🐻 커밋 컨벤션 </h2>

| Type     | Desc                                                                          |
| :------- | :---------------------------------------------------------------------------- |
| FEAT     | A new feature                                                                 |
| FIX      | A bug fix                                                                     |
| DOCS     | Changes to documentation                                                      |
| STYLE    | Formatting, missing semi colons, etc; no code change                          |
| REFACTOR | Refactoring production code                                                   |
| TEST     | Adding tests, refactoring test; no production code change                     |
| CHORE    | Updating build tasks, package manager configs, etc; no production code change |

<h2>🐻 폴더 구조 </h2>

<details>
  <summary><b>자세히 보기</b></summary>
  
```📦src
 ┣ 📂Home
 ┃ ┣ 📜Header.js
 ┃ ┣ 📜Header.module.css
 ┃ ┣ 📜Main.js
 ┃ ┗ 📜Main.module.css
 ┣ 📂Pages
 ┃ ┣ 📂Create
 ┃ ┃ ┣ 📜DisplayAnswer.js
 ┃ ┃ ┣ 📜DisplayAnswer.module.css
 ┃ ┃ ┣ 📜DisplayAnswerList.js
 ┃ ┃ ┣ 📜DisplayAnswerList.module.css
 ┃ ┃ ┣ 📜Finish.js
 ┃ ┃ ┣ 📜Finish.module.css
 ┃ ┃ ┣ 📜QuestionList.js
 ┃ ┃ ┣ 📜QuestionList.module.css
 ┃ ┃ ┣ 📜QuestionNumber.js
 ┃ ┃ ┣ 📜QuestionNumber.module.css
 ┃ ┃ ┣ 📜Welcome.js
 ┃ ┃ ┣ 📜Welcome.module.css
 ┃ ┃ ┣ 📜WriteChallenge.js
 ┃ ┃ ┣ 📜WriteChallenge.module.css
 ┃ ┃ ┣ 📜WriteCounterSign.js
 ┃ ┃ ┗ 📜WriteCounterSign.module.css
 ┃ ┣ 📂History
 ┃ ┃ ┣ 📜History.js
 ┃ ┃ ┣ 📜History.module.css
 ┃ ┃ ┣ 📜HistoryItem.js
 ┃ ┃ ┗ 📜HistoryItem.module.css
 ┃ ┣ 📂Response
 ┃ ┃ ┣ 📜Done.js
 ┃ ┃ ┣ 📜Done.module.css
 ┃ ┃ ┣ 📜MatchChallenge.js
 ┃ ┃ ┣ 📜MatchChallenge.module.css
 ┃ ┃ ┣ 📜WriteAnswererName.js
 ┃ ┃ ┣ 📜WriteAnswererName.module.css
 ┃ ┃ ┣ 📜WriteResponse.js
 ┃ ┃ ┗ 📜WriteResponse.module.css
 ┃ ┣ 📜NotFound.js
 ┃ ┗ 📜NotFound.module.css
 ┣ 📂api
 ┃ ┣ 📜cookie.js
 ┃ ┗ 📜customAxios.js
 ┣ 📂components
 ┃ ┣ 📜AnswerModal.js
 ┃ ┣ 📜AnswerModal.module.css
 ┃ ┣ 📜Btn.js
 ┃ ┣ 📜Btn.module.css
 ┃ ┣ 📜ConfettiEffect.js
 ┃ ┣ 📜ConfirmModal.js
 ┃ ┣ 📜CustomModal.js
 ┃ ┣ 📜CustomModal.module.css
 ┃ ┣ 📜Input.js
 ┃ ┣ 📜Input.module.css
 ┃ ┣ 📜ResponseContent.js
 ┃ ┣ 📜ResponseContent.module.css
 ┃ ┣ 📜WhiteBtn.js
 ┃ ┗ 📜WhiteBtn.module.css
 ┣ 📂store
 ┃ ┣ 📂Create
 ┃ ┃ ┣ 📜Answer.js
 ┃ ┃ ┣ 📜Challenge.js
 ┃ ┃ ┣ 📜CounterSign.js
 ┃ ┃ ┣ 📜OriginQuestionArr.js
 ┃ ┃ ┣ 📜OriginQuestionNum.js
 ┃ ┃ ┣ 📜Question.js
 ┃ ┃ ┣ 📜QuestionArr.js
 ┃ ┃ ┣ 📜QuestionNum.js
 ┃ ┃ ┣ 📜Questioner.js
 ┃ ┃ ┣ 📜UpdateClick.js
 ┃ ┃ ┗ 📜UserCookie.js
 ┃ ┗ 📂Response
 ┃ ┃ ┣ 📜Answerer.js
 ┃ ┃ ┣ 📜AnswererCookie.js
 ┃ ┃ ┣ 📜AnswererToken.js
 ┃ ┃ ┗ 📜Response.js
 ┣ 📜App.css
 ┣ 📜App.js
 ┣ 📜gtag.js
 ┣ 📜index.css
 ┗ 📜index.js
```

</details>
