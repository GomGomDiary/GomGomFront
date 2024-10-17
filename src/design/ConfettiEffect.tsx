import canvasConfetti from 'canvas-confetti';
import { useEffect } from 'react';

const ConfettiEffect = () => {
  useEffect(() => {
    canvasConfetti({
      particleCount: 150,
      spread: 50,
      origin: { x: 0.5, y: 0.7 },
    });
  }, []);
  return <div></div>;
};

export default ConfettiEffect;
