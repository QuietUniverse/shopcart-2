import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: {
      prepare(product) {
        return {
          payload: {
            sku: product.sku,
            name: product.name,
            shortDescription: product.shortDescription,
            imageURL: product.imageURL,
            quantity: { stock: product.stock, count: 1 },
            price: product.price,
          },
        };
      },
      reducer(state, action) {
        const itemIsPresent = state.items.find(
          (item) => item.sku === action.payload.sku
        );
        if (!itemIsPresent) {
          state.items = [...state.items, action.payload];
          state.total += action.payload.price;
        }
      },
    },

    deleteItemFromCart(state, action) {
      const item = state.items.find((item) => item.sku === action.payload);
      const totalDifference = item.price * item.quantity.count;
      state.items = state.items.filter((item) => item.sku !== action.payload);
      state.total -= totalDifference;
    },

    setQuantityCount: {
      prepare(sku, count) {
        return { payload: { sku, count } };
      },
      reducer(state, action) {
        const item = state.items.find(
          (item) => item.sku === action.payload.sku
        );

        state.items = state.items.map((item) =>
          item.sku === action.payload.sku
            ? {
                ...item,
                quantity: {
                  stock: item.quantity.stock,
                  count: action.payload.count,
                },
              }
            : item
        );

        state.total -= item.price * item.quantity.count;
        state.total += item.price * action.payload.count;
      },
    },

    emptyCart(state, action) {
      state.items = initialState.items;
      state.total = initialState.total;
    },
  },
});

export default cartSlice.reducer;

export const cartActions = cartSlice.actions;
