import { useSelector } from "react-redux";

import PromotionBanner from "../Main/PromotionBanner";
import Filters from "../Main/Filters";
import Products from "../Main/Products/Products";
import Loader from "../UI/Loader";

import styles from "./Main.module.css";

function Main() {
  const category = useSelector(
    (state) => state.search.category.categoryKeywords
  );

  const isLoading = useSelector((state) => state.search.isLoading);

  return (
    <main className={styles.main}>
      {category.length > 0 && <PromotionBanner />}
      {isLoading && <Loader />}
      {!isLoading && (
        <>
          {category.length > 0 && <Filters />}
          <Products />
        </>
      )}
    </main>
  );
}

export default Main;
