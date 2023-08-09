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

  const regionOptions = [
    "전체",
    "서울",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "경기",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "제주",
    "세종",
  ];
  const educationOptions = [
    "고졸 미만",
    "고교 재학",
    "고졸 예정",
    "고교 졸업",
    "대학 재학",
    "대졸 예정",
    "대학 졸업",
    "석∙박사",
    "제한없음",
  ];
  const jobStatusOptions = [
    "재직자",
    "자영업자",
    "미취업자",
    "프리랜서",
    "일용근로자",
    "(예비)창업자",
    "단기근로자",
    "영농종사자",
    "제한없음",
  ];

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
              <Dropdown
                options={regionOptions}
                defaultOption="지역을 선택해주세요"
              />
            </div>
            <div className={styles.Onboarding_line}>
              <h4>학력</h4>
              <Dropdown
                options={educationOptions}
                defaultOption="학력을 선택해주세요"
              />
            </div>
            <div className={styles.Onboarding_line}>
              <h4>구직 상태</h4>
              <Dropdown
                options={jobStatusOptions}
                defaultOption="구직 상태를 선택해주세요"
              />
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
