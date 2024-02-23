import { useEffect, useState } from "@/lib/dom";

const HomePage = () => {
  const [list, setList] = useState<string[]>([
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
  ]);
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

  const removeSixItem = () => {
    console.log(list.filter((item, i) => i !== 0));
    setList(list.filter((item, i) => i === 0));
  };

  return (
    <div>
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
      <button onclick={removeSixItem}>6개 삭제</button>
      <a data-link href="/about/20">
        어바웃페이지
      </a>
    </div>
  );
};

export default HomePage;
