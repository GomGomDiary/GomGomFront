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

const Main = () => {
  const [step, setStep] = useState(1);
  const { diaryId, answerId } = useParams();

  const onPreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Welcome onNextStep={() => setStep(2)} />;
      case 2:
        return <QuestionNumber onNextStep={() => setStep(3)} />;
      case 3:
        return (
          <QuestionList
            onNextStep={() => setStep(4)}
            onPreviousStep={onPreviousStep}
          />
        );
      case 4:
        return (
          <WriteChallenge
            onNextStep={() => setStep(5)}
            onPreviousStep={onPreviousStep}
          />
        );
      case 5:
        return (
          <WriteCounterSign
            onNextStep={() => setStep(6)}
            onPreviousStep={onPreviousStep}
          />
        );
      case 6:
        return <Finish onNextStep={() => setStep(7)} />;
      default:
        return null;
    }
  };

  const renderResponseStep = () => {
    switch (step) {
      case 1:
        return <MatchChallenge onNextStep={() => setStep(2)} />;
      case 2:
        return (
          <WriteAnswererName
            onNextStep={() => setStep(3)}
            onPreviousStep={onPreviousStep}
          />
        );
      case 3:
        return (
          <WriteResponse
            onNextStep={() => setStep(4)}
            onPreviousStep={onPreviousStep}
          />
        );
      case 4:
        return <Done onNextStep={() => setStep(5)} />;
      default:
        return null;
    }
  };

  return (
    <div className={Styles.Main}>
      <div className={Styles.center}>
        <div className={Styles.pin}>📌</div>
        <section className={Styles.content}>
          {diaryId && answerId && (
            <>
              <DisplayAnswer />
            </>
          )}

          {diaryId && window.location.pathname.includes('answerers') && (
            <>
              <DisplayAnswerList />
            </>
          )}
          {!diaryId && <>{renderStep()}</>}
          {diaryId &&
            !answerId &&
            !window.location.pathname.includes('answerers') && (
              <>{renderResponseStep()}</>
            )}
        </section>
      </div>
    </div>
  );
};

export default Main;
