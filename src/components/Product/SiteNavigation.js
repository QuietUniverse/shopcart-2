import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./SiteNavigation.module.css";

function SiteNavigation({ searchType = "Home" }) {
  const product = useSelector((state) => state.search.selectedProduct);

  return (
    <ul className={styles.layout}>
      <li key={searchType}>
        <Link to="/">{searchType}</Link>
      </li>
      <span className={styles.divider}>/</span>
      <li key={crypto.randomUUID()} className={styles.end}>
        <Link to={`/product/id=${product.sku}`}>{product.previewName}</Link>
      </li>
    </ul>
  );
}

export default SiteNavigation;
