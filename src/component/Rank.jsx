import React, { useState, useEffect } from "react";
import styles from "./Rank.module.css";
import axios from "axios";

const Rank = ({ goToDetailPage }) => {
  const [rankData, setRankData] = useState({ content: [] });

  // API 호출 함수 정의 (실시간 순위 조회)
  const fetchRank = async () => {
    try {
      const response = await axios.get(
        "http://52.79.114.100/api/policies/rank?pageSize=5"
      ); // API 요청

      setRankData(response.data); // rankData 업데이트
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  // 실시간으로 API를 호출
  useEffect(() => {
    fetchRank();
  }, []);

  return (
    <div className={styles.rank}>
      <div className={styles.ranktitle}>
        <span>실시간 청년 일자리 정책 순위</span>
      </div>
      <div className={styles.ranklist}>
        <ul>
          {/* 배열 매핑으로 맞춤 추천 최종 구현!*/}
          {rankData.content &&
            ㅋrankData.content.map((rank, index) => (
              <li onClick={goToDetailPage} key={index}>
                <span className={styles.ranknum}>{index + 1}</span>
                <button className={styles.jobtitle}>{rank.name}</button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Rank;
