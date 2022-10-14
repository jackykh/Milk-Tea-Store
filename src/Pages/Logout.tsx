import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authAction } from "../Store/redux/auth-Slice";

const LogoutWrapper: React.FC<{ children: React.ReactNode }> = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(authAction.logout());
  });
  return <>{props.children}</>;
};

export default LogoutWrapper;
