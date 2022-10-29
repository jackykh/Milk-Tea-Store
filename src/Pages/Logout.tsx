import React, { useEffect } from "react";
import { useAppDispatch } from "../Store/redux/hooks";
import { logoutThunk } from "../Store/redux/auth-Slice";

const LogoutWrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(logoutThunk);
  });
  return <>{props.children}</>;
};

export default LogoutWrapper;
