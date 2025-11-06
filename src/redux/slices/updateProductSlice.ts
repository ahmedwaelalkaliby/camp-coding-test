import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Product } from "./getProductsSlice";

interface UpdateProductState {
  loading: boolean;
  success: boolean;
  error: string | null;
  updatedProduct?: Product | null;
}

const initialState: UpdateProductState = {
  loading: false,
  success: false,
  error: null,
  updatedProduct: null,
};

// Thunk to update product
export const updateProduct = createAsyncThunk<
  Product,
  Product,
  { rejectValue: string }
>("updateProduct/update", async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/products/update", data);

    if (response.data.status === "success") {
      return data; // return updated product
    }

    return rejectWithValue(response.data.message || "Failed to update product");
  } catch (error) {
    const err = error as { response?: { data?: { message?: string } } };
    return rejectWithValue(
      err.response?.data?.message || "Network error while updating product"
    );
  }
});

const updateProductSlice = createSlice({
  name: "updateProduct",
  initialState,
  reducers: {
    resetUpdateState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.updatedProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
        state.loading = false;
        state.success = true;
        state.updatedProduct = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || "Failed to update product";
      });
  },
});

export const { resetUpdateState } = updateProductSlice.actions;
export default updateProductSlice.reducer;
