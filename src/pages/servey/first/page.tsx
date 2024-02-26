import BaseLayout from "@/pages/layouts/BaseLayout";
import styles from "./first.module.css";
import ServeyTitle from "../components/ServeyTitle";
import Card from "@/components/Card/Card";
import useFirstPageViewModel from "./hooks/useFirstPageViewModel";

const FirstPage = () => {
  const {
    handleSubmit,
    radioList,
    handleRaidioChange,
    checkboxList,
    handleCheckboxChange,
    removeAllInputValue,
    isRadioChecked,
    isCheckboxChecked,
  } = useFirstPageViewModel();

  return (
    <BaseLayout>
      <form onsubmit={handleSubmit}>
        <ServeyTitle />
        <Card isError={!isRadioChecked}>
          <div className={styles.formSectionNameWrapper}>
            <span>radio input</span>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputContainer}>
            {radioList.map((radio) => (
              <div className={styles.inputWrapper}>
                <label>
                  <input
                    type="radio"
                    name="radio-option"
                    checked={radio.checked}
                    value={radio.value}
                    onchange={handleRaidioChange}
                  />
                  <span className={styles.fontSmall}>{radio.text}</span>
                </label>
              </div>
            ))}
          </div>
        </Card>
        <Card isError={!isCheckboxChecked}>
          <div className={styles.formSectionNameWrapper}>
            <span>checkbox input</span>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputContainer}>
            {checkboxList.map((checkbox) => (
              <div className={styles.inputWrapper}>
                <label>
                  <input
                    type="checkbox"
                    value={checkbox.value}
                    checked={checkbox.checked}
                    onchange={handleCheckboxChange}
                  />
                  <span className={styles.fontSmall}>{checkbox.text}</span>
                </label>
              </div>
            ))}
          </div>
        </Card>
        <div className={styles.footerContainer}>
          <button
            className={styles.nextButton}
            type="submit"
            onclick={handleSubmit}
          >
            다음
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

export default FirstPage;
