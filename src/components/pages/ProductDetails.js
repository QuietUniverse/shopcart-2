import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../hooks/use-http";
import { searchActions } from "../../store/slice/search";

import DetailContainer from "../Product/DetailContainer";
import ImageLarge from "../Product/ImageLarge";
import ImageVariants from "../Product/ImageVariants";
import ProductInfo from "../Product/ProductInfo";
import SiteNavigation from "../Product/SiteNavigation";

import styles from "./ProductDetails.module.css";
import Loader from "../UI/Loader";

function ProductDetails() {
  const [showPage, setShowPage] = useState(false);

  const params = useParams().id.split("=")[1];
  const { error, sendRequest: fetchProduct } = useHttp();
  const dispatch = useDispatch();

  const selectedProduct = useSelector((state) => state.search.selectedProduct);
  const isLoading = useSelector((state) => state.search.isLoading);

  const handleDispatch = useCallback(
    function (data) {
      dispatch(searchActions.setProductViaLink({ data }));
      dispatch(searchActions.setPrimaryProductAmongstVariants());
      setShowPage(true);
    },
    [dispatch]
  );

  useEffect(
    function () {
      if (!selectedProduct) {
        fetchProduct(
          {
            url: `https://api.bestbuy.com/v1/products(sku=${params})?apiKey=${process.env.REACT_APP_BESTBUY_API_KEY}&pageSize=1&format=json`,
          },
          handleDispatch
        );
      } else {
        dispatch(searchActions.setPrimaryProductAmongstVariants());
        setShowPage(true);
      }
    },
    [selectedProduct, fetchProduct, params, handleDispatch, dispatch]
  );

  return (
    <div className={styles.product}>
      {isLoading && <Loader />}
      {showPage && (
        <>
          <SiteNavigation />
          <DetailContainer>
            <ImageLarge />
            <ImageVariants />
            <ProductInfo />
          </DetailContainer>
        </>
      )}
    </div>
  );
}

export default ProductDetails;
