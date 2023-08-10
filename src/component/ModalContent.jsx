import Modal from "react-modal";
import Dropdown from "./Dropdown";
import React, { useState, useEffect } from "react";
import filter from "../img/filter.png";
import cancel from "../img/cancel.png";
import styles from "./ModalContent.module.css";
import { useNavigate } from "react-router-dom";

const ModalContent = ({ openModal, closeModal }) => {
  let navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalOpen = () => {
    setModalIsOpen(true);
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

  const [age, setAge] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(regionOptions[0]);
  const [selectedEducation, setSelectedEducation] = useState(
    educationOptions[0]
  );
  const [selectedJobStatus, setSelectedJobStatus] = useState(
    jobStatusOptions[0]
  );

  // Modal이 열릴 때마다 저장된 사용자 정보를 가져와서 미리 설정
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setSelectedRegion(userInfo.region || regionOptions[0]);
      setSelectedEducation(userInfo.education || educationOptions[0]);
      setSelectedJobStatus(userInfo.jobStatus || jobStatusOptions[0]);
      setAge(userInfo.age);
    }
  }, []);

  //  Onboarding 컴포넌트에서 선택한 정보를 userData 상태로 저장(userData의 초기 값을 localStorage 정보로 교체!)
  const [userData, setUserData] = useState({
    region: selectedRegion,
    education: selectedEducation,
    jobStatus: selectedJobStatus,
    age: age,
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
    <div>
      <button
        className={styles.filterbutton}
        onClick={() => {
          handleModalOpen();
          openModal();
        }}
      >
        <img src={filter} className={styles.filtericon} alt="filtericon"></img>
      </button>
      <Modal
        className={styles.modal}
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div className={styles.modalbody}>
          <div className={styles.header}>
            <div className={styles.headerleft}>
              <img src={filter} className={styles.headericon}></img>
              <span>필터</span>
            </div>
            <div className={styles.headerright}>
              <button
                className={styles.filterx}
                onClick={() => {
                  setModalIsOpen(false);
                  closeModal();
                }}
              >
                <img src={cancel} alt="cancel"></img>
              </button>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.Onboarding_content}>
              <div className={styles.Onboarding_line}>
                <h4>지역</h4>
                <Dropdown
                  options={regionOptions}
                  defaultOption="지역을 선택해주세요"
                  initialSelected={selectedRegion}
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
                <h4>학력</h4>
                <Dropdown
                  options={educationOptions}
                  defaultOption="학력을 선택해주세요"
                  initialSelected={selectedEducation}
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
                <h4>구직 상태</h4>
                <Dropdown
                  options={jobStatusOptions}
                  defaultOption="구직 상태를 선택해주세요"
                  initialSelected={selectedJobStatus}
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
                <h4>연령</h4>
                <div>
                  <input
                    value={age}
                    onChange={(e) => {
                      const value = e.target.value; // 입력 값
                      if (/^\d*$/.test(value)) {
                        // 정규식으로 숫자인지 검사
                        setAge(value);
                      }
                    }}
                    placeholder="만"
                  />
                  <span>세</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.wrapper_bottom}>
            {/* 어차피 필터는 온보딩 등록된 후 -> 나이를 지우는 경우만 생각해서 비활성화 기능 만들었음 */}
            <button
              className={`${styles.Onboarding_btn} ${
                !age ? styles.disabled : ""
              }`}
              disabled={!age}
              onClick={() => {
                setModalIsOpen(false);
                closeModal();
                goToHome();
              }}
            >
              선택완료
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalContent;
