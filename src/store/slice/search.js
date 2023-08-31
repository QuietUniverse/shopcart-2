import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    category: { promotionQuery: "", categoryKeywords: [] },
    products: [],
    selectedProduct: undefined,
    productVariants: [],
    isLoading: false,
    activeFilters: { type: "", filters: [] },
  },
  reducers: {
    setProducts(state, action) {
      const data = action.payload.data.products;

      // Cleaning and formatting product
      const products = data.map(function (result) {
        // Boundaries for text content
        const previewName =
          result.albumTitle.length > 40
            ? result.albumTitle.slice(0, 40) + "..."
            : result.albumTitle
            ? result.albumTitle
            : result.name;
        const longDescription =
          result.longDescription !== null
            ? new DOMParser().parseFromString(
                result.longDescription.split(".").splice(0, 2).join(". "),
                "text/html"
              ).documentElement.textContent
            : "";
        const shortDescription =
          result.shortDescription !== null
            ? result.shortDescription.slice(0, 35) + "..."
            : result.longDescription !== null
            ? new DOMParser()
                .parseFromString(
                  result.longDescription.split(".")[0],
                  "text/html"
                )
                .documentElement.textContent.slice(0, 35) + "..."
            : "";

        const [imageURL] = result.images.filter((image) => image.primary);

        const product = {
          sku: result.sku,
          previewName,
          name: result.name || "",
          imageURL: imageURL?.href || result.images[0]?.href,
          price: result.regularPrice,
          rating: {
            average: Number(result.customerReviewAverage) || 0,
            count: Number(result.customerReviewCount) || 0,
          },
          shortDescription,
          longDescription: longDescription + ".",
          variants: result.productVariations
            .filter((variant) => Number(variant.sku) !== Number(result.sku))
            .map((variation) => Number(variation.sku)),
          stock: Math.ceil(Math.random() * 20),
        };
        return product;
      });

      // Removing Variants...
      const formattedProducts = products.reduce(function (
        prevProducts,
        currProduct
      ) {
        const isVariant = prevProducts.find(
          (p) => p.variants.includes(currProduct.sku) && p
        );
        if (!isVariant) return [...prevProducts, currProduct];
        return prevProducts;
      },
      []);

      // Setting Category
      const categoryPaths = action.payload.data.facets["categoryPath.name"];
      const categoryEntries = Object.entries(categoryPaths).filter(
        (entry) => !entry[0].match(/best buy/)
      );
      const maxCategories = categoryEntries.reduce(
        (acc, curr) => {
          return acc.at(-1).at(1) < curr.at(1)
            ? [curr]
            : acc.at(-1).at(1) === curr.at(1)
            ? [...acc, curr]
            : acc;
        },
        [categoryEntries[0]]
      );
      const finalCategories = maxCategories.slice(1).map((c) => c[0]);
      state.category.categoryKeywords = finalCategories;
      state.category.promotionQuery = state.query.split(" ").join("+");

      // Setting products list
      state.products = formattedProducts;
    },

    setQuery(state, action) {
      state.query = action.payload.query;
    },

    setSelectedProduct(state, action) {
      state.selectedProduct = action.payload.product;
    },

    setProductViaLink(state, action) {
      const data = action.payload.data.products[0];

      // Boundaries for text content
      const previewName =
        data.albumTitle.length > 40
          ? data.albumTitle.slice(0, 40) + "..."
          : data.albumTitle
          ? data.albumTitle
          : data.name;
      const longDescription =
        data.longDescription !== null
          ? new DOMParser().parseFromString(
              data.longDescription.split(".").splice(0, 2).join(". "),
              "text/html"
            ).documentElement.textContent
          : "";
      const shortDescription =
        data.shortDescription !== null
          ? data.shortDescription.slice(0, 35) + "..."
          : data.longDescription !== null
          ? new DOMParser()
              .parseFromString(data.longDescription.split(".")[0], "text/html")
              .documentElement.textContent.slice(0, 35) + "..."
          : "";

      const [imageURL] = data.images.filter((image) => image.primary);

      const product = {
        sku: data.sku,
        previewName,
        name: data.name || "",
        imageURL: imageURL?.href || data.images[0]?.href,
        price: data.regularPrice,
        rating: {
          average: Number(data.customerReviewAverage) || 0,
          count: Number(data.customerReviewCount) || 0,
        },
        shortDescription,
        longDescription: longDescription + ".",
        variants: data.productVariations
          .filter((variant) => Number(variant.sku) !== Number(data.sku))
          .map((variation) => Number(variation.sku)),
        stock: Math.ceil(Math.random() * 20),
      };

      state.selectedProduct = product;
    },

    setPrimaryProductAmongstVariants(state, action) {
      const productVariant = {
        sku: state.selectedProduct.sku,
        name: state.selectedProduct.name,
        imageURL: state.selectedProduct.imageURL,
        stock: state.selectedProduct.stock,
        isActive: true,
      };

      state.productVariants = [productVariant];
    },

    setSelectedProductVariant(state, action) {
      const data = action.payload.data.products[0];
      const [imageURL] = data.images.filter((image) => image.primary);

      const variant = {
        sku: data.sku,
        name: data.name || "",
        imageURL: imageURL?.href || data.images[0]?.href,
        stock: Math.ceil(Math.random() * 20),
        isActive: false,
      };

      // Removing duplicate variants recieved either through back-to-back calls or just present in the bestbuy product
      const isDuplicate = state.productVariants.find(
        (v) => v.sku === variant.sku
      );

      if (!isDuplicate) {
        state.productVariants = [...new Set(state.productVariants), variant];
      }
    },

    setIsLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },

    setFilter(state, action) {
      const filters = state.activeFilters.filters;
      const filterValues = filters.map((filter) => filter.value);
      const selectedFilter = action.payload.selectedFilter;

      if (selectedFilter === "category") {
        if (filterValues.includes(action.payload.value)) {
          state.activeFilters.filters = filters.filter(
            (f) => f.value !== action.payload.value
          );
        } else {
          state.activeFilters.filters = [
            ...filters,
            { value: action.payload.value, name: action.payload.name },
          ];
        }
      } else {
        if (filterValues.includes(action.payload.value)) {
          state.activeFilters.filters = [];
        } else {
          state.activeFilters.filters = [
            { value: action.payload.value, name: action.payload.name },
          ];
        }
      }
    },

    applyFilterCategory(state, action) {
      state.activeFilters.type = action.payload;

      if (action.payload === "category") {
        const filters = state.activeFilters.filters;
        const filterValues = filters.map((filter) => filter.value);
        // Filter out any other filter types other than category
        if (
          filterValues.includes("ascending") ||
          filterValues.includes("descending")
        ) {
          state.activeFilters.filters = filters.filter(
            (f) => f.value !== "ascending" && f.value !== "descending"
          );
        }
      }
    },

    resetFilterType(state, action) {
      state.activeFilters.type = "";
    },

    resetFilters(state, action) {
      state.activeFilters = { type: "", filters: [] };
    },

    setSortedProducts(state, action) {
      state.products = action.payload;
    },
  },
});

export default searchSlice;

export const searchActions = searchSlice.actions;
