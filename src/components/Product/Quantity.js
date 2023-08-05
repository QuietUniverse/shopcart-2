import { useState } from "react";

import styles from "./ProductInfo.module.css";

function Quantity({ stock }) {
  const [quantity, setQuantity] = useState(1);

  function handleReduceQuantity() {
    setQuantity((prev) => (prev > 1 ? --prev : 1));
  }

  function handleIncreaseQuantity() {
    setQuantity((prev) => (prev < stock ? ++prev : stock));
  }

  return (
    <div className={styles.quantity}>
      <button
        type="button"
        className={styles[`quantity-btn`]}
        onClick={handleReduceQuantity}
      >
        <svg height="100%" width="100%">
          <use href="/sprite.svg#minus" />
        </svg>
      </button>
      <span>{quantity}</span>
      <button
        type="button"
        className={styles[`quantity-btn`]}
        onClick={handleIncreaseQuantity}
      >
        <svg height="100%" width="100%">
          <use href="/sprite.svg#plus" />
        </svg>
      </button>
    </div>
  );
}

export default Quantity;
