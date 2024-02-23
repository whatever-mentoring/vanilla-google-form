import BaseLayout from "@/pages/layouts/BaseLayout";
import styles from "./first.module.css";
import ServeyTitle from "../components/ServeyTitle";
import { push } from "@/lib/router";
import Card from "@/components/Card/Card";

const FirstPage = () => {
  const goNextPage = () => {
    push("/servey/second");
  };
  return (
    <BaseLayout>
      <form>
        <ServeyTitle />
        <Card>
          <div className={styles.formSectionNameWrapper}>
            <span>radio input</span>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
              <label>
                <input type="radio" name="radio-option"></input>
                <span className={styles.fontSmall}>radio option1</span>
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <label>
                <input type="radio" name="radio-option"></input>
                <span className={styles.fontSmall}>radio option2</span>
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <label>
                <input type="radio" name="radio-option"></input>
                <span className={styles.fontSmall}>radio option3</span>
              </label>
            </div>
          </div>
        </Card>
        <Card>
          <div className={styles.formSectionNameWrapper}>
            <span>checkbox input</span>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputContainer}>
            <div className={styles.inputWrapper}>
              <label>
                <input type="checkbox"></input>
                <span className={styles.fontSmall}>checkbox option1</span>
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <label>
                <input type="checkbox"></input>
                <span className={styles.fontSmall}>checkbox option2</span>
              </label>
            </div>
            <div className={styles.inputWrapper}>
              <label>
                <input type="checkbox"></input>
                <span className={styles.fontSmall}>checkbox option3</span>
              </label>
            </div>
          </div>
        </Card>
        <div className={styles.footerContainer}>
          <button type="button" onclick={goNextPage}>
            다음
          </button>
          <button type="button">양식 지우기</button>
        </div>
      </form>
    </BaseLayout>
  );
};

export default FirstPage;
