import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom, useAtomValue } from 'jotai';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button, Input, Modal } from '@/components';
import { pageTransition, pageVariants } from '@/design';
import { TitleSection } from '@/design/TitleSection';
import {
  challengeAtom,
  countersignAtom,
  questionArrAtom,
  questionerAtom,
} from '@/store/create';
import instance from '@/utils/customAxios';

const WriteCountersign = () => {
  const navigate = useNavigate();
  const [countersign, setCountersign] = useAtom(countersignAtom);
  const [isCountersignWritten, setIsCountersignWritten] = useState(false);

  const questioner = useAtomValue(questionerAtom);

  // NOTE: 다이어리 생성 중 이탈 시 메인으로 이동
  useEffect(() => {
    if (questioner.length === 0) {
      navigate('/');
    }
  }, [navigate, questioner.length]);

  const questionArr = useAtomValue(questionArrAtom);
  const challenge = useAtomValue(challengeAtom);

  const [isRewrite, setIsRewrite] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const queryClient = useQueryClient();
  const axiosInstance = instance();

  const createDiaryMutation = useMutation({
    mutationFn: () => {
      return axiosInstance.post('diary/question', {
        question: questionArr,
        questioner,
        challenge,
        countersign,
      });
    },
    onSuccess: data => {
      if (data.status === 201) {
        queryClient.invalidateQueries({ queryKey: ['isDiaryCreated'] });
        navigate('/finish');
      }
    },
    onError: () => {
      console.error('Error creating diary');
    },
  });

  const isDiaryCreatedQuery = useQuery({
    queryKey: ['isDiaryCreated'],
    queryFn: async () => {
      const { data } = await axiosInstance.get('diary/');
      return data;
    },
    enabled: false,
  });

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

  const handleSubmitCountersign = async () => {
    if (countersign) {
      setCountersign(countersign);
      createDiaryMutation.mutate();

      const { data: isDiaryCreated } = await isDiaryCreatedQuery.refetch();
      if (isDiaryCreated) {
        setIsRewrite(true);
      }
    } else {
      setIsCountersignWritten(true);
    }
  };

  return (
    <AnimatePresence>
      {!isExiting && (
        <WriteCountersignContainer
          initial="initial"
          exit="exit"
          variants={pageVariants}
          transition={pageTransition}
          key="WriteCountersign"
        >
          {isCountersignWritten && (
            <Modal
              message={'암호의 답을 입력해주세요.'}
              updateModal={handleModalClose}
            />
          )}
          <TitleSection
            emoji="🔑"
            subtitle="거의 다 왔다곰!"
            description={
              <>
                우리만의 암호를 아는 사람만 답장할 수 있도록
                <br />
                암호의 답을 정확하게 입력해주세요.
                <br />
                (ex. 0718, INFJ 등)
              </>
            }
          />
          <CountersignContent>
            <Countersign>
              <Input
                value={countersign}
                onChange={e => handleWriteCountersign(e)}
                placeholder="50자 내외로 입력해주세요."
                maxLength={50}
              />
              <CountersignLength>{countersign.length}/50</CountersignLength>
            </Countersign>
          </CountersignContent>
          <Buttons>
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
          </Buttons>
          {isRewrite && (
            <Modal
              message={'이전 다이어리는 저장됐어요.'}
              updateModal={handleModalClose}
            />
          )}
        </WriteCountersignContainer>
      )}
    </AnimatePresence>
  );
};

export default WriteCountersign;

const WriteCountersignContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const CountersignContent = styled.div`
  display: flex;
  justify-content: center;
`;

const Countersign = styled.div`
  width: 80%;
  text-align: center;
`;

const CountersignLength = styled.div`
  font-size: 12px;
  padding-top: 10px;
  text-align: right;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0 auto;
`;
