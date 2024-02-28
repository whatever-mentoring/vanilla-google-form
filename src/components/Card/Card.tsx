import styles from "./Card.module.css";

interface Props {
  children?: string;
  isError?: boolean;
}

const Card = ({ children, isError = false }: Props) => {
  return (
    <div className={`${styles.cardContainer} ${isError ? styles.error : ""}`}>
      {children}
    </div>
  );
};

export default Card;
