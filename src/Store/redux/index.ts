import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-Slice";
import cartSlice from "./cart-Slice";
import userSlice from "./user-Slice";
import orderSlice from "./order.Slice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    user: userSlice.reducer,
  },
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
