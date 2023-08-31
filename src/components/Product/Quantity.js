import { useDispatch } from "react-redux";

import { cartActions } from "../../store/slice/cart";

import styles from "./ProductInfo.module.css";

function Quantity({ stock, className, currentQuantity, sku }) {
  const dispatch = useDispatch();

  function handleReduceQuantity() {
    if (currentQuantity - 1 < 1) return;
    dispatch(cartActions.setQuantityCount(sku, --currentQuantity));
  }

  function handleIncreaseQuantity() {
    if (currentQuantity + 1 > stock) return;
    dispatch(cartActions.setQuantityCount(sku, ++currentQuantity));
  }

  return (
    <div className={`${styles.quantity} ${className}`}>
      <button
        type="button"
        className={styles[`quantity-btn`]}
        onClick={handleReduceQuantity}
      >
        <svg height="100%" width="100%">
          <use href="/sprite.svg#minus" />
        </svg>
      </button>
      <span>{currentQuantity}</span>
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
