import { useSelector } from "react-redux";

import styles from "./ProductHeader.module.css";

function ProductHeader() {
  const category = useSelector(
    (state) => state.search.category.categoryKeywords
  );

  return (
    <h3 className={styles.header}>
      {category.length !== 0 ? `${category.join(", ")} for you!` : ""}
    </h3>
  );
}

export default ProductHeader;
