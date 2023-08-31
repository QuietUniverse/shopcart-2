import styles from "./Button.module.css";

function Button({
  text = "Action here",
  className = "",
  onClick = function () {},
  type = "button",
}) {
  return (
    <button
      type={type}
      className={`${styles.btn} ${className}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
