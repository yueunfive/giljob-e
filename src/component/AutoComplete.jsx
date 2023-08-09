import React, { useState } from "react";
import search from "../img/search.png";
import styles from "./AutoComplete.module.css";
import { useNavigate } from "react-router-dom";

const AutoComplete = ({ options, setClickInputValue }) => {
  let navigate = useNavigate();

  const [inputValue, setInputValue] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    const filtered = options.filter((option) =>
      option.toLowerCase().startsWith(value.toLowerCase())
    );

    setFilteredOptions(filtered);
    setShowDropdown(filtered.length > 0);
  };

  const handleSelectOption = (option) => {
    setInputValue(option);
    setFilteredOptions([]);
    setShowDropdown(false);
  };

  const handleBlur = () => {
    setShowDropdown(false);
  };

  // 버튼에 적용할 클릭 이벤트 함수
  const goToSearchResults = () => {
    navigate("/SearchResults");
  };

  // 검색창에 검색한 용어 저장
  const handleInput = () => {
    setClickInputValue(inputValue);
  };

  return (
    <div className={styles.dropdown}>
      <div className={styles.searchbox}>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={() => setShowDropdown(true)}
          placeholder="궁금한 일자리 정책을 찾아보세요!"
        />
        <button
          className={styles.search_btn}
          onClick={() => {
            goToSearchResults();
            handleInput();
          }}
        >
          <img src={search} className={styles.searchicon} alt="searchicon" />
        </button>
      </div>
      {showDropdown && inputValue && (
        <ul className={styles.dropdownbox}>
          {filteredOptions.map((option) => {
            const startIndex = option
              .toLowerCase()
              .indexOf(inputValue.toLowerCase());
            const endIndex = startIndex + inputValue.length;
            return (
              <li key={option} onClick={() => handleSelectOption(option)}>
                {startIndex !== -1 ? (
                  <span className={styles.dropdowntext}>
                    {option.slice(0, startIndex)}
                    <strong>{option.slice(startIndex, endIndex)}</strong>
                    {option.slice(endIndex)}
                  </span>
                ) : (
                  option
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AutoComplete;