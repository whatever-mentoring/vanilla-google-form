import Card from "@/components/Card";
import styles from "./ServeyTitle.module.css";

const ServeyTitle = () => {
  return (
    <Card>
      <div className={styles.borderTop} />
      <h2 className={styles.title}>Survey</h2>
      <hr className={styles.hr} />
      <div className={styles.emphasize}>* 표시는 필수 질문임</div>
    </Card>
  );
};

export default ServeyTitle;
