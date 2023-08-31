import useHttp from "../../hooks/use-http";
import { searchActions } from "../../store/slice/search";
import { useDispatch, useSelector } from "react-redux";
import { bestBuyAPIKey, mergeSort } from "../../utils/helper";

import Button from "../UI/Button";
import CloseButton from "../UI/CloseButton";

import styles from "./FilterWindow.module.css";

function FilterWindow({
  selectedFilter,
  setSelectedFilter,
  setShowFilterOptions,
}) {
  const { query } = useSelector((store) => store.search);
  const { products } = useSelector((store) => store.search);
  const { filters } = useSelector((store) => store.search.activeFilters);

  const { error: searchError, sendRequest: fetchSearchResults } = useHttp();
  const dispatch = useDispatch();

  function displaySearchResults(data) {
    dispatch(searchActions.setProducts({ data }));
  }

  function closeAndResetFilters() {
    // Confirm filter in state & update UI
    setSelectedFilter("");
    dispatch(searchActions.resetFilters());

    // Fetch results without any filters
    fetchSearchResults(
      {
        url: `https://api.bestbuy.com/v1/products((search=${query}))?apiKey=${bestBuyAPIKey}&facet=categoryPath.name&format=json&pageSize=30`,
      },
      displaySearchResults
    );
  }

  function setAppliedFilters() {
    // Confirm filter in state & update UI
    dispatch(searchActions.applyFilterCategory(selectedFilter));

    // Carry out actions according to the selected filter
    if (selectedFilter === "category") {
      // Form query string for fetching filters
      const values = filters.map((filter) => filter.value);
      const categoryPaths = values
        .reduce((acc, currFilter) => {
          return acc + `categoryPath.id=${currFilter}|`;
        }, "")
        .slice(0, -1);

      // Fetch results for applied filters
      fetchSearchResults(
        {
          url: `https://api.bestbuy.com/v1/products((search=${query})&${categoryPaths})?apiKey=${bestBuyAPIKey}&facet=categoryPath.name&pageSize=30&format=json`,
        },
        displaySearchResults
      );
    } else {
      let sortedProducts;

      if (selectedFilter === "price") {
        if (filters[0]["value"] === "ascending") {
          sortedProducts = mergeSort(products);
        } else if (filters[0]["value"] === "descending") {
          sortedProducts = mergeSort(products, "descending");
        }
      } else if (selectedFilter === "ratings") {
        if (filters[0]["value"] === "ascending") {
          sortedProducts = mergeSort(products, "ascending", "rating");
        } else if (filters[0]["value"] === "descending") {
          sortedProducts = mergeSort(products, "descending", "rating");
        }
      }
      setSelectedFilter("");
      setShowFilterOptions(false);
      dispatch(searchActions.setSortedProducts(sortedProducts));
    }
  }

  let typedFilters;
  if (selectedFilter === "category") {
    typedFilters = (
      <>
        <Filter
          value="abcat0501000"
          name="Desktop & All-In-One Computers"
          selectedFilter={selectedFilter}
        />
        <Filter
          value="abcat0401000"
          name="Digital Cameras"
          selectedFilter={selectedFilter}
        />
        <Filter
          value="pcmcat242800050021"
          name="Health, Fitness & Beauty"
          selectedFilter={selectedFilter}
        />
        <Filter
          value="abcat0204000"
          name="Headphones"
          selectedFilter={selectedFilter}
        />
        <Filter
          value="pcmcat241600050001"
          name="Home Audio"
          selectedFilter={selectedFilter}
        />
        <Filter
          value="pcmcat254000050002"
          name="Home Automation & Security"
          selectedFilter={selectedFilter}
        />
        <Filter
          value="pcmcat209000050006"
          name="iPad, Tablets & E-Readers"
          selectedFilter={selectedFilter}
        />
        <Filter
          value="abcat0502000"
          name="Laptops"
          selectedFilter={selectedFilter}
        />
        <Filter
          value="pcmcat295700050012"
          name="PlayStation 4"
          selectedFilter={selectedFilter}
        />
        <Filter
          value="pcmcat310200050004"
          name="Portable & Wireless Speakers"
          selectedFilter={selectedFilter}
        />
        <Filter
          value="abcat0904000"
          name="Ranges, Cooktops & Ovens"
          selectedFilter={selectedFilter}
        />
        <Filter
          value="abcat0901000"
          name="Refrigerators"
          selectedFilter={selectedFilter}
        />
        <Filter
          value="abcat0912000"
          name="Small Kitchen Appliances"
          selectedFilter={selectedFilter}
        />
        <Filter
          value="abcat0101000"
          name="TVs"
          selectedFilter={selectedFilter}
        />
        <Filter
          value="abcat0910000"
          name="Washers & Dryers"
          selectedFilter={selectedFilter}
        />
      </>
    );
  } else {
    typedFilters = (
      <>
        <Filter
          value="ascending"
          name={`Lowest ${selectedFilter} to highest ${selectedFilter}`}
          selectedFilter={selectedFilter}
        />
        <Filter
          value="descending"
          name={`Highest ${selectedFilter} to lowest ${selectedFilter}`}
          selectedFilter={selectedFilter}
        />
      </>
    );
  }

  return (
    <ul className={styles.list}>
      <div className={styles.wrapper}>
        <CloseButton onClick={closeAndResetFilters} />
      </div>
      {typedFilters}
      <div className={styles.wrapper}>
        <Button
          text="Apply filters"
          className={styles.apply}
          onClick={setAppliedFilters}
        />
      </div>
    </ul>
  );
}

function Filter({ value, name, selectedFilter }) {
  const { filters } = useSelector((store) => store.search.activeFilters);
  const names = filters.map((filter) => filter.name);
  const dispatch = useDispatch();

  return (
    <option
      value={value}
      className={names.includes(name) ? styles.selected : ""}
      onClick={() =>
        dispatch(searchActions.setFilter({ name, value, selectedFilter }))
      }
    >
      {name}
    </option>
  );
}

export default FilterWindow;
