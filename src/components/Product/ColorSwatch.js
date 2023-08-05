import { useEffect, useState } from "react";
import ColorThief from "colorthief";

import styles from "./ColorSwatch.module.css";

function ColorSwatch({ imageURL, isActive }) {
  const [swatch, setSwatch] = useState(undefined);

  useEffect(
    function () {
      async function grabPalette() {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        const colorThief = new ColorThief();

        const googleProxyURL =
          "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";
        img.src = googleProxyURL + encodeURIComponent(imageURL);

        img.addEventListener("load", async function () {
          const palette = await colorThief.getPalette(img, 2);
          setSwatch(palette);
        });
      }
      grabPalette();
    },
    [imageURL]
  );

  return (
    swatch &&
    (isActive ? (
      <div className={styles[`palette--active`]}>
        <div className={styles.palette}>
          <div className={`${styles.layout} ${styles.primary}`}>
            <svg
              height="100%"
              width="100%"
              style={{ fill: `rgb(${swatch[0]})` }}
            >
              <use href="/sprite.svg#color-top" />
            </svg>
          </div>
          <div className={styles.layout}>
            <svg
              height="100%"
              width="100%"
              style={{ fill: `rgb(${swatch[1]})` }}
            >
              <use href="/sprite.svg#color-bottom" />
            </svg>
          </div>
        </div>
      </div>
    ) : (
      <div className={styles.palette}>
        <div className={`${styles.layout} ${styles.primary}`}>
          <svg height="100%" width="100%" style={{ fill: `rgb(${swatch[0]})` }}>
            <use href="/sprite.svg#color-top" />
          </svg>
        </div>
        <div className={styles.layout}>
          <svg height="100%" width="100%" style={{ fill: `rgb(${swatch[1]})` }}>
            <use href="/sprite.svg#color-bottom" />
          </svg>
        </div>
      </div>
    ))
  );
}

export default ColorSwatch;
