import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface userInfoType {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
}

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  phoneNumber: "",
  avatar: "",
};

const userSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<userInfoType>) {
      const { email, firstName, lastName, avatar, phoneNumber } =
        action.payload;
      state.email = email;
      state.firstName = firstName;
      state.lastName = lastName;
      state.phoneNumber = phoneNumber;
      state.avatar = avatar;
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice;
