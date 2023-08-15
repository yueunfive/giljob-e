import logo from "../img/logo.png";
import React, { useState, useEffect } from "react";
import styles from "./SearchResults.module.css";
import AutoComplete from "../component/AutoComplete";
import Footer from "../component/Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "react-js-pagination";

// 24자 초과할 경우 ..으로 표시
function cutText(text, maxLength) {
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "..";
  }
  return text;
}

function SearchResults() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/Home");
  };

  // 정책 상세 페이지로 이동
  const goToDetailPage = (bizId) => {
    // 해당 정책의 bizid를 사용하여 DetailPage로 이동
    navigate(`/DetailPage/${bizId}`);
  };

  const [policyData, setPolicyData] = useState({ content: [] }); //  API 응답 데이터를 관리하는 상태 추가
  const [activePage, setActivePage] = useState(1); // 현재 선택된 페이지 번호 상태 추가
  const itemsPerPage = 12; // 한 페이지당 보여줄 아이템 개수

  // 로컬 스토리지에 있던 검색 결과 꺼내오기(문자열로 저장해서 JSON 파싱 안해도 됨)
  const searchText = localStorage.getItem("searchText");

  // 검색 결과를 위한 API 요청 URL 생성
  const constructApiUrl = () => {
    return `http://54.180.36.240/api/policies?keyword=${searchText}&pageNumber=${
      activePage - 1
    }&pageSize=${itemsPerPage}`;
  };

  // API 호출 함수 정의
  const fetchPolicies = async () => {
    try {
      const apiUrl = constructApiUrl();
      const response = await axios.get(apiUrl); // API 요청

      setPolicyData(response.data); // policyData 업데이트
      console.log("searchText:", searchText);
      console.log(constructApiUrl());
    } catch (error) {
      console.error("Error fetching policies:", error);
    }
  };

  // searchText가 변경될 때에만 API를 호출
  useEffect(() => {
    if (searchText) {
      fetchPolicies(); // API 호출
    }
  }, [searchText, activePage]);

  // 페이지 번호 변경 핸들러
  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <div className={styles.Home}>
      <div className={styles.logo} onClick={goToHome}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.search}>
        <AutoComplete />
      </div>
      <div className={styles.SearchResults}>
        <div className={styles.search_text}>
          <h1>
            <span>'{searchText}'</span> 검색 결과
          </h1>
        </div>
        <div className={styles.card_box}>
          {policyData.content.map((policy, index) => (
            <div
              key={index}
              className={styles.card}
              onClick={() => goToDetailPage(policy.bizId)}
            >
              <div className={styles.card_text}>{cutText(policy.name, 24)}</div>
            </div>
          ))}
        </div>
      </div>
      <Pagination
        activePage={activePage} // 현재 활성화된 페이지 번호
        itemsCountPerPage={itemsPerPage} // 페이지당 보여줄 아이템 개수
        totalItemsCount={policyData.totalElements} // 전체 아이템 개수로 변경
        pageRangeDisplayed={5} // 페이지 번호 버튼의 범위 (양 옆으로 몇 개의 페이지 번호를 보여줄지)
        onChange={handlePageChange} // 페이지 번호 변경 시 호출되는 함수
        activeClass={styles.custom_active} // 활성화된 페이지 스타일
        itemClass={styles.custom_page_item} // 페이지 아이템 스타일
        linkClass={styles.custom_page_link} // 페이지 링크 스타일
      />
      <Footer />
    </div>
  );
}

export default SearchResults;
