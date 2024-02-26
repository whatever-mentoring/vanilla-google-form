import BaseLayout from "@/pages/layouts/BaseLayout";
import ServeyTitle from "../components/ServeyTitle";
import Card from "@/components/Card/Card";
import styles from "./second.module.css";
import useSecondPageViewModel from "./hooks/useSecondPageViewModel";

const SecondPage = () => {
  const {
    handleSubmit,
    isSelectedValue,
    handleChangeSelect,
    selectList,
    isTextValue,
    text,
    handleInput,
    goBack,
    removeAllInputValue,
  } = useSecondPageViewModel();

  return (
    <BaseLayout>
      <form onsubmit={handleSubmit}>
        <ServeyTitle />
        <Card isError={!isSelectedValue}>
          <div className={styles.borderTop}>
            <span>section2</span>
          </div>
          <div className={styles.sectionName}>
            <span>select</span>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.selectBoxContainer}>
            <select onchange={handleChangeSelect}>
              {selectList.map((select) => (
                <option value={select.value} selected={select.selected}>
                  {select.text}
                </option>
              ))}
            </select>
          </div>
        </Card>
        <Card isError={!isTextValue}>
          <div className={styles.textAreaTitle}>
            <span>textarea</span>
            <span className={styles.asterisk}>*</span>
          </div>
          <div>
            <textarea
              className={styles.textarea}
              value={text}
              rows={1}
              oninput={handleInput}
            />
          </div>
        </Card>
        <div className={styles.footerContainer}>
          <button className={styles.backButton} type="button" onclick={goBack}>
            뒤로
          </button>
          <button className={styles.submitButton} type="submit">
            제출
          </button>
          <button
            className={styles.resetButton}
            type="reset"
            onclick={removeAllInputValue}
          >
            양식 지우기
          </button>
        </div>
      </form>
    </BaseLayout>
  );
};

export default SecondPage;
