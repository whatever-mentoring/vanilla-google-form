import BaseLayout from "@/pages/layouts/BaseLayout";
import ServeyTitle from "../components/ServeyTitle";
import Card from "@/components/Card/Card";
import styles from "./second.module.css";
import * as router from "@/lib/router";

const SecondPage = () => {
  const goBack = () => {
    router.back();
  };
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    router.push("/servey/complete");
    console.log("제출!");
  };
  return (
    <BaseLayout>
      <form onsubmit={handleSubmit}>
        <ServeyTitle />
        <Card>
          <div className={styles.borderTop}>
            <span>section2</span>
          </div>
          <div className={styles.sectionName}>
            <span>select</span>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.selectBoxContainer}>
            <select name="">
              <option disabled selected>
                선택
              </option>
              <option>select option1</option>
              <option>select option2</option>
              <option>select option3</option>
            </select>
          </div>
        </Card>
        <Card>
          <div className={styles.textAreaTitle}>
            <span>textarea</span>
            <span className={styles.asterisk}>*</span>
          </div>
          <div>
            <textarea className={styles.textarea} rows={1} />
          </div>
        </Card>
        <div className={styles.footerContainer}>
          <button type="button" onclick={goBack}>
            뒤로
          </button>
          <button type="submit">제출</button>
          <button type="button">양식 지우기</button>
        </div>
      </form>
    </BaseLayout>
  );
};

export default SecondPage;
