import { keyframes } from 'styled-components';

export const SwingAnimation = keyframes`
  0% {
    transform: rotate(-10deg);
  }
  50% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(-10deg);
  }
`;
