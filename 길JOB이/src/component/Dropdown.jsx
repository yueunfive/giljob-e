import React, { useState, useEffect, useRef } from "react";
import styles from "./Dropdown.module.css";

function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [select, setSelect] = useState("지역");
  const [selectedOption, setSelectedOption] = useState(
    `${select}을 선택해 주세요`
  );
  const dropdownRef = useRef(null); // Ref 객체를 생성하여 드롭다운 컨테이너를 참조

  const region = ["전체", "서울", "경기", "부산", "대구", "인천"]; // 드롭다운 박스의 옵션들을 배열로 정의

  // 드롭다운 컨테이너 외부를 클릭하면 드롭다운 내용을 닫을 수 있게 하는 기능
  useEffect(() => {
    // 아무데나 클릭했을 때 드롭다운을 닫는 이벤트 리스너를 추가
    const handleOutsideClick = (event) => {
      // dropdownRef를 이용하여 클릭 이벤트가 드롭다운 컨테이너 내부에서 발생한 것인지 확인
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // 드롭다운 내용을 닫음
      }
    };
    // document 전역에 클릭 이벤트 리스너를 추가
    document.addEventListener("click", handleOutsideClick);
    // 컴포넌트가 unmount될 때 이벤트 리스너를 정리
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []); // 빈 배열을 전달하여 마운트될 때만 useEffect가 실행되도록 설정

  // 드롭다운 버튼을 클릭했을 때 호출되는 함수
  const handleDropdownClick = () => {
    setIsOpen(!isOpen); // isOpen 상태를 토글하여 드롭다운 내용을 보이거나 숨김
  };

  // 드롭다운 내용의 각 옵션을 클릭했을 때 호출되는 함수
  const handleOptionClick = (option) => {
    console.log("Clicked option:", option);
    setIsOpen(false); // 드롭다운 내용을 숨김
    setSelectedOption(option); // 선택된 옵션을 selectedOption 상태로 설정
  };

  return (
    <div className={styles.dropdown_container} ref={dropdownRef}>
      <button
        className={`${styles.drop_btn} ${isOpen ? styles.opened : ""}`}
        onClick={handleDropdownClick}
      >
        {selectedOption}
      </button>
      {isOpen && (
        <div className={styles.dropdown_content}>
          {region.map((option) => (
            <div
              key={option}
              className={styles.option}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
