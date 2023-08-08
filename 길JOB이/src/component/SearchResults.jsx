import styles from "./SearchResults.module.css";
import React, { useState } from "react";

// 24자 초과할 경우 ..으로 표시
function cutText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "..";
  }
  return text;
}

function SearchResults() {
  const [cards, setCards] = useState([]);
  // 아마도.. 데이터 받아와서 cards 배열에 넣고 map으로 card 띄우는 고런 느낌으로 구현하면 될 듯..?

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
  const [search, setSearch] = useState("창업");

  return (
    <div className={styles.SearchResults}>
      <div className={styles.search_text}>
        <h1>
          <span>'{search}'</span> 검색 결과
        </h1>
      </div>
      <div className={styles.card_box}>
        {card.map((a) => (
          <div key={a} className={styles.card}>
            <div className={styles.card_text}>{cutText(a, 24)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchResults;
