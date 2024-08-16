import { useRef, useEffect } from 'react';

export interface AdProps {
  unit: string;
  width: number;
  height: number;
}

interface Window {
  adfit?: {
    destroy: (unit: string) => void;
  };
}

const Ad = ({ unit, width, height }: AdProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.daumcdn.net/kas/static/ba.min.js';
    containerRef.current?.appendChild(script);

    return () => {
      const globalAdfit = (window as Window).adfit;
      if (globalAdfit) globalAdfit.destroy(unit);
    };
  }, [unit]);

  return (
    <div ref={containerRef}>
      <ins
        className="kakao_ad_area"
        style={{ display: 'none' }}
        data-ad-unit={unit}
        data-ad-width={width}
        data-ad-height={height}
      ></ins>
    </div>
  );
};

export default Ad;
