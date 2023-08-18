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

  // 이전에 보던 페이지 번호를 저장할 상태
  const [lastPageVisited, setLastPageVisited] = useState(1);
  const [visitedPages, setVisitedPages] = useState([1]); // 이전에 방문한 페이지 번호를 저장하는 상태

  const goToHome = () => {
    navigate("/Home");
  };

  // 정책 상세 페이지로 이동
  const goToDetailPage = (bizId) => {
    // 현재 페이지 번호 저장
    setLastPageVisited(activePage);
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
    return `https://www.giljob-e.shop/api/policies?keyword=${searchText}&pageNumber=${
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
      if (activePage === 1) {
        setActivePage(lastPageVisited);
      }
      fetchPolicies(); // API 호출
    }
  }, [searchText, lastPageVisited, activePage]);

  // 뒤로 가기를 눌렀을 때 이전 페이지 번호를 확인하고 설정
  useEffect(() => {
    window.onpopstate = (event) => {
      if (event.state) {
        setActivePage(event.state.page);
        setLastPageVisited(event.state.page);
      }
    };
  }, []);

  // 페이지 번호 변경 시 호출되는 함수
  const handlePageChange = (pageNumber) => {
    // 현재 페이지 번호와 이전에 보던 페이지 번호가 다른 경우 브라우저 히스토리에 페이지 정보를 저장
    if (pageNumber !== lastPageVisited) {
      window.history.pushState({ page: pageNumber }, "", `?page=${pageNumber}`);
      setLastPageVisited(pageNumber);
    }
    setActivePage(pageNumber);
  };

  // 새로고침 시 URL의 쿼리 매개변수에서 페이지 번호 읽어와 활성 페이지 설정
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const pageParam = queryParams.get("page");
    const initialPage = pageParam ? parseInt(pageParam) : lastPageVisited;

    if (searchText) {
      setActivePage(initialPage);
      setLastPageVisited(initialPage);
    }
  }, []);

  // 새로운 useEffect 추가: activePage 변경 시 API 호출
  useEffect(() => {
    if (searchText) {
      fetchPolicies();
    }
  }, [activePage]);

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
            <span>'{cutText(searchText, 27)}'</span> 검색 결과
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
        prevPageText="<"
        nextPageText=">"
        hideFirstLastPages={true} /* 맨 앞과 끝 페이지 버튼이 숨겨짐 */
        onChange={handlePageChange}
        activeClass={styles.custom_active} // 활성화된 페이지 스타일
        itemClass={styles.custom_page_item} // 페이지 아이템 스타일
        linkClass={styles.custom_page_link} // 페이지 링크 스타일
      />
      <Footer />
    </div>
  );
}

export default SearchResults;
