import { ReactNode } from 'react';
import styled from 'styled-components';

import { SwingAnimation } from './swingAnimation';

interface TitleSectionProps {
  emoji: string;
  subtitle: string;
  description: ReactNode;
}

export const TitleSection = ({
  emoji,
  subtitle,
  description,
}: TitleSectionProps) => {
  return (
    <Title>
      <Emoji>{emoji}</Emoji>
      <Subtitle>{subtitle}</Subtitle>
      <Description>{description}</Description>
    </Title>
  );
};

const Title = styled.div`
  text-align: center;
  line-height: 1.6;
`;

const Emoji = styled.div`
  font-size: 40px;
  animation: ${SwingAnimation} 0.8s infinite;
`;

const Subtitle = styled.div`
  font-size: 25px;
  color: var(--point-color);
`;

const Description = styled.div``;
