import React, { useState } from 'react';
import Styles from './Main.module.css';

import Welcome from '../Pages/Welcome';
import QuestionNumber from '../Pages/QuestionNumber';
import { QuestionList } from '../Pages/QuestionList';

const Main = () => {
  const [step1, setStep1] = useState(true);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);

  return (
    <div className={Styles.Main}>
      <div className={Styles.center}>
        <div className={Styles.pin}>📌</div>
        <section className={Styles.content}>
          {step1 ? <Welcome setStep1={setStep1} setStep2={setStep2} /> : null}
          {step2 ? (
            <QuestionNumber setStep2={setStep2} setStep3={setStep3} />
          ) : null}
          {step3 ? <QuestionList /> : null}
        </section>
      </div>
    </div>
  );
};

export default Main;
