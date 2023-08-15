import logo from "../img/logo.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";
import ModalContent from "../component/ModalContent";
import AutoComplete from "../component/AutoComplete";
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

const Home = () => {
  const [options, setOptions] = useState([]);
  const [rankData, setRankData] = useState([]);
  const [policyData, setPolicyData] = useState({ content: [] }); //  API 응답 데이터를 관리하는 상태 추가

  useEffect(() => {
    // 컴포넌트가 마운트되었을 때 주요 콘텐츠 엘리먼트를 정의
    Modal.setAppElement("#root");
  }, []);

  const navigate = useNavigate();

  const [searchZIndex, setSearchZIndex] = useState(1); // 모달창을 열고 닫을때 검색창의 z-index를 조절(안하면 모달창 열어도 검색창 뜸)

  useEffect(() => {
    // API 요청
    const apiUrl = "http://54.180.36.240/api/policies/rank?pageSize=5";

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

  useEffect(() => {
    const apiUrl = "http://54.180.36.240/api/policies?pageSize=10";
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

  // 정책 상세 페이지로 이동
  const goToDetailPage = (bizId) => {
    // 해당 정책의 bizid를 사용하여 DetailPage로 이동
    navigate(`/DetailPage/${bizId}`);
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

  // 맞춤 추천을 위한 API 요청 URL 생성
  const constructApiUrl = (tmpData) => {
    return `http://54.180.36.240/api/policies?age=${tmpData.age}&education=${tmpData.education}&jobStatus=${tmpData.jobStatus}&pageNumber=0&pageSize=4&residence=${tmpData.region}`;
  };

  // API 호출 함수 정의
  const fetchPolicies = (tmpData) => {
    axios
      .get(constructApiUrl(tmpData))
      .then((res) => {
        console.log(res);
        setPolicyData(res.data);
      })
      .catch((err) => console.log(err));
  };

  // 로컬 스토리지에서 사용자 정보를 가져옴
  const getData = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")); //이건 어차피 알아서 받아와지는거 굳이 상태처리할필요없음

    if (userInfo) {
      const tmpData = {
        region: translationMap[userInfo.region],
        education: translationMap[userInfo.education],
        jobStatus: translationMap[userInfo.jobStatus],
        age: parseInt(userInfo.age),
      };
      fetchPolicies(tmpData); //비동기 await~~해서 위에 로컬스토리지에서 받아온 객체 넣어줌
    }
  };

  useEffect(getData, []);

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
          <ModalContent
            openModal={openModal}
            closeModal={closeModal}
            getData={getData}
          />
        </div>
        {/* 배열 매핑으로 맞춤 추천 최종 구현!*/}
        <div className={styles.card_box}>
          {policyData.content.map((policy, index) => (
            <div
              className={styles.card}
              onClick={() => goToDetailPage(policy.bizId)}
              key={index}
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
