import { Formik, Form, Field, FormikProps } from "formik";
import { useRef } from "react";
import Input from "../Components/uiComponents/Input";

interface passwordForm {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const EditPasswordPage: React.FC = () => {
  const ref = useRef<FormikProps<passwordForm>>(null);
  const isNotEmptyValidator = (formName: string, value: string) => {
    if (value.toString().trim().length === 0) {
      return `${formName} 不能為空`;
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

  const confirmPasswordValidator = (value: string) => {
    if (value.toString().trim().length === 0) {
      return "確認密碼 不能為空";
    } else if (ref.current && value !== ref.current.values.newPassword) {
      return "與新密碼不相符";
    }
  };

  return (
    <div className="w-full bg-slate-100 py-16 px-16 flex justify-center items-center font-sans">
      <div className="w-[50rem] flex flex-col">
        <div className="pb-10 border-b  flex justify-center">
          <h3 className="text-2xl font-medium">更改密碼</h3>
        </div>
        <Formik
          innerRef={ref}
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="w-full flex flex-col justify-center items-center [&>*]:mb-8 ">
              <div className="w-full relative">
                <Field
                  validate={isNotEmptyValidator.bind(null, "舊密碼")}
                  name="oldPassword"
                  type="password"
                  placeholder="舊密碼"
                  as={Input}
                />
                {errors.oldPassword && touched.oldPassword && (
                  <span className="absolute right-2 p-2 select-none text-red-500">
                    {errors.oldPassword}
                  </span>
                )}
              </div>
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
                  儲存
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditPasswordPage;
