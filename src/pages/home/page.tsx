import { useEffect } from "@/lib/dom";
import { history } from "@/lib/router";

const HomePage = () => {
  useEffect(() => {
    console.log("router~");
    history.push("/servey/first");
  }, []);

  return <div></div>;
};

export default HomePage;
