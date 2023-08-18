import React, { useState, useEffect, useRef } from "react";
import styles from "./Dropdown.module.css";
import dropdown from "../img/Ic_Dropdown.png";
import dropdown2 from "../img/Ic_Dropdown2.png";

function Dropdown({ options, defaultOption, onSelect, initialSelected }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(
    initialSelected || defaultOption
  );
  const [isOriginal, setIsOriginal] = useState(true); // 드롭다운 열고 닫을 때 아이콘 변경
  const dropdownRef = useRef(null); // Ref 객체를 생성하여 드롭다운 컨테이너를 참조

  // 드롭다운 컨테이너 외부를 클릭하면 드롭다운 내용을 닫을 수 있게 하는 기능
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setIsOriginal(true);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // 드롭다운 버튼을 클릭했을 때 isOpen 상태를 토글하여 드롭다운 내용을 보이거나 숨김(+이미지 토글)
  // 드롭다운 내용이 보이는 상태에서 버튼 재클릭시 setIsOriginal(true)로 아이콘 변경
  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
    if (isOriginal) {
      setIsOriginal(false);
    } else {
      setIsOriginal(true);
    }
  };

  // 드롭다운 내용에서 옵션을 클릭했을 때 호출되는 함수
  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOriginal(true);
    setIsOpen(false);

    if (onSelect) {
      onSelect(option); // onSelect 콜백을 호출하여 선택한 옵션을 상위 컴포넌트로 전달
    }
  };

  return (
    <div
      className={`${styles.dropdown_container} ${isOpen ? styles.open : ""}`}
      ref={dropdownRef}
    >
      <button
        className={`${styles.drop_btn} ${isOpen ? styles.opened : ""} ${
          selectedOption === defaultOption ? "" : styles.selected
        }`}
        onClick={handleDropdownClick}
      >
        {selectedOption}
        <img src={isOriginal ? dropdown : dropdown2} alt="Icon_Dropdown" />
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
