import { getPageParams } from "@/lib/router";

const AboutPage = () => {
  const params = getPageParams();
  return (
    <div>
      {`어바웃페이지 ${params}`}
      <a data-link href="/">
        Home으로
      </a>
    </div>
  );
};

export default AboutPage;
