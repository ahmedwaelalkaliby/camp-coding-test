import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface DeleteProductState {
  loading: boolean;
  error: string | null;
  success: boolean;
  deletedProductId: number | null;
}

const initialState: DeleteProductState = {
  loading: false,
  error: null,
  success: false,
  deletedProductId: null,
};

// Async thunk to delete product by ID
export const deleteProduct = createAsyncThunk<
  number, 
  number, 
  { rejectValue: string }
>("deleteProduct/delete", async (product_id, { rejectWithValue }) => {
  try {
    const response = await axios.post("/api/products/delete", { productId: product_id });

    if (response.data.status === "success") {
      return product_id; // return deleted product ID
    }

    return rejectWithValue(response.data.message || "Failed to delete product");
  } catch (error) {
    const err = error as { response?: { data?: { message?: string } } };
    return rejectWithValue(
      err.response?.data?.message || "Network error while deleting product"
    );
  }
});

const deleteProductSlice = createSlice({
  name: "deleteProduct",
  initialState,
  reducers: {
    resetDeleteState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.deletedProductId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.deletedProductId = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = false;
        state.success = true;
        state.deletedProductId = action.payload;
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.success = false;

        // Prefer action.payload (from rejectWithValue) over action.error.message
        state.error = action.payload ?? action.error.message ?? "Failed to delete product";
      });
  },
});

export const { resetDeleteState } = deleteProductSlice.actions;
export default deleteProductSlice.reducer;
