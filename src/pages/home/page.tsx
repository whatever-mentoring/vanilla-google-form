import { useEffect, useState } from "@/lib/dom";
// import * as router from "@/lib/router";

const HomePage = () => {
  const [id, setId] = useState(0);
  const [item, setItem] = useState([
    { age: 18, name: "순민" },
    { age: 18, name: "나" },
  ]);
  const [str, setStr] = useState<string>("");
  useEffect(() => {
    console.log("render-1");
    setItem([
      { age: 18, name: "안녕" },
      { age: 18, name: "gkdl" },
    ]);
  }, [item]);
  useEffect(() => {
    console.log("render-2");
  }, []);

  const handleClick = () => {
    setId(id + 1);
    // setStr("test");
  };

  return (
    <div>
      {id}
      {str}
      {item[0].name}
      <button onclick={handleClick}>버튼</button>
    </div>
  );
};

export default HomePage;
