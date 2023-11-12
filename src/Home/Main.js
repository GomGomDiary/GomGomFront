import React, { useState } from 'react';
import Styles from './Main.module.css';
import Welcome from '../Pages/Create/Welcome';
import QuestionNumber from '../Pages/Create/QuestionNumber';
import QuestionList from '../Pages/Create/QuestionList';
import WriteChallenge from '../Pages/Create/WriteChallenge';
import WriteCounterSign from '../Pages/Create/WriteCounterSign';
import Finish from '../Pages/Create/Finish';

import MatchChallenge from '../Pages/Response/MatchChallenge';
import { useParams } from 'react-router-dom';

const Main = () => {
  const [step, setStep] = useState(1);

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
      case 7:
        return <MatchChallenge onNextStep={() => setStep(8)} />;
      default:
        return null;
    }
  };

  return (
    <div className={Styles.Main}>
      <div className={Styles.center}>
        <div className={Styles.pin}>📌</div>
        <section className={Styles.content}>
          {useParams().diaryId ? <MatchChallenge /> : renderStep()}
        </section>
      </div>
    </div>
  );
};

export default Main;
