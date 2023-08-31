import { Link } from "react-router-dom";
import { useState } from "react";

import Search from "./Search";
import Cart from "../Product/Cart";

import styles from "./Nav.module.css";

const showHamburger = window.innerWidth <= 900 ? true : false;

function Nav() {
  const [hamburgerIsOpen, setHamburgerIsOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);

  const navContent = !showHamburger ? (
    <>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img src="/logo.svg" alt="shopcart logo" />
          <h1>Shopcart</h1>
        </div>
        <ul className={styles[`nav-links`]}>
          <li className={styles[`nav-link`]}>
            <Link>Deals</Link>
          </li>
          <li className={styles[`nav-link`]}>
            <Link>What's new</Link>
          </li>
          <li className={styles[`nav-link`]}>
            <Link>Delivery</Link>
          </li>
        </ul>
        <div className={styles.user}>
          <Search />
          <div className={styles.settings}>
            <svg height="100%" width="100%">
              <use href="/sprite.svg#account" />
            </svg>
            <p>Account</p>
          </div>
          <div
            className={styles.settings}
            role="button"
            onClick={() => setCartIsOpen(true)}
          >
            <svg height="100%" width="100%">
              <use href="/sprite.svg#cart" />
            </svg>
            <p>Cart</p>
          </div>
        </div>
      </nav>
      {cartIsOpen && <Cart setCartIsOpen={setCartIsOpen} />}
    </>
  ) : (
    <>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <img src="/logo.svg" alt="shopcart logo" />
          <h1>Shopcart</h1>
        </div>
        <Search />
        <div
          className={styles.hamburger}
          role="button"
          onClick={() => setHamburgerIsOpen((prev) => !prev)}
        >
          <div
            className={`${styles[`hamburger-stroke`]} ${
              hamburgerIsOpen ? styles[`hamburger-close`] : ""
            }`}
          ></div>
        </div>
        <Hamburger
          hamburgerIsOpen={hamburgerIsOpen}
          setCartIsOpen={setCartIsOpen}
        />
      </nav>
      {cartIsOpen && <Cart setCartIsOpen={setCartIsOpen} />}
    </>
  );

  return navContent;
}

export default Nav;

function Hamburger({ hamburgerIsOpen, setCartIsOpen }) {
  return (
    <div
      className={`${styles[`hamburger__container`]} ${
        !hamburgerIsOpen ? styles[`hamburger__container--hidden`] : ""
      }`}
    >
      <ul className={styles[`nav-links`]}>
        <li className={styles[`nav-link`]}>
          <Link>Deals</Link>
        </li>
        <li className={styles[`nav-link`]}>
          <Link>What's new</Link>
        </li>
        <li className={styles[`nav-link`]}>
          <Link>Delivery</Link>
        </li>
        <div className={styles.settings}>
          <svg height="100%" width="100%">
            <use href="/sprite.svg#account" />
          </svg>
          <p>Account</p>
        </div>
        <div
          className={styles.settings}
          role="button"
          onClick={() => setCartIsOpen(true)}
        >
          <svg height="100%" width="100%">
            <use href="/sprite.svg#cart" />
          </svg>
          <p>Cart</p>
        </div>
      </ul>
    </div>
  );
}
