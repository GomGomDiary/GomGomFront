import styles from './Button.module.css';

export interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'default' | 'white';
}

export const Button = ({ text, onClick, variant }: ButtonProps) => {
  let className = variant === 'default' ? styles.button : styles.whiteButton;

  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
};
