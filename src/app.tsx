import { useEffect, useState } from "./lib/dom";

const App = () => {
  const [list, setList] = useState<string[]>(["안녕"]);
  const [value, setValue] = useState("");

  useEffect(() => {
    console.log("changed list");
  }, [list]);

  useEffect(() => {
    console.log("changed value");
  }, [value]);

  useEffect(() => {
    console.log("start!!!");
  }, []);

  function addItem() {
    setList([...list, value]);
    setValue("");
  }

  const removeItem = (index: number) => {
    setList(list.filter((item, i) => i !== index));
  };

  const handleInput = (e: InputEvent) => {
    const { value } = e.target as any;
    setValue(value);
  };

  return (
    <ul>
      <input type="text" oninput={handleInput} value={value} />
      <button onclick={() => addItem()}>추가</button>
      {list.map((item, index) => (
        <li>
          {`${item}-${index}`}
          {"  "}
          <button onclick={() => removeItem(index)}>삭제</button>
        </li>
      ))}
    </ul>
  );
};

export default App;
