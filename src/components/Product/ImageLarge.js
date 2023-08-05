import { useSelector } from "react-redux";

import styles from "./ImageLarge.module.css";

function ImageLarge() {
  const product = useSelector((state) => state.search.selectedProduct);

  return (
    <div className={styles.layout}>
      <img src={product.imageURL} alt={product.name} />
    </div>
  );
}

export default ImageLarge;
