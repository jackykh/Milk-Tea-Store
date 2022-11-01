import React, { useRef } from "react";
import { Formik, Form, Field, FormikProps } from "formik";
import { useParams } from "react-router-dom";
import Input from "../Components/uiComponents/Input";

interface resetPasswordForm {
  newPassword: string;
  confirmPassword: string;
}

const ResetPasswordPage: React.FC = () => {
  const formikRef = useRef<FormikProps<resetPasswordForm>>(null);
  const { passwordToken } = useParams();

  const passwordValidator = (value: string) => {
    if (value.length === 0) {
      return "密碼不能為空";
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(value)
    ) {
      return "需要8位包含數字和字母密碼";
    }
  };

  const confirmPasswordValidator = (value: string) => {
    if (value.toString().trim().length === 0) {
      return "確認密碼 不能為空";
    } else if (
      formikRef.current &&
      value !== formikRef.current.values.newPassword
    ) {
      return "與新密碼不相符";
    }
  };

  const onSubmitHandler = async (values: resetPasswordForm) => {
    try {
      const adjustedValues = {
        newPassword: values.newPassword,
        passwordToken,
      };
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/auth/reset_password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adjustedValues),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        const error = new Error(result.message || "Unknown Error");
        throw error;
      }
      alert(result.message);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full bg-slate-100 py-16 px-16 flex justify-center items-center font-sans">
      <div className="w-[50rem] flex flex-col">
        <div className="pb-10 border-b  flex justify-center">
          <h3 className="text-2xl font-medium">重設密碼</h3>
        </div>
        <Formik
          innerRef={formikRef}
          initialValues={{
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            onSubmitHandler(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="w-full flex flex-col justify-center items-center [&>*]:mb-8 ">
              <div className="w-full relative">
                <Field
                  validate={passwordValidator}
                  name="newPassword"
                  type="password"
                  placeholder="新密碼"
                  as={Input}
                />
                {errors.newPassword && touched.newPassword && (
                  <span className="absolute right-2 p-2 select-none text-red-500">
                    {errors.newPassword}
                  </span>
                )}
              </div>
              <div className="w-full relative">
                <Field
                  validate={confirmPasswordValidator}
                  name="confirmPassword"
                  type="password"
                  placeholder="確認密碼"
                  as={Input}
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <span className="absolute right-2 p-2 select-none text-red-500">
                    {errors.confirmPassword}
                  </span>
                )}
              </div>
              <div className="w-[30rem] flex justify-center items-center mt-6">
                <button type="submit" className="btn mr-12 py-4 px-12">
                  確認新密碼
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
