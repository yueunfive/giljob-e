import logo from "../img/logo.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import ModalContent from "../component/ModalContent";
import AutoComplete from "../component/AutoComplete";
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [options, setOptions] = useState([]);
  const [rankData, setRankData] = useState([]);

  const navigate = useNavigate();

  const [searchZIndex, setSearchZIndex] = useState(1); // 모달창을 열고 닫을때 검색창의 z-index를 조절(안하면 모달창 열어도 검색창 뜸)

  useEffect(() => {
    // API 요청
    const apiUrl = "http://52.79.114.100/api/policies/rank?pageSize=5";

    axios
      .get(apiUrl)
      .then((response) => {
        // API에서 받아온 데이터 중에서 이름(name) 정보와 bizid를 추출하여 rankData에 설정
        const newRankData = response.data.map((item) => ({
          name: item.name,
          bizId: item.bizId,
        }));
        setRankData(newRankData);
      })
      .catch((error) => {
        console.error("Error fetching rank data:", error);
      });
  }, []); // 빈 배열을 넣어 한 번만 호출되도록 설정

  // 정책 상세 페이지로 이동
  const goToDetailPage = (bizId) => {
    // 해당 정책의 bizid를 사용하여 DetailPage로 이동
    navigate(`/DetailPage/${bizId}`);
  };

  useEffect(() => {
    const apiUrl = "http://52.79.114.100/api/policies?pageSize=10";
    const params = {
      age: null,
      education: null,
      jobStatus: null,
      keyword: null,
      pageNumber: null,
      pageSize: null,
      residence: null,
    };

    axios
      .get(apiUrl, { params })
      .then((response) => {
        const newOptions = response.data.content.map((item) => item.name);
        setOptions(newOptions);
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []);

  const handleCardClick = (bizId) => {
    goToDetailPage(bizId);
  };

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
          {rankData.map((policy, index) => (
            <div
              key={index}
              className={styles.card}
              onClick={() => handleCardClick(policy.bizId)}
            >
              <div className={styles.card_text}>{cutText(policy.name, 24)}</div>
            </div>
          ))}
        </div>
      </div>
      <div className={styles.rank}>
        <div className={styles.ranktitle}>
          <span>실시간 청년 일자리 정책 순위</span>
        </div>
        <div className={styles.ranklist}>
          <ul>
            {/* rankData를 이용하여 정책 순위 리스트 생성 */}
            {rankData.map((policy, index) => (
              <li key={index}>
                <span className={styles.ranknum}>{index + 1}</span>
                {/* 정책 이름 버튼을 클릭할 때 해당 정책의 bizid를 전달 */}
                <button
                  className={styles.jobtitle}
                  onClick={() => goToDetailPage(policy.bizId)}
                >
                  {policy.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
