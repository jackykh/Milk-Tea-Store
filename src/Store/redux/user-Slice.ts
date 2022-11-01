import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userInfoType {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  group: string;
  avatar: string;
  likeItems: string[];
}

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  group: "",
  avatar: "",
  likeItems: [] as string[],
};

const userSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<userInfoType>) {
      const {
        email,
        firstName,
        lastName,
        group,
        avatar,
        phoneNumber,
        likeItems,
      } = action.payload;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.phoneNumber = phoneNumber;
      state.group = group;
      state.likeItems = likeItems;
      state.avatar = avatar;
    },
    setLikeItem(
      state,
      action: PayloadAction<{
        type: string;
        selectedItemId: string;
      }>
    ) {
      if (action.payload.type === "unlike") {
        state.likeItems = state.likeItems.filter(
          (item) => item !== action.payload.selectedItemId
        );
      } else if (action.payload.type === "like") {
        state.likeItems.push(action.payload.selectedItemId);
      }
    },
    clearUser(state) {
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.phoneNumber = "";
      state.group = "";
      state.avatar = "";
      state.likeItems = [];
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice;
