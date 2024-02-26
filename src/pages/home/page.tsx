import { useEffect, useState } from "@/lib/dom";
import * as router from "@/lib/router";

const HomePage = () => {

  useEffect(() => {
    console.log("router~");
    router.push("/servey/first");
  }, []);

  return <div></div>;
};

export default HomePage;
