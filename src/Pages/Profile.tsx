import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import Input from "../Components/uiComponents/Input";
import { useAppDispatch, useAppSelector } from "../Store/redux/hooks";
import { userAction } from "../Store/redux/user-Slice";

const Profile: React.FC = () => {
  const { email, firstName, lastName, phoneNumber, avatar } = useAppSelector(
    (state) => state.user
  );
  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const [avatarUrl, setavatarUrl] = useState("");
  const fileUploadRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setavatarUrl(`${process.env.REACT_APP_SERVER}/${avatar}`);
  }, [avatar]);

  const emailValidator = (value: string) => {
    if (value.trim().length === 0) {
      return "電郵不能為空";
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      return "電郵格式錯誤";
    }
  };

  const isNotEmptyValidator = (formName: string, value: string) => {
    if (value.trim().length === 0) {
      return `${formName} 不能為空`;
    }
  };

  const isPhoneValidator = (value: string) => {
    if (!/^[23569]\d{7}$/.test(value)) {
      return "請輸入正確電話號碼！";
    }
  };

  const fileOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function (e) {
          if (reader.result) {
            setavatarUrl(reader.result as string);
          }
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = async (values: any) => {
    try {
      const formData = new FormData();
      if (fileUploadRef.current?.files) {
        formData.append("avatar", fileUploadRef.current.files[0]);
      }
      formData.append("userInfo", JSON.stringify(values));

      const response = await fetch(
        (process.env.REACT_APP_SERVER as string) + "/api/user/change_userinfo",
        {
          method: "PUT",
          headers: {
            Authorization: "bearer " + token,
          },
          body: formData,
        }
      );
      const result = await response.json();
      if (!response.ok) {
        const error = new Error(result.message || "Server Error");
        throw error;
      }
      dispatch(userAction.setUser(result.updatedUserInfo));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full bg-slate-100 py-16 px-16 flex justify-center items-center font-sans">
      <div className="w-[50rem] flex flex-col">
        <div className="pb-10 border-b  flex justify-center">
          <h3 className="text-2xl font-medium">我的帳戶</h3>
        </div>
        <div className="p-10 flex justify-center items-center">
          <label
            htmlFor="avatar"
            className="w-[15rem] h-[15rem] rounded-full overflow-hidden group cursor-pointer relative"
          >
            <img
              src={avatarUrl}
              alt="avatar"
              className="group-hover:blur-sm group-hover:brightness-50 transition-all object-contain object-center absolute"
            />
            <figcaption className="text-white text-center translate-y-[15rem] font-bold group-hover:translate-y-[6rem] transition-all">
              按此上傳
            </figcaption>
          </label>
          <input
            type="file"
            className="hidden"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg"
            onChange={fileOnChangeHandler}
            ref={fileUploadRef}
          />
        </div>
        <Formik
          initialValues={{
            email: email || "",
            firstName: firstName || "",
            lastName: lastName || "",
            phoneNumber: phoneNumber || "",
            avatar: avatar || "",
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
              <div className="w-full relative">
                <Field
                  validate={isNotEmptyValidator.bind(null, "名")}
                  name="firstName"
                  type="text"
                  placeholder="名"
                  as={Input}
                />
                {errors.firstName && touched.firstName && (
                  <span className="absolute right-2 p-2 select-none text-red-500">
                    {errors.firstName}
                  </span>
                )}
              </div>
              <div className="w-full relative">
                <Field
                  validate={isNotEmptyValidator.bind(null, "姓氏")}
                  name="lastName"
                  type="text"
                  placeholder="姓氏"
                  as={Input}
                />
                {errors.lastName && touched.lastName && (
                  <span className="absolute right-2 p-2 select-none text-red-500">
                    {errors.lastName}
                  </span>
                )}
              </div>
              <div className="w-full relative">
                <Field
                  validate={isPhoneValidator}
                  name="phoneNumber"
                  type="number"
                  placeholder="電話號碼"
                  as={Input}
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <span className="absolute right-2 p-2 select-none text-red-500">
                    {errors.phoneNumber}
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

export default Profile;
