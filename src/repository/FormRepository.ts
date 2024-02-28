import LocalStorage from "@/infrastructure/localstorage";

enum FormStorageKey {
  RADIO_INPUT = "radio input",
  CHECKBOX_INPUT = "checkbox input",
  SELECTBOX_OPTION = "selectbox option",
  TEXTAREA_INPUT = "textarea input",
}

class FormStorage extends LocalStorage<FormStorageKey> {
  constructor() {
    super();
  }
  getRadioInput() {
    const value = this.get(FormStorageKey.RADIO_INPUT);
    return value ? value : "";
  }
  setRadioInput(input: string) {
    this.set(FormStorageKey.RADIO_INPUT, input);
  }
  clearRadioInput() {
    this.clearItem(FormStorageKey.RADIO_INPUT);
  }
  getCheckboxInput(): string[] {
    const value = this.get(FormStorageKey.CHECKBOX_INPUT);
    return value ? JSON.parse(value) : [];
  }
  setCheckboxInput(input: string[]) {
    this.set(FormStorageKey.CHECKBOX_INPUT, JSON.stringify(input));
  }
  clearCheckboxInput() {
    this.clearItem(FormStorageKey.CHECKBOX_INPUT);
  }
  getSelectBoxOption() {
    const value = this.get(FormStorageKey.SELECTBOX_OPTION);
    return value ? value : "";
  }
  setSelectBoxOption(select: string) {
    this.set(FormStorageKey.SELECTBOX_OPTION, select);
  }
  clearSelectBoxOption() {
    this.clearItem(FormStorageKey.SELECTBOX_OPTION);
  }
  getTextAreaInput() {
    const value = this.get(FormStorageKey.TEXTAREA_INPUT);
    return value ? value : "";
  }
  setTextAreaInput(input: string) {
    this.set(FormStorageKey.TEXTAREA_INPUT, input);
  }
  clearTextAreaInput() {
    this.clearItem(FormStorageKey.TEXTAREA_INPUT);
  }
  getAllForm() {
    const result = {
      [FormStorageKey.RADIO_INPUT]: this.getRadioInput(),
      [FormStorageKey.CHECKBOX_INPUT]: this.getCheckboxInput(),
      [FormStorageKey.SELECTBOX_OPTION]: this.getSelectBoxOption(),
      [FormStorageKey.TEXTAREA_INPUT]: this.getTextAreaInput(),
    };
    return JSON.stringify(result);
  }
  allClear() {
    this.clearAllItem([
      FormStorageKey.CHECKBOX_INPUT,
      FormStorageKey.RADIO_INPUT,
      FormStorageKey.SELECTBOX_OPTION,
      FormStorageKey.TEXTAREA_INPUT,
    ]);
  }
}

export default new FormStorage();
