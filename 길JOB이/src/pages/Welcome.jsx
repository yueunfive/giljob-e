import styles from "./Welcome.module.css";
import logo from "../img/logo.png";
import { useNavigate } from "react-router-dom";

function Welcome() {
  let navigate = useNavigate();

  // 버튼에 적용할 클릭 이벤트 함수
  const handleOnClick = () => {
    navigate("/Onboarding");
  };

  return (
    <div className={styles.Welcome}>
      <div className={styles.wrapper}>
        <div className={styles.wrapper_top}>
          <img src={logo} alt="logo" className={styles.logo} />
          <h3 className={styles.title}>길JOB이</h3>
          <p className={styles.intro}>
            내게 필요한 청년 일자리 정책을 한 눈에!
          </p>
        </div>
        <div className={styles.wrapper_bottom}>
          <button className={styles.start_btn} onClick={handleOnClick}>
            시작하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
