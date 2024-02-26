import { useEffect, useState } from "@/lib/dom";
import { history } from "@/lib/router";

const HomePage = () => {
  // useEffect(() => {
  //   history.push("/servey/first");
  // }, []);

  // return <div></div>;
  const [str, setStr] = useState();

  const handleClick = () => {
    setStr("dmddo");
  };

  return (
    <div>
      <button type="button" onclick={handleClick}>
        버튼
      </button>
      {str}
      <div>요 사이는 어떻게 될까요</div>
    </div>
  );
};

export default HomePage;
