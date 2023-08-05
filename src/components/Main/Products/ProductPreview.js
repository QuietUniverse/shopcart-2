import { searchActions } from "../../../store/slice/search";
import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import StarRating from "../../UI/StarRating";
import Button from "./../../UI/Button";

import styles from "./ProductPreview.module.css";

function ProductPreview({ product }) {
  const wholeNumber = useMemo(
    () => product.price.toString().split(".")[0],
    [product.price]
  );
  const fraction = useMemo(
    () => product.price.toString().split(".")[1] || "00",
    [product.price]
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleProductSelection() {
    dispatch(searchActions.setSelectedProduct({ product }));
    navigate(`/product/id=${product.sku}`);
  }

  return (
    <li className={styles.layout}>
      <div className={styles.img}>
        <img src={product.imageURL} alt={product.name} />
      </div>
      <div className={styles.header}>
        <p>{product.previewName}</p>
        <span>
          <sup>$</sup>
          {wholeNumber}
          <sup>.{fraction}</sup>
        </span>
      </div>

      <div className={styles.description}>
        <p>{product.shortDescription}</p>
      </div>

      <div className={styles.rating}>
        <StarRating rating={product.rating.average} className={styles.stars} />
        <span>({product.rating.count})</span>
      </div>

      <Button
        text="Add to Cart"
        className={styles.btn}
        onClick={handleProductSelection}
      />
    </li>
  );
}

export default ProductPreview;
