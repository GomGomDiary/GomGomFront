import React, { useState } from 'react';
import Styles from './Main.module.css';
import Welcome from '../Pages/Create/Welcome';
import QuestionNumber from '../Pages/Create/QuestionNumber';
import QuestionList from '../Pages/Create/QuestionList';
import WriteChallenge from '../Pages/Create/WriteChallenge';
import WriteCounterSign from '../Pages/Create/WriteCounterSign';
import Finish from '../Pages/Create/Finish';

import MatchChallenge from '../Pages/Response/MatchChallenge';
import WriteAnswererName from '../Pages/Response/WriteAnswererName';
import { useParams } from 'react-router-dom';
import WriteResponse from '../Pages/Response/WriteResponse';
import Done from '../Pages/Response/Done';
import DisplayAnswerList from '../Pages/Create/DisplayAnswerList';
import DisplayAnswer from '../Pages/Create/DisplayAnswer';
import Header from './Header';

const Main = () => {
  const [questionerStep, setQuestionerStep] = useState('welcome');
  const [answererStep, setAnswererStep] = useState('match');
  const { diaryId, answerId } = useParams();

  const onPreviousStep = () => {
    switch (questionerStep) {
      case 'questionNumber':
        setQuestionerStep('welcome');
        break;
      case 'questionList':
        setQuestionerStep('questionNumber');
        break;
      case 'writeChallenge':
        setQuestionerStep('questionList');
        break;
      case 'writeCounterSign':
        setQuestionerStep('writeChallenge');
        break;
      case 'finish':
        setQuestionerStep('writeCounterSign');
        break;
      default:
        break;
    }
    switch (answererStep) {
      case 'writeAnswererName':
        setAnswererStep('match');
        break;
      case 'writeAnswererResponse':
        setAnswererStep('writeAnswererName');
        break;
      default:
        break;
    }
  };

  const renderStep = () => {
    switch (questionerStep) {
      case 'welcome':
        return (
          <Welcome onNextStep={() => setQuestionerStep('questionNumber')} />
        );
      case 'questionNumber':
        return (
          <QuestionNumber
            onNextStep={() => setQuestionerStep('questionList')}
          />
        );
      case 'questionList':
        return (
          <QuestionList
            onNextStep={() => setQuestionerStep('writeChallenge')}
            onPreviousStep={onPreviousStep}
          />
        );
      case 'writeChallenge':
        return (
          <WriteChallenge
            onNextStep={() => setQuestionerStep('writeCounterSign')}
            onPreviousStep={onPreviousStep}
          />
        );
      case 'writeCounterSign':
        return (
          <WriteCounterSign
            onNextStep={() => setQuestionerStep('finish')}
            onPreviousStep={onPreviousStep}
          />
        );
      case 'finish':
        return (
          <Finish
            onNextStep={() => setQuestionerStep('welcome')}
            goToFirstStep={() => setQuestionerStep('welcome')}
            onPreviousStep={onPreviousStep}
          />
        );
      case 'displayAnswerList':
        return <DisplayAnswerList questionerStep={questionerStep} />;
      default:
        return null;
    }
  };

  const renderResponseStep = () => {
    switch (answererStep) {
      case 'match':
        return (
          <MatchChallenge
            onNextStep={() => setAnswererStep('writeAnswererName')}
          />
        );
      case 'writeAnswererName':
        return (
          <WriteAnswererName
            onNextStep={() => setAnswererStep('writeAnswererResponse')}
            onPreviousStep={onPreviousStep}
          />
        );
      case 'writeAnswererResponse':
        return (
          <WriteResponse
            onNextStep={() => setAnswererStep('done')}
            onPreviousStep={onPreviousStep}
          />
        );
      case 'done':
        return <Done goToFirstStep={() => setAnswererStep('welcome')} />;
      default:
        return null;
    }
  };

  const answerers = window.location.pathname.includes('answerers');

  return (
    <div className={Styles.Main}>
      <Header
        questionerStep={questionerStep}
        answererStep={answererStep}
        goToFirstStep={() => setQuestionerStep('welcome')}
      />
      <div className={Styles.center}>
        <section className={Styles.contentContainer}>
          <div className={Styles.content}>
            {diaryId && answerId && <DisplayAnswer />}
            {diaryId && answerers && renderStep() && (
              <DisplayAnswerList
                goToFirstStep={() => setQuestionerStep('welcome')}
                questionerStep={'displayAnswerList'}
              />
            )}
            {!diaryId && renderStep()}
            {diaryId && !answerId && !answerers && renderResponseStep()}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Main;
