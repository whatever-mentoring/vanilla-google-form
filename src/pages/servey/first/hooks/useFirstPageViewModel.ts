import { useEffect, useState } from "@/lib/dom";
import FormRepository from "@/repository/FormRepository";
import { history } from "@/lib/router";

type Input = { text: string; value: string; checked: boolean };

const radioListInit: Input[] = [
  { text: "radio option1", value: "radio option1", checked: false },
  { text: "radio option2", value: "radio option2", checked: false },
  { text: "radio option3", value: "radio option3", checked: false },
];

const checkboxListInit: Input[] = [
  { text: "checkbox option1", value: "checkbox option1", checked: false },
  { text: "checkbox option2", value: "checkbox option2", checked: false },
  { text: "checkbox option3", value: "checkbox option3", checked: false },
];

const useFirstPageViewModel = () => {
  const [radioList, setRadioList] = useState<Input[]>(radioListInit);
  const [checkboxList, setCheckboxList] = useState<Input[]>(checkboxListInit);
  const [isRadioChecked, setIsRadioChecked] = useState(true);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(true);

  useEffect(() => {
    const radioValue = FormRepository.getRadioInput();
    setRadioList(
      radioList.map((radio) => ({
        ...radio,
        checked: radio.value === radioValue,
      }))
    );

    const checkboxValueList = FormRepository.getCheckboxInput();
    const check = checkboxList.map((checkbox) => ({
      ...checkbox,
      checked: checkboxValueList.some((value) => value === checkbox.value),
    }));
    setCheckboxList(check);
  }, []);

  const radioValidate = (radioList: Input[]) =>
    radioList.some((radio) => radio.checked);
  const checkboxValidate = (checkboxList: Input[]) =>
    checkboxList.some((checkbox) => checkbox.checked);

  const handleRaidioChange = (e: InputEvent) => {
    const value = (e.target as any).value;
    const updatedRadioList = radioList.map((radio) => ({
      ...radio,
      checked: radio.value === value,
    }));
    setRadioList(updatedRadioList);
    FormRepository.setRadioInput(value);
    setIsRadioChecked(radioValidate(updatedRadioList));
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
    setIsCheckboxChecked(checkboxValidate(updatedRadioList));
  };

  const formValidation = () => {
    const isRadioChecked = radioValidate(radioList);
    const isCheckboxChecked = checkboxValidate(checkboxList);

    setIsRadioChecked(isRadioChecked);
    setIsCheckboxChecked(isCheckboxChecked);
    return isRadioChecked && isCheckboxChecked;
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (formValidation()) {
      history.push("/servey/second");
    }
  };

  const removeAllInputValue = () => {
    setRadioList(radioListInit);
    setCheckboxList(checkboxListInit);
    setIsRadioChecked(true);
    setIsCheckboxChecked(true);

    FormRepository.clearRadioInput();
    FormRepository.clearCheckboxInput();
  };

  return {
    handleSubmit,
    radioList,
    handleRaidioChange,
    checkboxList,
    handleCheckboxChange,
    removeAllInputValue,
    isRadioChecked,
    isCheckboxChecked,
  };
};

export default useFirstPageViewModel;
