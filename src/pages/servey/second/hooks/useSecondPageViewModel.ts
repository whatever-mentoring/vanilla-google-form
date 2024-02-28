import { history } from "@/lib/router";
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

const debounce = (() => {
  let timeoutId: ReturnType<typeof setTimeout>;
  return (callback: () => void, ms: number) => {
    timeoutId && clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(), ms);
  };
})();

const useSecondPageViewModel = () => {
  const [selectList, setSelectList] = useState<Select[]>(selectListInit);
  const [text, setText] = useState<string>("");
  const [isSelectedValue, setIsSelectedValue] = useState(true);
  const [isTextValue, setIsTextValue] = useState(true);

  const goBack = () => {
    history.back();
  };

  const selectValidate = (selectList: Select[]) =>
    selectList.some((select) => select.value !== null && select.selected);
  const textValidate = (text: string) => !!text;

  const formValidation = () => {
    const isSelectedValue = selectValidate(selectList);
    const isTextValue = textValidate(text);
    setIsSelectedValue(isSelectedValue);
    setIsTextValue(isTextValue);
    return isSelectedValue && isTextValue;
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (formValidation()) {
      history.push("/servey/complete");
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
    const updatedSelectList = selectList.map((select) => ({
      ...select,
      selected: select.value === value,
    }));
    setSelectList(updatedSelectList);
    FormRepository.setSelectBoxOption(value);
    setIsSelectedValue(selectValidate(updatedSelectList));
  };

  const handleInput = (e: InputEvent) =>
    debounce(() => {
      setIsTextValue(true);
      const value = (e.target as any).value;
      setText(value);
      FormRepository.setTextAreaInput(value);
    }, 50);
  const handleInputBlur = () => {
    setIsTextValue(textValidate(text));
  };
  const removeAllInputValue = () => {
    setSelectList(selectListInit);
    setText("");
    setIsSelectedValue(true);
    setIsTextValue(true);
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
    handleInputBlur,
  };
};

export default useSecondPageViewModel;
