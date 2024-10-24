import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Button } from '@/components';

export const NotFound = () => {
  const navigate = useNavigate();

  const handleGoToMain = () => {
    navigate('/');
  };

  return (
    <NotFoundContainer>
      <NotFoundContent>
        <Title>
          <Emoji>🙅🏻</Emoji>
          <Subtitle>잘못된 경로</Subtitle>
        </Title>
        <Description>메인으로 이동해주세요.</Description>
        <Button
          onClick={handleGoToMain}
          text={'메인으로 가기'}
          variant="default"
        />
      </NotFoundContent>
    </NotFoundContainer>
  );
};

const NotFoundContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`;

const NotFoundContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
`;

const Subtitle = styled.div`
  font-size: 25px;
`;

const Description = styled.div``;

const Emoji = styled.div`
  font-size: 40px;
`;
