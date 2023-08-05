import styles from "./DropdownBtn.module.css";

function DropdownBtn({
  text = "Option",
  svgLink = "/sprite.svg#chevron",
  className = "",
}) {
  return (
    <div className={`${styles.layout} ${className}`}>
      <p>{text}</p>
      <svg height="100%" width="100%">
        <use href={svgLink} />
      </svg>
    </div>
  );
}

export default DropdownBtn;
