import Banner from "./Banner";
import Nav from "./Nav";

import styles from "./Header.module.css";

function Header({ showBanner }) {
  return (
    <header className={styles.header}>
      {showBanner && <Banner />}
      <Nav />
    </header>
  );
}

export default Header;
