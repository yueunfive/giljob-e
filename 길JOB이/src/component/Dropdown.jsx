import React, { useState, useEffect, useRef } from "react";
import styles from "./Dropdown.module.css";

function Dropdown({ options, defaultOption }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const dropdownRef = useRef(null); // Ref 객체를 생성하여 드롭다운 컨테이너를 참조

  // 드롭다운 컨테이너 외부를 클릭하면 드롭다운 내용을 닫을 수 있게 하는 기능
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // 드롭다운 버튼을 클릭했을 때 isOpen 상태를 토글하여 드롭다운 내용을 보이거나 숨김
  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  // 드롭다운 내용에서 옵션을 클릭했을 때 호출되는 함수
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div
      className={`${styles.dropdown_container} ${isOpen ? styles.open : ""}`}
      ref={dropdownRef}
    >
      <button
        className={`${styles.drop_btn} ${isOpen ? styles.opened : ""}`}
        onClick={handleDropdownClick}
      >
        {selectedOption}
      </button>
      <div className={styles.dropdown_content}>
        {options.map((option) => (
          <div
            key={option}
            className={styles.option}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dropdown;
