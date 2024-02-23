import { useEffect } from "@/lib/dom";
import * as router from "@/lib/router";

const HomePage = () => {
  useEffect(() => {
    router.replace("/servey/first");
  }, []);

  return <div></div>;
};

export default HomePage;
