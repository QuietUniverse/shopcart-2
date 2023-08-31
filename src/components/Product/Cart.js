import { useDispatch, useSelector } from "react-redux";

import Button from "../UI/Button";
import CloseButton from "./../UI/CloseButton";
import Quantity from "./Quantity";

import styles from "./Cart.module.css";
import { cartActions } from "../../store/slice/cart";

function Cart({ setCartIsOpen, setCheckoutIsOpen }) {
  return (
    <CartWindow
      setCartIsOpen={setCartIsOpen}
      setCheckoutIsOpen={setCheckoutIsOpen}
    />
  );
}

function CartWindow({ setCartIsOpen, setCheckoutIsOpen }) {
  const { items } = useSelector((store) => store.cart);

  return (
    <div className={styles.layout}>
      <div className={styles.window}>
        <div className={`${styles.row} ${styles.pb}`}>
          <div className={styles.header}>
            <svg className={styles[`cart-icon`]}>
              <use href="/sprite.svg#cart" />
            </svg>
            <h3 className={styles.heading}>Your Cart</h3>
          </div>
          <CloseButton onClick={() => setCartIsOpen(false)} />
        </div>
        <ProductList />
        {items.length > 0 && (
          <CartFooter
            setCartIsOpen={setCartIsOpen}
            setCheckoutIsOpen={setCheckoutIsOpen}
          />
        )}
      </div>
    </div>
  );
}

function ProductList() {
  const { items } = useSelector((store) => store.cart);

  return (
    <ul className={styles.list}>
      {items.length > 0 &&
        items.map((item) => <ProductItem item={item} key={item.sku} />)}
      {items.length === 0 && (
        <div className={styles[`cart-message`]}>
          <p>Your cart is empty. Add your favourite products today :)</p>
        </div>
      )}
    </ul>
  );
}

function ProductItem({ item }) {
  const dispatch = useDispatch();

  function handleDeleteItem() {
    dispatch(cartActions.deleteItemFromCart(item.sku));
  }

  return (
    <li className={styles.item}>
      <div className={styles.column}>
        <img src={item.imageURL} alt={item.name} className={styles.image} />
        <span className={styles.name}>{item.name}</span>
        <p className={styles.desc}>{item.shortDescription}</p>
      </div>
      <div className={styles.column}>
        <div className={styles.quantity}>
          <p>Quantity</p>
          <Quantity
            stock={item.quantity.stock}
            className={styles[`quantity__component`]}
            currentQuantity={item.quantity.count}
            sku={item.sku}
          />
        </div>
        <span className={styles.price}>${item.price}</span>
        <Button
          text="Remove product"
          className={styles.delete}
          onClick={handleDeleteItem}
        />
      </div>
    </li>
  );
}

function CartFooter({ setCartIsOpen, setCheckoutIsOpen }) {
  const { total } = useSelector((store) => store.cart);

  function switchToCheckout() {
    setCheckoutIsOpen(true);
    setCartIsOpen(false);
  }

  return (
    <div className={styles.checkout}>
      <div className={styles.row}>
        <p className={styles.heading}>Total</p>
        <span className={styles[`total-price`]}>${total.toFixed(2)}</span>
      </div>
      <Button
        text="Proceed to checkout&nbsp;&nbsp;&#8702;"
        className={styles[`checkout-btn`]}
        onClick={switchToCheckout}
      />
    </div>
  );
}

export default Cart;
