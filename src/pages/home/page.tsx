import { useEffect, useState } from "@/lib/dom";
// import * as router from "@/lib/router";

const HomePage = () => {
  const [id, setId] = useState(0);
  const [str, setStr] = useState<string>("");
  useEffect(() => {
    if (id > 5) {
      return;
    }
    setId(5);
  }, [id]);

  useEffect(() => {
    console.log("가나다라마바사");
  }, [str]);

  const handleClick = () => {
    setId(id + 1);
    setStr("test");
  };

  return (
    <div>
      {id}
      {str}
      <button onclick={handleClick}>버튼</button>
    </div>
  );
};

export default HomePage;
