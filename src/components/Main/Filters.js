import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { searchActions } from "../../store/slice/search";

import DropdownBtn from "../UI/DropdownBtn";

import styles from "./Filters.module.css";
import FilterWindow from "./FilterWindow";

function Filters() {
  const { filters, type } = useSelector((store) => store.search.activeFilters);
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");

  return (
    <>
      <div className={styles.layout}>
        {type &&
          filters.map((filter) => (
            <div className={styles.filter} key={filter.value}>
              <span className={styles.alt}>{filter.name}</span>
            </div>
          ))}

        <div
          className={`${styles.sort} ${showFilterOptions ? styles.open : ""}`}
          onClick={() => setShowFilterOptions((prev) => !prev)}
        >
          <DropdownBtn text={"Sort by"} className={styles.alt} />
        </div>
        {showFilterOptions && (
          <DropDownList
            setSelectedFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
            setShowFilterOptions={setShowFilterOptions}
          />
        )}
      </div>
      {selectedFilter && (
        <div className={styles.windowLayout}>
          <FilterWindow
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            setShowFilterOptions={setShowFilterOptions}
          />
        </div>
      )}
    </>
  );
}

function DropDownList({
  setSelectedFilter,
  selectedFilter,
  setShowFilterOptions,
}) {
  const { type } = useSelector((store) => store.search.activeFilters);

  const dispatch = useDispatch();

  function updateUI(e) {
    setSelectedFilter(e.target.value);
    setShowFilterOptions(true);
    dispatch(searchActions.resetFilterType());
  }

  return (
    <ul className={styles.list} onClick={updateUI}>
      <option
        value="category"
        className={
          selectedFilter === "category" || type === "category"
            ? styles.active
            : ""
        }
      >
        Category
      </option>
      <option
        value="price"
        className={
          selectedFilter === "price" || type === "price" ? styles.active : ""
        }
      >
        Price
      </option>
      <option
        value="ratings"
        className={
          selectedFilter === "ratings" || type === "ratings"
            ? styles.active
            : ""
        }
      >
        Ratings
      </option>
    </ul>
  );
}

export default Filters;
