import React, { useState, useRef, useEffect } from "react";
import search from "../img/search.png";
import styles from "./AutoComplete.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AutoComplete = () => {
  let navigate = useNavigate();
  const inputRef = useRef(null);

  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [options, setOptions] = useState([]);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = value
      ? options.filter((option) =>
          option.toLowerCase().includes(value.toLowerCase())
        )
      : [];
    setFilteredOptions(filtered);
  };

  const handleSelectOption = (option) => {
    setInputValue(option);
    setFilteredOptions([]);

    const selectedPolicy = options.find((policy) => policy === option);
    if (selectedPolicy) {
      axios
        .get(`https://www.giljob-e.shop/api/policies?name=${selectedPolicy}`)
        .then((response) => {
          const bizId = response.data.content[0].bizId; // 가정한 예시
          navigate(`/DetailPage/${bizId}`);
        })
        .catch((error) => {
          console.error("Error fetching policy details:", error);
        });
    }
  };

  const handleBlur = () => {
    setTimeout(() => {
      setFilteredOptions([]);
    }, 200);
  };

  const goToSearchResults = () => {
    if (inputValue.length > 0) {
      navigate("/SearchResults");
      window.location.href = "/SearchResults"; // SearchResults 페이지로 이동할 때 새로고침(이렇게 해야 Home에서 SearchResult로 갈 때 바로 결과값 뜸)
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // 기본 엔터 키 동작 막기
      goToSearchResults();
      handleSearch();
      setFilteredOptions([]);
    }
  };

  const handleSearch = () => {
    localStorage.setItem("searchText", inputValue);
  };

  // 입력값과 겹치는 부분을 강조하여 표시하는 함수
  const highlightMatchingText = (text) => {
    const index = text.toLowerCase().indexOf(inputValue.toLowerCase());
    if (index === -1) {
      return text;
    }

    const before = text.substring(0, index);
    const match = text.substring(index, index + inputValue.length);
    const after = text.substring(index + inputValue.length);

    return (
      <>
        {before}
        <strong className={styles.highlight}>{match}</strong>
        {after}
      </>
    );
  };

  useEffect(() => {
    const defaultURL = "https://www.giljob-e.shop/api/policies";
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
      .get(defaultURL)
      .then((response) => {
        const totalElements = response.data.totalElements;
        const apiUrl = `https://www.giljob-e.shop/api/policies?pageSize=${totalElements}`;
        console.log(apiUrl);
        axios
          .get(apiUrl, { params })
          .then((secondResponse) => {
            const newOptions = secondResponse.data.content.map(
              (item) => item.name
            );
            setOptions(newOptions);
          })
          .catch((error) => {
            console.error("Error fetching data from API:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching data from API:", error);
      });
  }, []);

  return (
    <div className={styles.dropdown}>
      <div className={styles.searchbox}>
        <input
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={() => setFilteredOptions(filteredOptions.length > 0)}
          onKeyDown={handleKeyDown}
          placeholder="궁금한 일자리 정책을 찾아보세요!"
        />
        <button
          className={styles.search_btn}
          onClick={() => {
            goToSearchResults();
            handleSearch();
          }}
        >
          <img src={search} className={styles.searchicon} alt="searchicon" />
        </button>
      </div>
      {filteredOptions.length > 0 && (
        <ul className={styles.dropdownbox}>
          {filteredOptions.map((option) => (
            <li
              key={option}
              onClick={() => handleSelectOption(option)}
              className={styles.dropdowntext}
            >
              {highlightMatchingText(option)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;
