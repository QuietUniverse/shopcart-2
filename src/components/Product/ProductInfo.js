import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/slice/cart";

import StarRating from "../UI/StarRating";
import ColorSwatch from "./ColorSwatch";
import Button from "./../UI/Button";
import Cart from "./Cart";
import Checkout from "./Checkout";

import styles from "./ProductInfo.module.css";

function ProductInfo() {
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [checkoutIsOpen, setCheckoutIsOpen] = useState(false);
  const product = useSelector((state) => state.search.selectedProduct);
  const allVariants = useSelector((state) => state.search.productVariants);

  const dispatch = useDispatch();

  const EMI = useMemo(
    () => product.price / 6 + product.price * 0.6 * 0.15,
    [product.price]
  );

  function addToCart() {
    setCheckoutIsOpen(false);
    setCartIsOpen(true);
    dispatch(cartActions.addItemToCart(product));
  }

  return (
    <div className={styles.layout}>
      <h3 className={styles.name}>{product.name}</h3>
      <p className={styles.description}>{product.longDescription}</p>

      <div className={styles.rating}>
        <StarRating rating={product.rating.average} className={styles.stars} />
        <span>({product.rating.count})</span>
      </div>
      <div className={styles[`price-info`]}>
        <span className={styles.price}>
          ${product.price} or {EMI.toFixed(2)}/month
        </span>
        <p>Suggested payments with 6 months special financing</p>
      </div>

      <div className={styles.color}>
        <h4>Choose a color</h4>
        <div className={styles.palette}>
          {allVariants.map((variant) => (
            <ColorSwatch
              key={variant.sku}
              imageURL={variant.imageURL}
              isActive={variant.isActive}
            />
          ))}
        </div>
      </div>

      <div className={styles.quantity__container}>
        <div className={styles.quantity__main}>
          <div className={styles.stock}>
            <p>
              Only
              <span className={styles[`stock-highlight`]}>
                {` ${product.stock} items `}
              </span>
              Left!
            </p>
            <span style={{ fontSize: "1.2rem" }}>Don't miss it</span>
          </div>
        </div>
        <div className={styles.quantity__cta}>
          <Button text="Buy now" className={styles[`quantity__btn-primary`]} />
          <Button
            text="Add to cart"
            className={styles[`quantity__btn-secondary`]}
            onClick={addToCart}
          />
          {cartIsOpen && (
            <Cart
              setCartIsOpen={setCartIsOpen}
              setCheckoutIsOpen={setCheckoutIsOpen}
            />
          )}
          {checkoutIsOpen && <Checkout setCheckoutIsOpen={setCheckoutIsOpen} />}
        </div>
      </div>

      <div className={styles.delivery}>
        <div className={styles.delivery__layout}>
          <svg height="100%" width="100%">
            <use href="/sprite.svg#truck" />
          </svg>
          <div className={styles.delivery__text}>
            <span className={styles.delivery__header}>Free delivery</span>
            <p
              className={`${styles.delivery__description} ${styles.underline}`}
            >
              Enter your postal code for delivery availability
            </p>
          </div>
        </div>
        <div className={`${styles.delivery__layout} ${styles[`border-top`]}`}>
          <svg height="100%" width="100%">
            <use href="/sprite.svg#calendar" />
          </svg>
          <div className={styles.delivery__text}>
            <span className={styles.delivery__header}>Return delivery</span>
            <p className={styles.delivery__description}>
              {`Free 30 days Delivery Returns. `}
              <span className={styles.underline}>Details</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
