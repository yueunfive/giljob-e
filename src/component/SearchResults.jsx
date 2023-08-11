import logo from "../img/logo.png";
import React, { useState } from "react";
import styles from "./SearchResults.module.css";
import AutoComplete from "../component/AutoComplete";
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";

// 24자 초과할 경우 ..으로 표시
function cutText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "..";
  }
  return text;
}

function SearchResults() {
  const options = ["감자", "Apple", "Banana", "Orange", "Pineapple", "Grapes"];
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/Home");
  };

  const goToDetailPage = () => {
    navigate("/DetailPage");
  };

  // 임시로 배열 & 검색결과로 만들어 봄
  const card = [
    "청년전용창업자금(창업기반지원자금)",
    "청년내일저축계좌",
    "청년 자기개발 도서구입비 지원",
    "예비창업패키지",
    "청년키움식당",
    "(창업성공패키지 지원사업)청년창업사관학교",
    "아유 하기 싫어",
    "이제는 더 이상 물러날 곳이 없다",
    "니가먹고판단해남의말에휘둘리지말고나는니가줏대있게인생살았으면좋겠어남이맛있다고해도니가직접먹어보고판단해",
    "정신차려 이 각박한 세상 속에서",
    "자리로 돌아가줘",
    "자 이게 클릭이야",
  ];

  // 로컬 스토리지에 있던 검색 결과 꺼내오기(문자열로 저장해서 JSON 파싱 안해도 됨)
  const searchText = localStorage.getItem("searchText");

  return (
    <div className={styles.Home}>
      <div className={styles.logo} onClick={goToHome}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.search}>
        <AutoComplete options={options}></AutoComplete>
      </div>
      <div className={styles.SearchResults}>
        <div className={styles.search_text}>
          <h1>
            <span>'{searchText}'</span> 검색 결과
          </h1>
        </div>
        <div className={styles.card_box}>
          {card.map((a) => (
            <div key={a} className={styles.card} onClick={goToDetailPage}>
              <div className={styles.card_text}>{cutText(a, 24)}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default SearchResults;
