import Modal from "react-modal";
import Dropdown from "./Dropdown";
import React, { useState, useRef } from "react";
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
            {/* 어차피 필터는 온보딩 등록된 후 -> 나이를 지우는 경우만 생각해서 비활성화 기능 만들었음 */}
            <button
              className={`${styles.Onboarding_btn} ${
                !age ? styles.disabled : ""
              }`}
              disabled={!age}
              onClick={() => {
                setModalIsOpen(false);
                closeModal();
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
