import styles from "./BaseLayout.module.css";
interface BaseLayoutProps {
  children?: string;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return <div className={styles.container}>{children}</div>;
};

export default BaseLayout;
