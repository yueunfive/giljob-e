import styles from "./Onboarding.module.css";
import logo from "../img/Logo_2.png";
import Dropdown from "../component/Dropdown";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Onboarding() {
  let navigate = useNavigate();

  // 로고에 적용할 클릭 이벤트 함수
  const handleOnClick = () => {
    navigate("/");
  };

  const [age, setAge] = useState();

  return (
    <div className={styles.Onboarding}>
      <div className={styles.logo_box} onClick={handleOnClick}>
        <img src={logo} alt="logo" className={styles.logo_img} />
        <h3 className={styles.logo_text}>길JOB이</h3>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.Onboarding_container}>
          <div className={styles.Onboarding_content}>
            <div className={styles.Onboarding_line}>
              <h4>지역</h4>
              <div className={styles.dropdown}>
                <Dropdown />
              </div>
            </div>
            <div className={styles.Onboarding_line}>
              <h4>학력</h4>
              <div className={styles.dropdown}>
                <Dropdown />
              </div>
            </div>
            <div className={styles.Onboarding_line}>
              <h4>구직 상태</h4>
              <div className={styles.dropdown}>
                <Dropdown />
              </div>
            </div>
            <div
              className={`${styles.Onboarding_line} ${styles.age_container}`}
            >
              <h4>연령</h4>
              <div>
                <input
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                  }}
                  placeholder="만"
                />
                <span>세</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.wrapper_bottom}>
          <button className={styles.Onboarding_btn}>선택완료</button>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
