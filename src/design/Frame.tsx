import styles from './Frame.module.css';
import Headerbar from './Headerbar';

export interface FrameProps {
  children: React.ReactNode;
}

const Frame = ({ children }: FrameProps) => {
  return (
    <>
      <Headerbar />
      <div>
        <div className={styles.frame}>{children}</div>
      </div>
    </>
  );
};

export default Frame;
