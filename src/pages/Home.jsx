import logo from "../img/logo.png";
import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import ModalContent from "../component/ModalContent";
import AutoComplete from "../component/AutoComplete";
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 주요 콘텐츠 엘리먼트를 정의
    Modal.setAppElement("#root");
  }, []);

  const [searchZIndex, setSearchZIndex] = useState(1); // 모달창을 열고 닫을때 검색창의 z-index를 조절(안하면 모달창 열어도 검색창 뜸)
  // 응답 데이터를 변수에 담아 쓰려면 fetchPolicies 함수 밖으로 꺼내야 된다
  const [policyData, setPolicyData] = useState({ content: [] }); //  API 응답 데이터를 관리하는 상태 추가

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

  // 한국어로 저장된 localStorage의 값을 가져와서 영어로 변환하여 Swagger의 파라미터와 일치시켜야 함
  // 변환 매핑 생성
  const translationMap = {
    전체: "ALL",
    부산: "BUSAN",
    충북: "CHUNGBUK",
    충남: "DAEGU",
    대구: "DAEJEON",
    강원: "GANGWON",
    광주: "GWANGJU",
    경북: "GYONGBUK",
    경남: "GYEONGNAM",
    경기: "GYOUNGGI",
    인천: "INCHEON",
    제주: "JEJU",
    전북: "JEONBUK",
    전남: "JEONNAM",
    세종: "SEJONG",
    울산: "ULSAN",
    서울: "SEOUL",
    "고등학교 졸업 미만": "UNDER_HIGH_SCHOOL",
    "고등학교 졸업": "HIGH_SCHOOL_GRADUATE",
    "대학교 재학": "COLLEGE_STUDENT",
    "대학교 졸업": "COLLEGE_GRADUATE",
    "석사/박사": "DOCTORATE",
    무관: "ALL",
    "취업 준비생": "JOB_SEEKER",
    "(예비)창업자": "ENTREPRENEUR",
    재직자: "EMPLOYEE",
    자영업자: "SELF_EMPLOYED",
    프리랜서: "FREELANCER",
    "단기 근로자": "TEMPORARY_WORKER",
  };

  // 로컬 스토리지에서 사용자 정보를 가져옴
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 초기에 로컬 스토리지에서 사용자 정보를 가져오면서 translate를 시켜줘야 됨
  const [translatedData, setTranslatedData] = useState({
    region: translationMap[userInfo.region],
    education: translationMap[userInfo.education],
    jobStatus: translationMap[userInfo.jobStatus],
    age: parseInt(userInfo.age),
  });

  // 모달을 열고 닫을 때 로컬 스토리지에서 가져온 값을 translatedData로 설정
  useEffect(() => {
    console.log(userInfo);
    if (userInfo) {
      const translatedRegion = translationMap[userInfo.region];
      const translatedEducation = translationMap[userInfo.education];
      const translatedJobStatus = translationMap[userInfo.jobStatus];
      const userAge = parseInt(userInfo.age);

      setTranslatedData({
        region: translatedRegion,
        education: translatedEducation,
        jobStatus: translatedJobStatus,
        age: userAge,
      });
    }
  }, [searchZIndex]);

  // 맞춤 추천을 위한 API 요청 URL 생성
  const constructApiUrl = () => {
    return `http://52.79.114.100/api/policies?age=${translatedData.age}&education=${translatedData.education}&jobStatus=${translatedData.jobStatus}&pageNumber=0&pageSize=4&residence=${translatedData.region}`;
  };

  // API 호출 함수 정의
  const fetchPolicies = async () => {
    try {
      const response = await axios.get(constructApiUrl()); // API 요청
      console.log("Translated Data:", translatedData); // 콘솔창에 띄어 보니까 데이터는 잘 들어갔고 요청 URL도 맞는데 왜ㅜ
      console.log(constructApiUrl());
      setPolicyData(response.data); // policyData 업데이트
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  // translatedData가 변경될 때에만 API를 호출
  useEffect(() => {
    if (translatedData.region) {
      fetchPolicies(); // API 호출
    }
  }, [translatedData]);

  return (
    <div className={styles.Home}>
      <div className={styles.logo} onClick={goToHome}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.search} style={{ zIndex: searchZIndex }}>
        <AutoComplete />
      </div>
      <div className={styles.recommend}>
        <div className={styles.recotitle}>
          <span>맞춤 일자리 정책 추천</span>
          <ModalContent openModal={openModal} closeModal={closeModal} />
        </div>
        {/* 배열 매핑으로 맞춤 추천 최종 구현!*/}
        <div className={styles.card_box}>
          {policyData.content.map((policy, index) => (
            <div className={styles.card} onClick={goToDetailPage} key={index}>
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
