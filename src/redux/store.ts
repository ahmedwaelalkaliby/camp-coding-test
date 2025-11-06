import { configureStore } from "@reduxjs/toolkit";
import getProductsReducer from "./slices/getProductsSlice";
import deleteProductReducer from "./slices/deleteProductSlice";
import updateProductReducer from "./slices/updateProductSlice";
import createProductReducer from "./slices/createProductSlice";

export const store = configureStore({
  reducer: {
    getProducts: getProductsReducer,
    deleteProduct: deleteProductReducer,
    updateProduct: updateProductReducer,
    createProduct: createProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
