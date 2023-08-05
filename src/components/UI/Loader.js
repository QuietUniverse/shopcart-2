import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.container}>
      <div className={styles.layout}>
        <div className={styles.loader}></div>
        <div className={`${styles.loader} ${styles[`loader--medium`]}`}></div>
      </div>
    </div>
  );
}

export default Loader;
