import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "./getProductsSlice";

interface CreateProductState {
  loading: boolean;
  success: boolean;
  error: string | null;
  createdProduct?: Product | null;
}

const initialState: CreateProductState = {
  loading: false,
  success: false,
  error: null,
  createdProduct: null,
};

export const createProduct = createAsyncThunk<
  Product,
  Product,
  { rejectValue: string }
>("createProduct/create", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/products/create", data);

    if (response.data.status === "success") {
      return { ...data, product_id: response.data.product_id }; // Return the new product with ID
    }

    return rejectWithValue(response.data.message || "Failed to create product");
  } catch (error) {
    const err = error as { response?: { data?: { message?: string } } };
    return rejectWithValue(
      err.response?.data?.message || "Network error while creating product"
    );
  }
});

const createProductSlice = createSlice({
  name: "createProduct",
  initialState,
  reducers: {
    resetCreateState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.createdProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.success = true;
        state.createdProduct = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to create product";
      });
  },
});

export const { resetCreateState } = createProductSlice.actions;
export default createProductSlice.reducer;
