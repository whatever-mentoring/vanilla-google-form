import { useEffect, useState } from "@/lib/dom";
import FormRepository from "@/repository/FormRepository";
import * as router from "@/lib/router";

type SelectInput = { text: string; value: string; checked: boolean };

const radioListInit = [
  { text: "radio option1", value: "radio option1", checked: false },
  { text: "radio option2", value: "radio option2", checked: false },
  { text: "radio option3", value: "radio option3", checked: false },
];

const checkboxListInit = [
  { text: "checkbox option1", value: "checkbox option1", checked: false },
  { text: "checkbox option2", value: "checkbox option2", checked: false },
  { text: "checkbox option3", value: "checkbox option3", checked: false },
];

const useFirstPageViewModel = () => {
  const [radioList, setRadioList] = useState<SelectInput[]>(radioListInit);
  const [checkboxList, setCheckboxList] =
    useState<SelectInput[]>(checkboxListInit);
  useEffect(() => {
    const value = FormRepository.getRadioInput();
    setRadioList(
      radioList.map((radio) => ({ ...radio, checked: radio.value === value }))
    );
  }, []);
  useEffect(() => {
    const valueList = FormRepository.getCheckboxInput();
    const check = checkboxList.map((checkbox) => ({
      ...checkbox,
      checked: valueList.some((value) => value === checkbox.value),
    }));
    setCheckboxList(check);
  }, []);
  const handleRaidioChange = (e: InputEvent) => {
    const value = (e.target as any).value;
    setRadioList(
      radioList.map((radio) => ({
        ...radio,
        checked: radio.checked === false ? radio.value === value : true,
      }))
    );
    FormRepository.setRadioInput(value);
  };
  const handleCheckboxChange = (e: InputEvent) => {
    const { value, checked } = e.target as any;
    const updatedRadioList = checkboxList.map((checkbox) => ({
      ...checkbox,
      ...(checkbox.value === value && { checked }),
    }));
    setCheckboxList(updatedRadioList);
    FormRepository.setCheckboxInput(
      updatedRadioList
        .filter((radio) => radio.checked)
        .map((radio) => radio.value)
    );
  };
  const formValidation = () => {
    const isRadioChecked = radioList.some((radio) => radio.checked);
    const isCheckboxChecked = checkboxList.some((checkbox) => checkbox.checked);
    return isRadioChecked && isCheckboxChecked;
  };
  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (formValidation()) {
      router.push("/servey/second");
    }
  };

  const removeAllInputValue = () => {
    setRadioList(radioListInit);
    setCheckboxList(checkboxListInit);
    FormRepository.allClear();
  };
  return {
    handleSubmit,
    radioList,
    handleRaidioChange,
    checkboxList,
    handleCheckboxChange,
    removeAllInputValue,
  };
};

export default useFirstPageViewModel;
