import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../img/logo.png";
import styles from "./DetailPage.module.css";
import Footer from "../component/Footer";

const DetailPage = () => {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/Home");
  };

  return (
    <div>
      <div className={styles.logo} onClick={goToHome}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.header}>
        <span className={styles.title}>제목</span>
        <span className={styles.intro}>내용</span>
      </div>
      <div className={styles.content}>
        <div className={styles.detail}>
          <span className={styles.detailtitle}>정책 상세 설명</span>
          <span className={styles.detailcontent}>내용</span>
        </div>
        <div className={styles.detail}>
          <span className={styles.detailtitle}>신청자격</span>
          <span className={styles.detailcontent}>내용</span>
        </div>
        <button>신청하기</button>
      </div>
      <Footer />
    </div>
  );
};

export default DetailPage;
