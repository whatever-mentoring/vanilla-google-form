import { useEffect } from "@/lib/dom";
import { history } from "@/lib/router";

const HomePage = () => {
  useEffect(() => {
    history.push("/servey/first");
  }, []);
  return null;
};

export default HomePage;
