import styles from "./Onboarding.module.css";
import logo from "../img/logo.png";
import Dropdown from "../component/Dropdown";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Onboarding() {
  let navigate = useNavigate();

  // input을 감싸는 div를 클릭했을 때 input으로 포커스 이동하게 하는 기능
  const inputRef = useRef(null); // 입력란에 대한 ref 생성
  const handleDivClick = () => {
    inputRef.current.focus(); // 입력란에 포커스 이동
  };

  // 로고에 적용할 클릭 이벤트 함수
  const goToWelcome = () => {
    navigate("/");
  };

  const regionOptions = [
    "전체",
    "서울",
    "경기",
    "부산",
    "대구",
    "인천",
    "광주",
    "대전",
    "울산",
    "강원",
    "충북",
    "충남",
    "전북",
    "전남",
    "경북",
    "경남",
    "세종",
    "제주",
  ];
  const educationOptions = [
    "고등학교 졸업 미만",
    "고등학교 졸업",
    "대학교 재학",
    "대학교 졸업",
    "석사/박사",
    "무관",
  ];
  const jobStatusOptions = [
    "전체",
    "취업 준비생",
    "(예비)창업자",
    "재직자",
    "자영업자",
    "프리랜서",
    "단기 근로자",
  ];

  const [age, setAge] = useState(null);

  // region, education, jobStatus 드롭다운 컴포넌트에서 선택된 옵션을 상태로 관리
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedJobStatus, setSelectedJobStatus] = useState(null);

  // "선택완료" 버튼이 활성화되는지 여부를 결정하는 변수
  const isButtonDisabled =
    !selectedRegion || !selectedEducation || !selectedJobStatus || !age;

  //  Onboarding 컴포넌트에서 선택한 정보를 userData 상태로 저장
  const [userData, setUserData] = useState({
    region: "",
    education: "",
    jobStatus: "",
    age: null,
  });

  // 버튼 클릭 : localStorage에 사용자 정보 저장 후 '홈' 페이지로 이동
  const goToHome = () => {
    // age 값을 userData에 저장
    const updatedUserData = {
      ...userData,
      age: age,
    };

    // userData를 업데이트한 후 localStorage에 저장
    localStorage.setItem("userInfo", JSON.stringify(updatedUserData));

    // navigate 이동
    navigate("/Home");
  };

  return (
    <div className={styles.Onboarding}>
      <div className={styles.logo} onClick={goToWelcome}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.wrapper}>
        <div className={styles.Onboarding_container}>
          <div className={styles.Onboarding_content}>
            <div className={styles.Onboarding_line}>
              <span className={styles.bold}>지역</span>
              <Dropdown
                options={regionOptions}
                className={styles.Onboarding_dropdown}
                defaultOption="지역을 선택해주세요"
                onSelect={(option) => {
                  setSelectedRegion(option);
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    region: option,
                  }));
                }} // 옵션 선택 시 선택한 옵션을 상태로 업데이트
              />
            </div>
            <div className={styles.Onboarding_line}>
              <span className={styles.bold}>학력</span>
              <Dropdown
                options={educationOptions}
                className={styles.Onboarding_dropdown}
                defaultOption="학력을 선택해주세요"
                onSelect={(option) => {
                  setSelectedEducation(option);
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    education: option,
                  }));
                }}
              />
            </div>
            <div className={styles.Onboarding_line}>
              <span className={styles.bold}>구직 상태</span>
              <Dropdown
                options={jobStatusOptions}
                className={styles.Onboarding_dropdown}
                defaultOption="구직 상태를 선택해주세요"
                onSelect={(option) => {
                  setSelectedJobStatus(option);
                  setUserData((prevUserData) => ({
                    ...prevUserData,
                    jobStatus: option,
                  }));
                }}
              />
            </div>
            <div
              className={`${styles.Onboarding_line} ${styles.age_container}`}
            >
              <span className={styles.bold}>연령</span>
              <div className={styles.age_text} onClick={handleDivClick}>
                <span>만</span>
                <input
                  ref={inputRef}
                  value={age === null ? "" : age} // null일 경우 빈 문자열로 표시
                  onChange={(e) => {
                    const value = e.target.value; // 입력 값
                    if (/^\d*$/.test(value)) {
                      // 정규식으로 숫자인지 검사
                      setAge(value);
                    }
                  }}
                />
              </div>
              <span className={styles.agefinish}>세</span>
            </div>
          </div>
        </div>
        <div className={styles.wrapper_bottom}>
          <button
            className={`${styles.Onboarding_btn} ${
              isButtonDisabled ? styles.disabled : ""
            }`}
            disabled={isButtonDisabled}
            onClick={() => {
              goToHome();
            }}
          >
            선택 완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;
