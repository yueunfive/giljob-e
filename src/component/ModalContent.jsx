import Modal from "react-modal";
import Dropdown from "./Dropdown";
import axios from "axios";
import React, { useState, useEffect } from "react";
import filter from "../img/filter.png";
import cancel from "../img/cancel.png";
import styles from "./ModalContent.module.css";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../component/UserDataContext";

const ModalContent = ({ openModal, closeModal }) => {
  const { userData, setUserData } = useUserData();
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleModalOpen = () => {
    // 모달 열릴 때 로컬 스토리지에서 값을 가져와서 모달 내의 상태를 초기화
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setSelectedResidence(userInfo.residence || residenceOptions[0]);
      setSelectedEducation(userInfo.education || educationOptions[0]);
      setSelectedJobStatus(userInfo.jobStatus || jobStatusOptions[0]);
      setAge(userInfo.age);
    }

    // 모달 열기
    setModalIsOpen(true);
  };

  const residenceOptions = [
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
  const [selectedResidence, setSelectedResidence] = useState(
    residenceOptions[0]
  );
  const [selectedEducation, setSelectedEducation] = useState(
    educationOptions[0]
  );
  const [selectedJobStatus, setSelectedJobStatus] = useState(
    jobStatusOptions[0]
  );

  // "선택 완료" 버튼 클릭 시 호출되는 함수
  const handleFilterSubmit = async () => {
    try {
      // 필터링 정보
      const filters = {
        residence: selectedResidence,
        education: selectedEducation,
        jobStatus: selectedJobStatus,
        age: age,
      };

      // API 요청을 위한 URL과 쿼리스트링 생성
      const apiUrl = `http://52.79.114.100/api/policies?residence=${filters.residence}&education=${filters.education}&jobStatus=${filters.jobStatus}&age=${filters.age}`;

      // API 요청
      const response = await axios.get(apiUrl);

      // API에서 받아온 데이터 중에서 이름(name) 정보 추출
      const newOptions = response.data.content.map((item) => item.name);

      // 추천 정책 리스트 업데이트
      setOptions(newOptions);

      // 모달 닫기
      closeModal();

      navigate("/Home");
    } catch (error) {
      console.error("Error fetching data from API:", error);
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
                  options={residenceOptions}
                  className={styles.Onboarding_dropdown}
                  defaultOption="지역을 선택해주세요"
                  onSelect={(option) => {
                    setSelectedResidence(option);
                    setUserData((prevUserData) => ({
                      ...prevUserData,
                      residence: option,
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
                <div className={styles.age_text}>
                  <span>만</span>
                  <input
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
                // "선택 완료" 버튼 클릭 시 필터링 정보를 사용하여 API 요청
                handleFilterSubmit();
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
