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

const useSecondPageViewModel = () => {
  const [selectList, setSelectList] = useState<Select[]>(selectListInit);
  const [text, setText] = useState<string>("");
  const [isSelectedValue, setIsSelectedValue] = useState(true);
  const [isTextValue, setIsTextValue] = useState(true);

  const goBack = () => {
    router.back();
  };

  const formValidation = () => {
    const isSelectedValue = selectList.some((select) => select.selected);
    const isTextValue = !!text;
    setIsSelectedValue(isSelectedValue);
    setIsTextValue(isTextValue);
    return isSelectedValue && isTextValue;
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
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
  return {
    handleSubmit,
    isSelectedValue,
    handleChangeSelect,
    selectList,
    isTextValue,
    text,
    handleInput,
    goBack,
    removeAllInputValue,
  };
};

export default useSecondPageViewModel;
