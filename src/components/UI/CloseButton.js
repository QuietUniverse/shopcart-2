import styles from "./CloseButton.module.css";

function CloseButton({ onClick }) {
  return (
    <div role="button" className={styles.close} onClick={onClick}>
      &times;
    </div>
  );
}

export default CloseButton;
