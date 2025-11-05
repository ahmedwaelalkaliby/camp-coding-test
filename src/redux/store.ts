import { configureStore } from "@reduxjs/toolkit";
import getProductsReducer from "./slices/getProductsSlice";
import deleteProductReducer from "./slices/deleteProductSlice";

export const store = configureStore({
  reducer: {
    getProducts: getProductsReducer,
    deleteProduct: deleteProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
