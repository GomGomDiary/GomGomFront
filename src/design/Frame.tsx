import Ad from '../api/Ad';
import styles from './Frame.module.css';
import Headerbar from './Headerbar';

export interface FrameProps {
  children: React.ReactNode;
}

const Frame = ({ children }: FrameProps) => {
  return (
    <>
      <Headerbar />
      <div className={styles.frame}>
        <div className={styles.frameChildren}>{children}</div>
        <Ad unit={'DAN-ZGJjaUD6AoC29nFb'} width={320} height={50} />
      </div>
    </>
  );
};

export default Frame;
