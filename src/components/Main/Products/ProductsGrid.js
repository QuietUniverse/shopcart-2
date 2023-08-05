import styles from "./ProductsGrid.module.css";

function ProductsGrid({ children }) {
  return <div className={styles.grid}>{children}</div>;
}

export default ProductsGrid;
