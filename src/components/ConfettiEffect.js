import { useEffect } from 'react';
import canvasConfetti from 'canvas-confetti';

const ConfettiEffect = () => {
  useEffect(() => {
    canvasConfetti({
      particleCount: 150,
      spread: 50,
      origin: { x: 0.5, y: 0.7 },
    });
  }, []);
};

export default ConfettiEffect;
