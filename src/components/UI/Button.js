import styles from "./Button.module.css";

function Button({
  text = "Action here",
  className = "",
  onClick = function () {},
}) {
  return (
    <button
      type="button"
      className={`${styles.btn} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
