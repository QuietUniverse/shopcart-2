import { useSelector } from "react-redux";

import DropdownBtn from "../UI/DropdownBtn";

import styles from "./Filters.module.css";

function Filters() {
  const category = useSelector(
    (state) => state.search.category.categoryKeywords
  );

  return (
    <div className={styles.layout}>
      <div className={styles.filter}>
        <DropdownBtn text={`${category[0]} Type`} className={styles.alt} />
      </div>
      <div className={styles.filter}>
        <DropdownBtn text={"Price"} className={styles.alt} />
      </div>
      <div className={styles.filter}>
        <DropdownBtn text={"Review"} className={styles.alt} />
      </div>
      <div className={styles.filter}>
        <DropdownBtn text={"Color"} className={styles.alt} />
      </div>
      <div className={styles.filter}>
        <DropdownBtn text={"Material"} className={styles.alt} />
      </div>
      <div className={styles.filter}>
        <DropdownBtn text={"Offer"} className={styles.alt} />
      </div>
      <div className={styles.filter}>
        <DropdownBtn
          text={"All Filters"}
          svgLink="sprite.svg#filter"
          className={styles.alt}
        />
      </div>
      <div className={styles.sort}>
        <DropdownBtn text={"Sort by"} className={styles.alt} />
      </div>
    </div>
  );
}

export default Filters;
