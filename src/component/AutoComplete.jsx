import React, { useState, useRef } from "react";
import search from "../img/search.png";
import styles from "./AutoComplete.module.css";
import { useNavigate } from "react-router-dom";

const AutoComplete = ({ options }) => {
  let navigate = useNavigate();
  const inputRef = useRef(null);

  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);

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
    inputRef.current.focus();
  };

  const handleBlur = () => {
    setTimeout(() => {
      setFilteredOptions([]);
    }, 200);
  };

  const goToSearchResults = () => {
    if (inputValue.length > 0) {
      navigate("/SearchResults");
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
