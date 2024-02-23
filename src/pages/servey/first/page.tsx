import BaseLayout from "@/pages/layouts/BaseLayout";
import styles from "./first.module.css";
import ServeyTitle from "../components/ServeyTitle";
import { push } from "@/lib/router";
import Card from "@/components/Card/Card";
import { useEffect, useState } from "@/lib/dom";
import FormRepository from "@/repository/FormRepository";

const FirstPage = () => {
  const [radio, setRadio] = useState<string>("");
  const [checkbox, setCheckbox] = useState<string[]>([]);
  useEffect(() => {
    const radio = FormRepository.getRadioInput();
    setRadio(radio ?? "");
  }, [radio]);
  const goNextPage = () => {
    push("/servey/second");
  };
  const handleRaidioChange = (e: InputEvent) => {
    const value = (e.target as any).value;
    setRadio(value);
  };
  const handleCheckboxChange = (e: InputEvent) => {
    const value = (e.target as any).value;
    setCheckbox([value]);
  };
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    FormRepository.setRadioInput(radio);
  };

  return (
    <BaseLayout>
      <form onsubmit={handleSubmit}>
        <ServeyTitle />
        <Card>
          <div className={styles.formSectionNameWrapper}>
            <span>radio input</span>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputContainer}>
            {["radio option1", "radio option2", "radio option3"].map(
              (option, i) => (
                <div className={styles.inputWrapper}>
                  <label>
                    <input
                      type="radio"
                      name="radio-option"
                      checked={radio === option}
                      value={option}
                      onchange={handleRaidioChange}
                    />
                    <span className={styles.fontSmall}>{option}</span>
                  </label>
                </div>
              )
            )}
          </div>
        </Card>
        <Card>
          <div className={styles.formSectionNameWrapper}>
            <span>checkbox input</span>
            <span className={styles.asterisk}>*</span>
          </div>
          <div className={styles.inputContainer}>
            {["checkbox option1", "checkbox option2", "checkbox option3"].map(
              (checkbox, i) => (
                <div className={styles.inputWrapper}>
                  <label>
                    <input
                      type="checkbox"
                      value={checkbox}
                      onchange={handleCheckboxChange}
                    />
                    <span className={styles.fontSmall}>{checkbox}</span>
                  </label>
                </div>
              )
            )}
          </div>
        </Card>
        <div className={styles.footerContainer}>
          <button type="submit" onclick={handleSubmit}>
            다음
          </button>
          <button type="button">양식 지우기</button>
        </div>
      </form>
    </BaseLayout>
  );
};

export default FirstPage;
