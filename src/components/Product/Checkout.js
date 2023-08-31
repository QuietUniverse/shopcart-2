import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/slice/cart";
import { useState } from "react";

import CloseButton from "../UI/CloseButton";
import Button from "../UI/Button";

import styles from "./Checkout.module.css";
import styles2 from "./Cart.module.css";

function Checkout({ setCheckoutIsOpen }) {
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);

  return (
    <div className={styles2.layout}>
      {!checkoutCompleted && (
        <CheckoutWindow
          setCheckoutIsOpen={setCheckoutIsOpen}
          setCheckoutCompleted={setCheckoutCompleted}
        />
      )}
      {checkoutCompleted && (
        <Message
          setCheckoutIsOpen={setCheckoutIsOpen}
          setCheckoutCompleted={setCheckoutCompleted}
        />
      )}
    </div>
  );
}

function Message({ setCheckoutIsOpen, setCheckoutCompleted }) {
  function closeCheckout() {
    setCheckoutCompleted(false);
    setCheckoutIsOpen(false);
  }

  return (
    <div className={`${styles2.window} ${styles.column}`}>
      <p className={styles[`cart-message`]}>Order placed successfully! ✅</p>
      <Button
        className={styles[`place-order`]}
        text="Continue Shopping"
        onClick={closeCheckout}
      />
    </div>
  );
}

function CheckoutWindow({ setCheckoutIsOpen, setCheckoutCompleted }) {
  const { total } = useSelector((store) => store.cart);

  return (
    <div className={`${styles2.window} ${styles.window}`}>
      <div className={`${styles2.row} ${styles2.pb}`}>
        <h3 className={styles2.heading}>Check Out</h3>
        <CloseButton onClick={() => setCheckoutIsOpen(false)} />
      </div>
      <div className={styles.total}>
        <p className={styles[`order-total`]}>Order Total </p>
        <span className={styles2[`total-price`]}>${total.toFixed(2)}</span>
      </div>
      <CheckoutForm setCheckoutCompleted={setCheckoutCompleted} />
    </div>
  );
}

function CheckoutForm({ setCheckoutCompleted }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !email || !contact || !address || !paymentMethod) return;

    dispatch(cartActions.emptyCart());
    setCheckoutCompleted(true);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <p className={styles.delivery}>Delivery Details</p>
      <div className={`${styles.row} ${styles[`input-container`]}`}>
        <label htmlFor="name" className={styles.label}>
          Your Full Name
        </label>
        <input
          id="name"
          type="text"
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className={`${styles.row} ${styles[`input-container`]}`}>
        <label htmlFor="email" className={styles.label}>
          Your E-Mail ID
        </label>
        <input
          id="email"
          type="email"
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={`${styles.row} ${styles[`input-container`]}`}>
        <label htmlFor="contact" className={styles.label}>
          Your Contact No.
        </label>
        <input
          id="contact"
          type="tel"
          pattern="+[0-9]{2}-[0-9]{10}"
          placeholder="eg. +91-1234567890"
          className={styles.input}
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
      </div>
      <div className={`${styles.row} ${styles[`input-container`]}`}>
        <label htmlFor="address" className={styles.label}>
          Your Shipping Address
        </label>
        <textarea
          id="address"
          className={styles.input}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className={`${styles.row} ${styles[`input-container`]}`}>
        <label htmlFor="payment" className={styles.label}>
          Your Payment Method
        </label>
        <select
          className={styles.input}
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option defaultChecked>Select Option</option>
          <option value="netbanking">Net Banking</option>
          <option value="gpay">Google Pay (GPay)</option>
          <option value="cod">Cash on delivery (COD)</option>
        </select>
      </div>
      <Button
        type="submit"
        className={styles[`place-order`]}
        text="Place Order"
      />
    </form>
  );
}

export default Checkout;
