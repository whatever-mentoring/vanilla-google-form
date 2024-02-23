import BaseLayout from "@/pages/layouts/BaseLayout";
import styles from "./styles/first.module.css";

const FirstPage = () => {
  return (
    <BaseLayout>
      <form>
        <div className={`${styles.cardContainer} first`}>
          <div className={styles.borderTop} />
          <h2 className={styles.title}>Survey</h2>
          <hr className={styles.hr} />
          <div className={styles.emphasize}>* 표시는 필수 질문임</div>
        </div>
        <div className={styles.cardContainer}>
          <div className={styles.formSectionNameWrapper}>
            <span>radio input</span>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
              <label>
                <input type="radio" name="checkbox-option"></input>
                <span>checkbox option1</span>
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <label>
                <input type="radio" name="checkbox-option"></input>
                <span>checkbox option2</span>
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <label>
                <input type="radio" name="checkbox-option"></input>
                <span>checkbox option3</span>
              </label>
            </div>
          </div>
        </div>
        <div className={styles.cardContainer}>
          <div className={styles.formSectionNameWrapper}>
            <span>checkbox input</span>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
              <label>
                <input type="checkbox"></input>
                <span>checkbox option1</span>
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <label>
                <input type="checkbox"></input>
                <span>checkbox option2</span>
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <label>
                <input type="checkbox"></input>
                <span>checkbox option3</span>
              </label>
            </div>
          </div>
        </div>
        <div className={styles.footerContainer}>
          <button>다음</button>
          <button>양식 지우기</button>
        </div>
      </form>
    </BaseLayout>
  );
};

export default FirstPage;
