import { ChangeEvent, useEffect, useRef, useState } from 'react';
import styles from './WriteChallenge.module.css';
import { challengeAtom } from '@/store/create/challenge';
import { Button, Dialog, Input } from '@/components';
import { useAtom, useAtomValue } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { questionerAtom } from '@/store/create/questioner';
import { motion, AnimatePresence } from 'framer-motion';

const WriteChallenge = () => {
  const navigate = useNavigate();
  const questioner = useAtomValue(questionerAtom);

  // NOTE: 다이어리 생성 중 이탈 시 메인으로 이동
  useEffect(() => {
    if (questioner.length === 0) {
      navigate('/');
    }
  }, [navigate, questioner.length]);

  const [challenge, setChallenge] = useAtom(challengeAtom);
  const [isChallengeWritten, setIsChallengeWritten] = useState(false);

  const challengeInputRef = useRef<HTMLInputElement>(null);

  const writingChallenge = (e: ChangeEvent<HTMLInputElement>) => {
    setChallenge(e.target.value);
  };

  const submitChallenge = () => {
    if (challenge) {
      setIsExiting(true);
      setTimeout(() => {
        navigate('/countersign');
      }, 1000);
    } else {
      setIsChallengeWritten(true);
      challengeInputRef.current?.focus();
    }
  };

  const handleModalClose = () => {
    setIsChallengeWritten(false);
  };

  const [isExiting, setIsExiting] = useState(false);

  const handlePrevious = () => {
    setIsExiting(true);
    setChallenge('');
    setTimeout(() => {
      navigate('/question-list');
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

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial="initial"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
          className={styles.writeChallengeContainer}
        >
          {isChallengeWritten && (
            <Dialog
              message={'암호를 설정해주세요.'}
              updateModal={handleModalClose}
            />
          )}
          <div className={styles.top}>
            <div>🔒</div>
            <div>모든 질문이 완성됐다곰!</div>
            <div>우리만의 암호를 아는 사람만 답장할 수 있도록</div>
            <div>암호는 정확하고 명확한 것으로 입력해주세요.</div>
            <div>(ex. 내 생일 4자리, 내 MBTI 대문자 등)</div>
          </div>
          <div className={styles.middle}>
            <div className={styles.challenge}>
              <Input
                value={challenge}
                onChange={e => writingChallenge(e)}
                placeholder="50자 내외로 입력해주세요."
                ref={challengeInputRef}
                maxLength={50}
              />
              <div className={styles.challengeLength}>
                {challenge.length}/50
              </div>
            </div>
          </div>
          <div className={styles.bottom}>
            <Button
              text={'이전으로'}
              variant="white"
              onClick={handlePrevious}
            />
            <Button text={'다음'} variant="default" onClick={submitChallenge} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WriteChallenge;
