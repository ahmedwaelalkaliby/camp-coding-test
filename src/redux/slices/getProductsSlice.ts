import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../Api";

export interface Product {
  product_id?: number;
  product_name: string;
  product_description: string;
  number_of_pieces: number;
  product_price: number;
  price_after_discount: number;
  discount: number;
  product_name_en: string;
  product_description_en: string;
  product_hidden: "yes" | "no" | 0 | 1;
  product_image?: { product_image_id: string; image_url: string; product_id: string }[];
  add_date?: string;
}

interface GetProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: GetProductsState = {
  products: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk(
  "getProducts/fetch",
  async () => {
    const res = await api.get("/read_products.php");
    // map the correct nested data array
    return res.data.data as Product[];
  }
);

const getProductsSlice = createSlice({
  name: "getProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      });
  },
});

export default getProductsSlice.reducer;
