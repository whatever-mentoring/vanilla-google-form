import BaseLayout from "@/pages/layouts/BaseLayout";
import ServeyTitle from "../components/ServeyTitle";
import Card from "@/components/Card/Card";
import styles from "./second.module.css";
import * as router from "@/lib/router";
import { useEffect, useState } from "@/lib/dom";
import FormRepository from "@/repository/FormRepository";

type Select = { text: string; value: string | null; selected: boolean };

const selectListInit: Select[] = [
  {
    text: "선택",
    value: null,
    selected: true,
  },
  {
    text: "select option1",
    value: "select option1",
    selected: false,
  },
  {
    text: "select option2",
    value: "select option2",
    selected: false,
  },
  {
    text: "select option3",
    value: "select option3",
    selected: false,
  },
];

const SecondPage = () => {
  const [selectList, setSelectList] = useState<Select[]>(selectListInit);
  const [text, setText] = useState<string>("");

  const goBack = () => {
    router.back();
  };

  const formValidation = () => {
    const isSelectedValue = selectList.some((select) => select.selected);
    const isTextValue = text;
    return isSelectedValue && isTextValue;
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    console.log("submit!!");
    if (formValidation()) {
      router.push("/servey/complete");
    }
  };

  useEffect(() => {
    const selectValue = FormRepository.getSelectBoxOption();
    setSelectList(
      selectList.map((select) => ({
        ...select,
        selected: select.value === selectValue,
      }))
    );

    const inputValue = FormRepository.getTextAreaInput();
    setText(inputValue);
  }, []);

  const handleChangeSelect = (e: InputEvent) => {
    const value = (e.target as any).value;
    setSelectList(
      selectList.map((select) => ({
        ...select,
        selected: select.value === value,
      }))
    );
    FormRepository.setSelectBoxOption(value);
  };

  const handleInput = (e: InputEvent) => {
    const value = (e.target as any).value;
    setText(value);
    FormRepository.setTextAreaInput(value);
  };
  const removeAllInputValue = () => {
    setSelectList(selectListInit);
    setText("");
    FormRepository.clearSelectBoxOption();
    FormRepository.clearTextAreaInput();
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
            <select onchange={handleChangeSelect}>
              {selectList.map((select) => (
                <option value={select.value} selected={select.selected}>
                  {select.text}
                </option>
              ))}
            </select>
          </div>
        </Card>
        <Card>
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
          <div>
            <button
              className={styles.backButton}
              type="button"
              onclick={goBack}
            >
              뒤로
            </button>
          </div>
          <div>
            <button className={styles.submitButton} type="submit">
              제출
            </button>
          </div>
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
