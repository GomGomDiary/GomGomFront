# [🐻 곰곰 다이어리](https://gomgomdiary.site/)
> 곰곰 다이어리는 상대에 대해 곰곰이 생각하고 답하는 문답 공유 사이트입니다.

<a href="https://gomgomdiary.site/">
<img width="344" alt="image" src="https://github.com/GomGomDiary/GomGomFront/assets/124887974/1e51346e-5c57-4f4a-bc4e-f0e0c207b9c0">
</a>

1. 질문의 개수와 내용을 정해 다이어리 💌 를 만들어보세요.
2. 나와 관련된 특별한 암호를 설정해보세요. 😏
3. 소중한 친구, 가족, 연인과 공유해 많은 답변을 모아보세요. 👥
4. 답변의 개수에 따라 우체통의 이모지가 달라집니다. 📪
<hr />


<!-- TOC -->
### Contents
* [곰곰 다이어리 시연](#곰곰-다이어리-시연)
* [곰곰 다이어리 기술 스택](#곰곰-다이어리-기술-스택)
* [곰곰 다이어리 정보](#곰곰-다이어리-정보)
<br />
<!-- TOC -->


## 곰곰 다이어리 시연
1. 다이어리 생성 (질문 개수, 질문 내용 커스텀 가능)

https://github.com/GomGomDiary/GomGomFront/assets/124887974/3ee6e313-6b56-4c98-88c2-424ec27c181f

2. 답장하기 (질문에 대한 답변 스킵 가능)

https://github.com/GomGomDiary/GomGomFront/assets/124887974/6acfbbb9-68cd-4fe7-9718-c30c9fe6b5f2

3. 공유하기 (링크 공유 / 카카오톡 공유 가능)

https://github.com/GomGomDiary/GomGomFront/assets/124887974/f084eea6-4254-4c53-b6fc-26f35b45a10d

4. 채팅하기

https://github.com/GomGomDiary/GomGomFront/assets/124887974/441e4321-c592-418a-bb60-125ecb45aab3

5. 지난 다이어리 조회하기

https://github.com/GomGomDiary/GomGomFront/assets/124887974/1d34ba37-c710-4843-87bc-f1db664c937b

<br />


## 곰곰 다이어리 기술 스택
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


<br />


## 곰곰 다이어리 정보
* [배포 링크](https://gomgomdiary.site/)
* [피그마 링크](https://www.figma.com/file/pAsCM4uEgsCYwCNH907xps/Yoyoo-%26-summermong?type=design&node-id=0-1&mode=design&t=N4pwOJY5is1YHGme-0)
  
* 개발 기간
  * v1.0.0: 23.10.29 ~ 23.12.29
 
* 개발 인원

| <img src="https://img.dmitory.com/img/201810/6d1/qxm/6d1qxmdXEIamYoam4QeaYy.jpg" width="200" height="200" /> | <img src="https://avatars.githubusercontent.com/u/124887974?v=4" width="200" height="200" /> |
| :----------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------: |
|                                                yoyoo(유영석)                                                 |                                       summermong(황윤)                                       |
|                                                   Backend                                                    |                                           Frontend                                           |


* 코드 컨벤션

| Type     | Desc                                                                          |
| :------- | :---------------------------------------------------------------------------- |
| FEAT     | A new feature                                                                 |
| FIX      | A bug fix                                                                     |
| DOCS     | Changes to documentation                                                      |
| STYLE    | Formatting, missing semi colons, etc; no code change                          |
| REFACTOR | Refactoring production code                                                   |
| TEST     | Adding tests, refactoring test; no production code change                     |
| CHORE    | Updating build tasks, package manager configs, etc; no production code change |
  
<details>
  <summary><b>폴더 구조</b></summary>
    
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
