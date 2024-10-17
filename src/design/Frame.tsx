import styled from 'styled-components';

import Ad from '@/utils/Ad';

import Headerbar from './Headerbar';

export interface FrameProps {
  children: React.ReactNode;
}

const Frame = ({ children }: FrameProps) => {
  return (
    <>
      <Headerbar />
      <StyledFrame>
        <FrameChildren>{children}</FrameChildren>
        <Ad unit={'DAN-ZGJjaUD6AoC29nFb'} width={320} height={50} />
      </StyledFrame>
    </>
  );
};

export default Frame;

const StyledFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FrameChildren = styled.div`
  color: black;
  width: 340px;
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
