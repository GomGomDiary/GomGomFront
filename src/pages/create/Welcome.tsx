import Button from '../../Components/Button';
import Input from '../../Components/Input';
import styles from './Welcome.module.css';

const Welcome = () => {
  return (
    <div className={styles.Welcome}>
      <div className={styles.title}>
        <div>🐻💭</div>
        <p>상대에 대해 곰곰이 생각하고</p>
        <p>답하는 곰곰 다이어리</p>
      </div>
      <section className={styles.section}>
        <div>반갑다곰!</div>
        <p>질문을 만들고 특별한 암호를 설정한 뒤</p>
        <p>소중한 친구, 가족, 연인과 공유해서</p>
        <p>많은 답변과 추억을 쌓아보라곰!</p>
      </section>
      <div className={styles.nameInput}>
        <Input placeholder="10자 이내로 이름을 입력하세요." maxLength={10} />
        <Button
          text={'시작'}
          variant="default"
          onClick={() => console.log('진행중')}
        />
      </div>
    </div>
  );
};

export default Welcome;
