import { useSelector } from "react-redux";

import ProductHeader from "./ProductHeader";
import ProductPreview from "./ProductPreview";
import ProductsGrid from "./ProductsGrid";
import Loader from "../../UI/Loader";

import styles from ".//Products.module.css";

function Products() {
  const products = useSelector((state) => state.search.products);
  const isLoading = useSelector((state) => state.search.isLoading);

  return (
    <div className={styles.layout}>
      <ProductHeader />
      {isLoading && <Loader />}
      <ul>
        {!isLoading && (
          <ProductsGrid>
            {products.map((product) => (
              <ProductPreview key={product.sku} product={product} />
            ))}
          </ProductsGrid>
        )}
      </ul>
    </div>
  );
}

export default Products;
