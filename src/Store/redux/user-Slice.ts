import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userInfoType {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  group: string;
  avatar: string;
}

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  group: "",
  avatar: "",
};

const userSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<userInfoType>) {
      const { email, firstName, lastName, group, avatar, phoneNumber } =
        action.payload;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.phoneNumber = phoneNumber;
      state.group = group;
      state.avatar = avatar;
    },
    clearUser(state) {
      state.email = "";
      state.firstName = "";
      state.lastName = "";
      state.phoneNumber = "";
      state.group = "";
      state.avatar = "";
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice;
