import { useRef, useState } from "react";
import { searchActions } from "../../store/slice/search";
import { useDispatch } from "react-redux";
import useHttp from "../../hooks/use-http";

import styles from "./Search.module.css";

function Search() {
  const [query, setQuery] = useState("");
  const searchRef = useRef();
  const { error: searchError, sendRequest: fetchSearchResults } = useHttp();
  const dispatch = useDispatch();

  function displaySearchResults(data) {
    dispatch(searchActions.setProducts({ data }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Handling input query
    dispatch(searchActions.setQuery({ query }));
    setQuery("");
    searchRef.current.blur();

    fetchSearchResults(
      {
        url: `https://api.bestbuy.com/v1/products((search=${query}))?apiKey=${process.env.REACT_APP_BESTBUY_API_KEY}&facet=categoryPath.name&format=json&pageSize=20`,
      },
      displaySearchResults
    );
  }

  return (
    <form className={styles.layout} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search Product"
        value={query}
        ref={searchRef}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div className={styles.svg} role="button" onClick={handleSubmit}>
        <svg height="100%" width="100%">
          <use href="/sprite.svg#search" />
        </svg>
      </div>
    </form>
  );
}

export default Search;
