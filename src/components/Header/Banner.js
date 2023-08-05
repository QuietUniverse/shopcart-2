import DropdownBtn from "../UI/DropdownBtn";

import styles from "./Banner.module.css";

function Banner() {
  return (
    <div className={styles.banner}>
      <div className={styles.phone}>
        <svg height="100%" width="100%">
          <use href="sprite.svg#phone" />
        </svg>
        <a href="tel:1234567890">+001234567890</a>
      </div>
      <p>
        Get 50% Off on Selected Items&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Shop
        Now
      </p>
      <div className={styles.locale}>
        <DropdownBtn text="Eng" className={styles.dropdown} />
        <DropdownBtn text="Location" className={styles.dropdown} />
      </div>
    </div>
  );
}

export default Banner;
