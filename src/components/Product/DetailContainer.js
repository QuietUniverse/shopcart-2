import styles from "./DetailContainer.module.css";

function DetailContainer({ children }) {
  return <div className={styles.grid}>{children}</div>;
}

export default DetailContainer;
