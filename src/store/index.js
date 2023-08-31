import { configureStore } from "@reduxjs/toolkit";

import cart from "./slice/cart";
import searchSlice from "./slice/search";

const store = configureStore({
  reducer: { search: searchSlice.reducer, cart: cart },
});

export default store;
