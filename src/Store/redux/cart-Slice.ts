import { createSlice } from "@reduxjs/toolkit";

interface State {
  items: Array<{
    id: string;
    name: string;
    options: string[];
    price: number;
    number: number;
    photoUrl: string;
  }>;
}

const initialState: State = {
  items: [],
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    changeOptions(state, action) {
      const index = state.items.findIndex((item) => {
        return item.id === action.payload.id;
      });
      if (index >= 0) {
        const optionIndex = state.items[index].options.findIndex((option) => {
          return option === action.payload.checkedOptions;
        });
        if (optionIndex >= 0) {
          state.items[index].options.splice(optionIndex, 1);
        } else {
          state.items[index].options.push(action.payload.checkedOptions);
        }
      }
    },
    changeNumber(state, action) {
      const index = state.items.findIndex((item) => {
        return item.id === action.payload.id;
      });
      if (index >= 0) {
        state.items[index].number = action.payload.number;
      }
    },
    addItem(state, action) {
      if (action.payload.item.number === 0) {
        return;
      }
      const index = state.items.findIndex((item) => {
        return item.id === action.payload.item.id;
      });
      if (index >= 0) {
        state.items[index].number++;
        state.items[index].options = action.payload.item.options;
      } else {
        state.items.push(action.payload.item);
      }
    },
    deleteItem(state, action) {
      const index = state.items.findIndex((item) => {
        return item.id === action.payload.id;
      });
      state.items.splice(index, 1);
    },
    clearAllItems(state) {
      state.items = [];
    },
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice;
