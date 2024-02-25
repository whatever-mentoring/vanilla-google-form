import BaseLayout from "@/pages/layouts/BaseLayout";
import styles from "./complete.module.css";
import Card from "@/components/Card/Card";
import { useEffect, useState } from "@/lib/dom";
import FormRepository from "@/repository/FormRepository";
const CompletePage = () => {
  const [result, setResult] = useState("");
  useEffect(() => {
    setResult(FormRepository.getAllForm());
  }, []);
  return (
    <BaseLayout>
      <Card>
        <div className={styles.borderTop} />
        <h2 className={styles.title}>Survey</h2>
        <div>응답이 기록되었습니다.</div>
        <div className={styles.result}>
          <p>{result}</p>
        </div>
        <a data-link href="/servey/first" className={styles.link}>
          처음으로
        </a>
      </Card>
    </BaseLayout>
  );
};

export default CompletePage;
