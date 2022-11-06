import React from "react";
import { Formik, Form, Field } from "formik";
import Input from "../Components/uiComponents/Input";

const SendResetEmailPage: React.FC = () => {
  const emailValidator = (value: string) => {
    if (value.length === 0) {
      return "電郵不能為空";
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return "電郵格式錯誤";
    }
  };

  const onSubmitHandler = async (values: { email: string }) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/auth/send_reset_email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        const error = new Error(result.message || "Unknown Error");
        throw error;
      }
      alert(result.message);
    } catch (error) {
      if (error instanceof Error) alert(error.message || "Unknown Error");
    }
  };

  return (
    <div className="w-full bg-slate-100 py-16 px-16 flex justify-center items-center font-sans">
      <div className="w-[50rem] flex flex-col">
        <div className="pb-10 border-b  flex justify-center">
          <h3 className="text-2xl font-medium">重設密碼</h3>
        </div>
        <Formik
          initialValues={{
            email: "",
          }}
          onSubmit={(values) => {
            onSubmitHandler(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="w-full flex flex-col justify-center items-center [&>*]:mb-8 ">
              <div className="w-full relative">
                <Field
                  validate={emailValidator}
                  name="email"
                  type="email"
                  placeholder="電郵"
                  as={Input}
                />
                {errors.email && touched.email && (
                  <span className="absolute right-2 p-2 select-none text-red-500">
                    {errors.email}
                  </span>
                )}
              </div>
              <div className="w-[30rem]  flex justify-center items-center mt-6">
                <button type="submit" className="btn mr-12 py-4 px-12">
                  發出重設密碼電郵
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SendResetEmailPage;
