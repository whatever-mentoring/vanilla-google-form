import { useEffect } from "@/lib/dom";
import { history } from "@/lib/router";

const HomePage = () => {
  useEffect(() => {
    history.replace("/servey/first");
  }, []);
  return null;
};

export default HomePage;
