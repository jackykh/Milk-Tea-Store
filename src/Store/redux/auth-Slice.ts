import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch } from "./index";
// import { userAction } from "./user-Slice";

export interface authInfoType {
  token: string;
  userId: string;
  isLoggedIn: boolean;
  expirationTime: number;
}

export interface loginInfoType {
  email: string;
  password: string;
}

export interface responseType {
  token: string;
  userId: string;
}

const initialState: authInfoType = {
  token: "",
  userId: "",
  isLoggedIn: false,
  expirationTime: 0,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login(state, action: PayloadAction<responseType>) {
      const currentTime = new Date().getTime();
      const expirationTime = currentTime + 3600000;
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.expirationTime = new Date(expirationTime).getTime();
      state.isLoggedIn = true;
      localStorage.setItem("loginInfo", JSON.stringify(state));
    },
    logout(state) {
      state.token = "";
      state.userId = "";
      state.expirationTime = 0;
      state.isLoggedIn = false;
      localStorage.removeItem("loginInfo");
    },
  },
});

export const authAction = authSlice.actions;

export const LoginAction = (loginInfo: loginInfoType, isLogin: boolean) => {
  let path: string;
  let method: string;
  if (isLogin) {
    path = "/auth/login";
    method = "POST";
  } else {
    path = "/auth/signup";
    method = "PUT";
  }
  return async function LoginThunk(dispatch: AppDispatch) {
    try {
      ////Authentication
      const response = await fetch(
        (process.env.REACT_APP_SERVER as string) + path,
        {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginInfo),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        const error = new Error(result.message || "Server Error");
        throw error;
      }
      if (result.message) {
        alert(result.message);
      }
      dispatch(authAction.login(result));

      //////////////////////////

      // const res = await fetch(
      //   (process.env.REACT_APP_SERVER as string) + "/api/user/get_userinfo",
      //   {
      //     method: "GET",
      //     headers: {
      //       Authorization: result.token,
      //     },
      //   }
      // );
      // const fetchedUserInfo = await res.json();
      // if (!res.ok) {
      //   const error = new Error(result.message || "Server Error");
      //   throw error;
      // }
      // dispatch(userAction.setUser(fetchedUserInfo));

      /////////////////////
    } catch (error) {
      let message = "Unknown Error";
      if (error instanceof Error) {
        message = error.message;
      }
      console.log(message);
    }
  };
};

export default authSlice;
