import BaseLayout from "@/pages/layouts/BaseLayout";
import styles from "./complete.module.css";
import Card from "@/components/Card/Card";
import { useEffect, useState } from "@/lib/dom";
import FormRepository from "@/repository/FormRepository";
import { history } from "@/lib/router";
const CompletePage = () => {
  const [result, setResult] = useState("");
  useEffect(() => {
    setResult(FormRepository.getAllForm());
  }, []);
  const goFirstPage = () => {
    FormRepository.allClear();
    history.push("/servey/first");
  };
  return (
    <BaseLayout>
      <Card>
        <div className={styles.borderTop} />
        <h2 className={styles.title}>Survey</h2>
        <div>응답이 기록되었습니다.</div>
        <div className={styles.result}>
          <p>{result}</p>
        </div>
        <div onclick={goFirstPage} className={styles.link}>
          처음으로
        </div>
      </Card>
    </BaseLayout>
  );
};

export default CompletePage;
