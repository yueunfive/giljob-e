import Modal from "react-modal";
import Dropdown from "./Dropdown";
import React, { useState, useEffect, useRef } from "react";
import filter from "../img/filter.png";
import cancel from "../img/cancel.png";
import styles from "./ModalContent.module.css";
import { useNavigate } from "react-router-dom";

const ModalContent = ({ openModal, closeModal, getData }) => {
  let navigate = useNavigate();

  // input을 감싸는 div를 클릭했을 때 input으로 포커스 이동하게 하는 기능
  const inputRef = useRef(null); // 입력란에 대한 ref 생성
  const handleDivClick = () => {
    inputRef.current.focus(); // 입력란에 포커스 이동
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalOpen = () => {
    setModalIsOpen(true);
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
  const [selectedRegion, setSelectedRegion] = useState(regionOptions[0]);
  const [selectedEducation, setSelectedEducation] = useState(
    educationOptions[0]
  );
  const [selectedJobStatus, setSelectedJobStatus] = useState(
    jobStatusOptions[0]
  );

  // 로컬 스토리지에서 사용자 정보를 가져옴
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    if (userInfo) {
      // Modal이 열릴 때마다 저장된 사용자 정보를 가져와서 미리 설정
      setSelectedRegion(userInfo.region || regionOptions[0]);
      setSelectedEducation(userInfo.education || educationOptions[0]);
      setSelectedJobStatus(userInfo.jobStatus || jobStatusOptions[0]);
      setAge(userInfo.age);
    }
  }, []);

  //  Onboarding 컴포넌트에서 선택한 정보를 userData 상태로 저장(userData의 초기 값을 localStorage 정보로 교체!)
  const [userData, setUserData] = useState({
    region: userInfo.region,
    education: userInfo.education,
    jobStatus: userInfo.jobStatus,
    age: age,
  });

  // 버튼 클릭 : localStorage에 사용자 정보 저장 후 '홈' 페이지로 이동
  const goToHome = async () => {
    // age 값을 userData에 저장
    const updatedUserData = {
      ...userData,
      age: age,
    };

    // userData를 업데이트한 후 localStorage에 저장
    localStorage.setItem("userInfo", JSON.stringify(updatedUserData));

    try {
      getData();
      navigate("/Home"); //통신 성공하면 Home으로 이동
    } catch (err) {
      console.log(err);
    }
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
                <span className={styles.bold}>지역</span>
                <Dropdown
                  options={regionOptions}
                  className={styles.Onboarding_dropdown}
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
                <span className={styles.bold}>학력</span>
                <Dropdown
                  options={educationOptions}
                  className={styles.Onboarding_dropdown}
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
                <span className={styles.bold}>구직 상태</span>
                <Dropdown
                  options={jobStatusOptions}
                  className={styles.Onboarding_dropdown}
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
              선택 완료
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalContent;
