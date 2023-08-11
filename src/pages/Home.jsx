import logo from "../img/logo.png";
import React, { useState } from "react";
import styles from "./Home.module.css";
import ModalContent from "../component/ModalContent";
import AutoComplete from "../component/AutoComplete";
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const options = ["감자", "Apple", "Banana", "Orange", "Pineapple", "Grapes"];
  const navigate = useNavigate();

  const [searchZIndex, setSearchZIndex] = useState(1); // 모달창을 열고 닫을때 검색창의 z-index를 조절(안하면 모달창 열어도 검색창 뜸)

  // 모달 열릴 때 z-index 값을 변경
  const openModal = () => {
    setSearchZIndex(0);
  };

  // 모달 닫힐 때 z-index 값을 원래대로 변경
  const closeModal = () => {
    setSearchZIndex(1);
  };

  const goToHome = () => {
    navigate("/Home");
  };

  const goToDetailPage = () => {
    navigate("/DetailPage");
  };

  // 24자 초과할 경우 ..으로 표시
  function cutText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "..";
    }
    return text;
  }

  return (
    <div className={styles.Home}>
      <div className={styles.logo} onClick={goToHome}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.search} style={{ zIndex: searchZIndex }}>
        <AutoComplete options={options}></AutoComplete>
      </div>
      <div className={styles.recommend}>
        <div className={styles.recotitle}>
          <span>맞춤 일자리 정책 추천</span>
          <ModalContent openModal={openModal} closeModal={closeModal} />
        </div>
        <div className={styles.card_box}>
          <div className={styles.card} onClick={goToDetailPage}>
            <div className={styles.card_text}>
              {cutText("청년전용창업자금(창업기반지원자금)", 24)}
            </div>
          </div>
          <div className={styles.card} onClick={goToDetailPage}>
            <div className={styles.card_text}>
              {cutText("청년전용창업자금(창업기반지원자금)", 24)}
            </div>
          </div>
          <div className={styles.card} onClick={goToDetailPage}>
            <div className={styles.card_text}>
              {cutText("청년전용창업자금(창업기반지원자금)", 24)}
            </div>
          </div>
          <div className={styles.card} onClick={goToDetailPage}>
            <div className={styles.card_text}>
              {cutText("청년전용창업자금(창업기반지원자금)", 24)}
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rank}>
        <div className={styles.ranktitle}>
          <span>실시간 청년 일자리 정책 순위</span>
        </div>
        <div className={styles.ranklist}>
          <ul>
            <li onClick={goToDetailPage}>
              <span className={styles.ranknum}>1</span>
              <button className={styles.jobtitle}>정책 이름</button>
            </li>
            <li onClick={goToDetailPage}>
              <span className={styles.ranknum}>2</span>
              <button className={styles.jobtitle}>정책 이름</button>
            </li>
            <li onClick={goToDetailPage}>
              <span className={styles.ranknum}>3</span>
              <button className={styles.jobtitle}>정책 이름</button>
            </li>
            <li onClick={goToDetailPage}>
              <span className={styles.ranknum}>4</span>
              <button className={styles.jobtitle}>정책 이름</button>
            </li>
            <li onClick={goToDetailPage}>
              <span className={styles.ranknum}>5</span>
              <button className={styles.jobtitle}>정책 이름</button>
            </li>
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
