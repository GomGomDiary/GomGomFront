import styled from 'styled-components';

export const EmptyList = () => {
  return (
    <EmptyListContainer>
      <Title>아직 아무도 답하지 않았다곰...</Title>
      <Content>텅</Content>
    </EmptyListContainer>
  );
};

const EmptyListContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Title = styled.div`
  font-size: 20px;
`;

const Content = styled.div`
  display: flex;
  font-size: 100px;
  font-weight: bold;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 80px 0px;
`;
