import React, { useState } from 'react';
import Styles from './Main.module.css';
import Welcome from '../Pages/Welcome';
import QuestionNumber from '../Pages/QuestionNumber';
import QuestionList from '../Pages/QuestionList';
import WriteChallenge from '../Pages/WriteChallenge';
import WriteCounterSign from '../Pages/WriteCounterSign';
import Finish from '../Pages/Finish';

const Main = () => {
  const [step, setStep] = useState(1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Welcome onNextStep={() => setStep(2)} />;
      case 2:
        return <QuestionNumber onNextStep={() => setStep(3)} />;
      case 3:
        return <QuestionList onNextStep={() => setStep(4)} />;
      case 4:
        return <WriteChallenge onNextStep={() => setStep(5)} />;
      case 5:
        return <WriteCounterSign onNextStep={() => setStep(6)} />;
      case 6:
        return <Finish onNextStep={() => setStep(7)} />;
      default:
        return null;
    }
  };

  return (
    <div className={Styles.Main}>
      <div className={Styles.center}>
        <div className={Styles.pin}>📌</div>
        <section className={Styles.content}>{renderStep()}</section>
      </div>
    </div>
  );
};

export default Main;
