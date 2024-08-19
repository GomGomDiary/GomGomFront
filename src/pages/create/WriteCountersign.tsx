import { useState, useRef, ChangeEvent } from 'react';
import styles from './WriteCountersign.module.css';

import { questionerAtom } from '@/store/create/questioner';
import { questionArrAtom } from '@/store/create/questionArr';
import { challengeAtom } from '@/store/create/challenge';
import { countersignAtom } from '@/store/create/countersign';
import { motion, AnimatePresence } from 'framer-motion';

import { Button, Dialog, Input } from '@/components';
import instance from '@/utils/customAxios';
import { useAtom, useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';

const WriteCountersign = () => {
  const navigate = useNavigate();
  const [countersign, setCountersign] = useAtom(countersignAtom);
  const [isCountersignWritten, setIsCountersignWritten] = useState(false);
  const countersignInputRef = useRef<HTMLInputElement>(null);

  const questioner = useAtomValue(questionerAtom);
  const questionArr = useAtomValue(questionArrAtom);
  const challenge = useAtomValue(challengeAtom);

  const [isRewrite, setIsRewrite] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleWriteCountersign = (e: ChangeEvent<HTMLInputElement>) => {
    setCountersign(e.target.value);
  };

  const handleModalClose = () => {
    setIsCountersignWritten(false);
    setIsRewrite(false);
  };

  const handlePrevious = () => {
    setIsExiting(true);
    setCountersign('');
    setTimeout(() => {
      navigate('/challenge');
    }, 1000);
  };

  const pageVariants = {
    initial: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 0 },
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 1.0,
  };

  const handleSubmitCountersign = async () => {
    if (countersign) {
      setCountersign(countersign);
      const axiosInstance = instance();

      const { status: statusCode } = await axiosInstance.post(
        'diary/question',
        {
          question: questionArr,
          questioner,
          challenge,
          countersign,
        }
      );

      if (statusCode === 201) {
        return;
      }

      const { data: isCreated } = await axiosInstance.get('diary/');

      if (isCreated) {
        setIsRewrite(true);
      }
    } else {
      setIsCountersignWritten(true);
      countersignInputRef.current?.focus();
    }
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial="initial"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
          className={styles.writeCountersignContainer}
        >
          {isCountersignWritten && (
            <Dialog
              message={'암호의 답을 입력해주세요.'}
              updateModal={handleModalClose}
            />
          )}
          <div className={styles.top}>
            <div>🔑</div>
            <div>거의 다 왔다곰!</div>
            <div>우리만의 암호를 아는 사람만 답장할 수 있도록</div>
            <div>암호의 답을 정확하게 입력해주세요.</div>
            <div>(ex. 0718, INFJ 등)</div>
          </div>
          <div className={styles.middle}>
            <div className={styles.countersign}>
              <Input
                value={countersign}
                onChange={e => handleWriteCountersign(e)}
                placeholder="50자 내외로 입력해주세요."
                ref={countersignInputRef}
                maxLength={50}
              />
              <div className={styles.countersignLength}>
                {countersign.length}/50
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <Button
              text={'이전으로'}
              variant="white"
              onClick={handlePrevious}
            />
            <Button
              text={'다음'}
              variant="default"
              onClick={handleSubmitCountersign}
            />
          </div>
          {isRewrite && (
            <Dialog
              message={'이전 다이어리는 저장됐어요.'}
              updateModal={handleModalClose}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WriteCountersign;
