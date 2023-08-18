import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../img/logo.png";
import styles from "./DetailPage.module.css";
import Footer from "../component/Footer";
import axios from "axios";

const DetailPage = () => {
  const navigate = useNavigate();

  const { bizId } = useParams();
  const [detailInfo, setDetailInfo] = useState(null);

  useEffect(() => {
    const apiUrl = `https://www.giljob-e.shop/api/policies/${bizId}`;

    axios
      .get(apiUrl)
      .then((response) => {
        // API에서 받아온 정책 상세 정보를 저장
        setDetailInfo(response.data);
      })
      .catch((error) => {
        console.error("Error fetching policy detail:", error);
      });
  }, [bizId]);

  if (!detailInfo) {
    return <div>Loading...</div>;
  }

  const goToHome = () => {
    navigate("/Home");
  };

  const applyPolicy = () => {
    // 정책 신청하기 버튼을 눌렀을 때 실행되는 함수
    const applyUrl = `https://www.youthcenter.go.kr/youngPlcyUnif/youngPlcyUnifDtl.do?bizId=${bizId}`;
    window.location.href = applyUrl;
  };

  const ageInfoMinText =
    detailInfo.ageInfoMin === -2147483648
      ? detailInfo.ageInfoMax === 2147483647
        ? "제한없음"
        : `만 ${detailInfo.ageInfoMax}세 이하`
      : `만 ${detailInfo.ageInfoMin}세`;

  const ageInfoMaxText =
    detailInfo.ageInfoMax === 2147483647
      ? "제한없음"
      : `만 ${detailInfo.ageInfoMax}세`;

  return (
    <div>
      <div className={styles.logo} onClick={goToHome}>
        <img src={logo} alt="logo" />
      </div>
      <div className={styles.header}>
        <span className={styles.title}>{detailInfo.name}</span>
        <span className={styles.intro}>{detailInfo.detail}</span>
      </div>
      <div className={styles.content}>
        {detailInfo ? (
          <>
            <div className={styles.detail}>
              <span className={styles.detailtitle}>정책 상세 설명</span>
              <ul className={styles.detailcontent}>
                <li>
                  <span className={styles.detailsmalltitle}>
                    정책 번호 <br />
                  </span>
                  <span>
                    {detailInfo.bizId === "null" || detailInfo.bizId === " "
                      ? "-"
                      : detailInfo.bizId}
                  </span>
                </li>
                <li>
                  <span className={styles.detailsmalltitle}>
                    정책 분야 <br />
                  </span>
                  <span>일자리 분야</span>
                </li>
                <li>
                  <span className={styles.detailsmalltitle}>
                    지원 내용 <br />
                  </span>
                  <span>
                    {detailInfo.content === "null" || detailInfo.content === " "
                      ? "-"
                      : detailInfo.content}
                  </span>
                </li>
                <li>
                  <span className={styles.detailsmalltitle}>
                    사업 운영 기간 <br />
                  </span>
                  <span>
                    {detailInfo.managePeriod === "null" ||
                    detailInfo.managePeriod === " "
                      ? "-"
                      : detailInfo.managePeriod}
                  </span>
                </li>
                <li>
                  <span className={styles.detailsmalltitle}>
                    사업 신청 기간 <br />
                  </span>
                  <span>
                    {detailInfo.applicationPeriod === "null" ||
                    detailInfo.applicationPeriod === " "
                      ? "-"
                      : detailInfo.applicationPeriod}
                  </span>
                </li>
                <li>
                  <span className={styles.detailsmalltitle}>
                    지원 규모(명) <br />
                  </span>
                  <span>
                    {detailInfo.scale === "null" || detailInfo.scale === " "
                      ? "-"
                      : detailInfo.scale}
                  </span>
                </li>
              </ul>
            </div>
            <div className={styles.qualify}>
              <span className={styles.detailtitle}>신청 자격</span>
              <ul className={styles.detailcontent}>
                <li>
                  <span className={styles.detailsmalltitle}>
                    연령 <br />
                  </span>
                  <span>
                    {ageInfoMinText}
                    {detailInfo.ageInfoMin !== -2147483648 &&
                    detailInfo.ageInfoMax !== 2147483647
                      ? ` ~ ${ageInfoMaxText}`
                      : ""}
                  </span>
                </li>
                <li>
                  <span className={styles.detailsmalltitle}>
                    거주지 및 소득 <br />
                  </span>
                  <span>
                    {detailInfo.residence === "null" ||
                    detailInfo.residence === " "
                      ? "-"
                      : detailInfo.residence}
                  </span>
                </li>
                <li>
                  <span className={styles.detailsmalltitle}>
                    학력 <br />
                  </span>
                  <span>
                    {detailInfo.education === "null" ||
                    detailInfo.education === " "
                      ? "-"
                      : detailInfo.education}
                  </span>
                </li>
                <li>
                  <span className={styles.detailsmalltitle}>
                    전공 <br />
                  </span>
                  <span>
                    {detailInfo.major === "null" || detailInfo.major === " "
                      ? "-"
                      : detailInfo.major}
                  </span>
                </li>
                <li>
                  <span className={styles.detailsmalltitle}>
                    취업 상태 <br />
                  </span>
                  <span>
                    {detailInfo.jobStatus === "null" ||
                    detailInfo.jobStatus === " "
                      ? "-"
                      : detailInfo.jobStatus}
                  </span>
                </li>
                <li>
                  <span className={styles.detailsmalltitle}>
                    특화 분야 <br />
                  </span>
                  <span>
                    {detailInfo.specialization === "null" ||
                    detailInfo.specialization === " "
                      ? "-"
                      : detailInfo.specialization}
                  </span>
                </li>
                <li>
                  <span>추가 단서 사항 : {detailInfo.additionalCondition}</span>
                  <span className={styles.detailsmalltitle}>
                    추가 단서 사항 <br />
                  </span>
                  <span>
                    {detailInfo.additionalCondition === "null" ||
                    detailInfo.additionalCondition === " "
                      ? "-"
                      : detailInfo.additionalCondition}
                  </span>
                </li>
                <li>
                  <span className={styles.detailsmalltitle}>
                    참여 제한 대상 <br />
                  </span>
                  <span>
                    {detailInfo.restrictedPaticipant === "null" ||
                    detailInfo.restrictedPaticipant === " "
                      ? "-"
                      : detailInfo.restrictedPaticipant}
                  </span>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
        <button onClick={applyPolicy}>신청하기</button>
      </div>
      <Footer />
    </div>
  );
};

export default DetailPage;
