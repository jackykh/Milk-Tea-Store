import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface orderType {
  totalPrice: number;
  orderItems: Array<{
    productId: string;
    options: string[];
    quantity: number;
  }>;
}

const initialState: orderType = { totalPrice: 0, orderItems: [] };

const orderSlice = createSlice({
  name: "orderSlice",
  initialState,
  reducers: {
    setOrder(state, action: PayloadAction<orderType>) {
      state.totalPrice = action.payload.totalPrice;
      state.orderItems = action.payload.orderItems;
    },
  },
});

export const orderAction = orderSlice.actions;
export default orderSlice;
