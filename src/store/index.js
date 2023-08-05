import { configureStore } from "@reduxjs/toolkit";

import searchSlice from "./slice/search";

const store = configureStore({
  reducer: { search: searchSlice.reducer },
});

export default store;
