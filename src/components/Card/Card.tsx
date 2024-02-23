import styles from "./Card.module.css";

interface Props {
  children?: string;
}

const Card = ({ children }: Props) => {
  return <div className={styles.cardContainer}>{children}</div>;
};

export default Card;
