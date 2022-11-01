import React, { useState } from "react";
import Input from "../Components/uiComponents/Input";
import { Formik, Form, Field } from "formik";
import { useAppDispatch } from "../Store/redux/hooks";
import { useNavigate } from "react-router-dom";
import { LoginAction } from "../Store/redux/auth-Slice";
import { Link } from "react-router-dom";

const Login: React.FC = () => {
  const [IsSignIn, setIsSignIn] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const emailValidator = (value: string) => {
    if (value.length === 0) {
      return "電郵不能為空";
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return "電郵格式錯誤";
    }
  };

  const passwordValidator = (value: string) => {
    if (value.length === 0) {
      return "密碼不能為空";
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)
    ) {
      return "需要8位包含數字和字母密碼";
    }
  };

  return (
    <div className="h-full w-full ">
      <div className="w-full h-full bg-slate-100 flex justify-center items-center">
        <div className="w-[60rem] h-[30rem] bg-white border-gray-200 border flex flex-col justify-center items-center">
          <div className="flex justify-around pb-8 font-medium w-3/5">
            <button
              className={`${IsSignIn && "border-b-2 border-purple-900"} p-3`}
              onClick={() => {
                setIsSignIn(true);
              }}
            >
              登入
            </button>
            <button
              className={`${!IsSignIn && "border-b-2 border-purple-900"} p-3`}
              onClick={() => {
                setIsSignIn(false);
              }}
            >
              註冊
            </button>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => {
              dispatch(LoginAction(values, IsSignIn));
              navigate("home");
            }}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col justify-center items-center [&>*]:mb-8 w-[40rem]">
                <div className="w-full relative">
                  <Field
                    validate={emailValidator}
                    name="email"
                    type="email"
                    placeholder="電郵地址"
                    as={Input}
                  />
                  {errors.email && touched.email && (
                    <span className="absolute right-2 p-2 select-none text-red-500">
                      {errors.email}
                    </span>
                  )}
                </div>
                <div className="w-full relative">
                  <Field
                    validate={passwordValidator}
                    name="password"
                    type="password"
                    placeholder="密碼"
                    as={Input}
                  />
                  {errors.password && touched.password && (
                    <span className="absolute right-2 p-2 select-none text-red-500">
                      {errors.password}
                    </span>
                  )}
                </div>
                <div className="w-[30rem]  flex justify-center items-center mt-6">
                  <button type="submit" className="btn mr-12 py-4 px-12">
                    {IsSignIn ? "登入" : "註冊"}
                  </button>
                  {IsSignIn && (
                    <Link to="../reset_password" className="btn py-4 px-12">
                      忘記密碼
                    </Link>
                  )}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
