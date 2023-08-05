import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import useHttp from "../../hooks/use-http";
import { searchActions } from "../../store/slice/search";
import { bestBuyAPIKey } from "../../utils/helper";

import styles from "./ImageVariants.module.css";

function ImageVariants() {
  const product = useSelector((state) => state.search.selectedProduct);
  const variants = useSelector((state) => state.search.productVariants);

  const { error, sendRequest: fetchVariant } = useHttp();
  const dispatch = useDispatch();

  const fetchOneVariant = useCallback(
    function (variantSKU, timeout = undefined) {
      fetchVariant(
        {
          url: `https://api.bestbuy.com/v1/products(sku=${variantSKU})?apiKey=${bestBuyAPIKey}&pageSize=1&format=json`,
        },
        (data) => {
          dispatch(searchActions.setSelectedProductVariant({ data }));
          if (timeout) clearTimeout(timeout);
        }
      );
    },
    [dispatch, fetchVariant]
  );

  useEffect(
    function () {
      if (product.variants.length === 0) return;

      let count = 0;
      const interval = setInterval(function () {
        fetchOneVariant(product.variants[count]);
        count++;
        if (count === product.variants.length) {
          clearTimeout(interval);
        }
      }, 500);

      return () => clearInterval(interval);
    },
    [fetchVariant, product.variants, dispatch, fetchOneVariant]
  );

  return (
    <div className={styles.layout}>
      {variants.length > 0 &&
        variants
          .filter((variant) => !variant.isActive)
          .map((variant) => {
            return <Variant key={variant.sku} variant={variant} />;
          })}
    </div>
  );
}

export default ImageVariants;

function Variant({ variant }) {
  return (
    <div className={styles.img}>
      <img src={variant.imageURL} alt={variant.name} />
    </div>
  );
}
