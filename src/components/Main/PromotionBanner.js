import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useHttp from "../../hooks/use-http";
import { pixabayAPIKey } from "../../utils/helper";

import Button from "../UI/Button";

import styles from "./PromotionBanner.module.css";

function PromotionBanner() {
  const [imageURL, setImageURL] = useState(null);
  const categoryQuery = useSelector(
    (state) => state.search.category.promotionQuery
  );
  const category = useSelector(
    (state) => state.search.category.categoryKeywords
  );

  const {
    isLoading: imageIsLoading,
    error,
    sendRequest: fetchCategoryImage,
  } = useHttp();

  useEffect(
    function () {
      if (categoryQuery === "") return;

      fetchCategoryImage(
        {
          url: `https://pixabay.com/api/?key=${pixabayAPIKey}&q=${categoryQuery}&colors=transparent&safesearch=true&per_page=3`,
        },
        (data) => {
          setImageURL(data.hits[0].webformatURL);
        }
      );
    },
    [fetchCategoryImage, categoryQuery]
  );

  return (
    <div className={styles.discount}>
      <div className={styles.layout}>
        <h2>Grab upto 50% off on selected {category[0]}</h2>
      </div>
      <div className={`${styles.layout} ${styles[`btn-margin`]}`}>
        <Button text="Buy now" className={styles.btn} />
      </div>
      <div className={`${styles.layout} ${styles.img}`}>
        {imageURL && <img src={imageURL} alt={`${category[0]} sale promo`} />}
      </div>
    </div>
  );
}

export default PromotionBanner;
