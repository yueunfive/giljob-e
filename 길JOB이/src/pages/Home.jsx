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

  const [clickInputValue, setClickInputValue] = useState(""); // 이건 사실 검색결과 창을 위한 state..

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
      <div className={styles.logo_box} onClick={goToHome}>
        <img src={logo} alt="logo" className={styles.logo_img} />
        <h3 className={styles.logo_text}>길JOB이</h3>
      </div>
      <div className={styles.search}>
        <AutoComplete
          options={options}
          setClickInputValue={setClickInputValue}
        ></AutoComplete>
      </div>
      <div className={styles.recommend}>
        <div className={styles.recotitle}>
          <span>맞춤 일자리 정책 추천</span>
          <ModalContent />
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
