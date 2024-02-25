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
    return this.get(FormStorageKey.RADIO_INPUT);
  }
  setRadioInput(input: string) {
    this.set(FormStorageKey.RADIO_INPUT, input);
  }
  getCheckboxInput(): string[] {
    const value = this.get(FormStorageKey.CHECKBOX_INPUT);
    return value ? JSON.parse(value) : [];
  }
  setCheckboxInput(input: string[]) {
    this.set(FormStorageKey.CHECKBOX_INPUT, JSON.stringify(input));
  }
  getSelectBoxOption() {
    return this.get(FormStorageKey.SELECTBOX_OPTION);
  }
  getTextAreaInput() {
    return this.get(FormStorageKey.TEXTAREA_INPUT);
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
