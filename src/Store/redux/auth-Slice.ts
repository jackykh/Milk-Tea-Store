import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "./index";
import { userAction } from "./user-Slice";

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

const initialState: authInfoType = {
  token: "",
  userId: "",
  isLoggedIn: false,
  expirationTime: 0,
};

const expirationDuration = 3600000;

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    login(state, action: PayloadAction<authInfoType>) {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.expirationTime = action.payload.expirationTime;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.token = "";
      state.userId = "";
      state.expirationTime = 0;
      state.isLoggedIn = false;
    },
  },
});

export const authAction = authSlice.actions;

const fetchUserInfo = async (token: string) => {
  try {
    const res = await fetch(
      (process.env.REACT_APP_SERVER as string) + "/api/user/get_userinfo",
      {
        method: "GET",
        headers: {
          Authorization: "bearer " + token,
        },
      }
    );
    const fetchedUserInfo = await res.json();
    if (!res.ok) {
      const error = new Error(fetchedUserInfo.message || "Server Error");
      throw error;
    }
    return fetchedUserInfo;
  } catch (error) {
    if (error instanceof Error) alert(error.message || "Unknown Error");
  }
};

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
      const userInfo = await fetchUserInfo(result.token);
      if (userInfo) {
        const authInfo = {
          ...result,
          expirationTime: Date.now() + expirationDuration,
        };
        dispatch(authAction.login(authInfo));
        dispatch(userAction.setUser(userInfo));
        setTimeout(() => {
          dispatch(logoutThunk);
        }, expirationDuration);
        localStorage.setItem("loginInfo", JSON.stringify(userInfo));
      }
    } catch (error) {
      if (error instanceof Error) alert(error.message || "Unknown Error");
    }
  };
};

export const authThunk = async (dispatch: AppDispatch) => {
  const savedAuthInfo = localStorage.getItem("loginInfo");
  if (savedAuthInfo) {
    const authInfo = JSON.parse(savedAuthInfo);
    const { token, expirationTime, userId, isLoggedIn } = authInfo;
    const currentTime = Date.now();
    if (token && +expirationTime > currentTime && userId && isLoggedIn) {
      const userInfo = await fetchUserInfo(token);
      if (userInfo) {
        dispatch(authAction.login(authInfo));
        dispatch(userAction.setUser(userInfo));
        const newExpirationDuration = expirationTime - Date.now();
        if (newExpirationDuration > 0) {
          setTimeout(() => {
            dispatch(logoutThunk);
          }, newExpirationDuration);
        }
      }
    }
  }
};

export const logoutThunk = (dispatch: AppDispatch) => {
  dispatch(authAction.logout());
  dispatch(userAction.clearUser());
  localStorage.setItem("loginInfo", "");
};

export default authSlice;
