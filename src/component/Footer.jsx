import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footercontent}>
        <div className={styles.footertitle}>
          <span>길JOB이</span>
        </div>
        <div className={styles.contact}>
          <span className={styles.bold}>Contact</span>
          <span className={styles.light}>ihyemin39@kakao.com</span>
        </div>
        <div className={styles.copyright}>
          <span className={styles.bold}>Copyright</span>
          <span className={styles.light}>ⓒ 길JOB이</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
