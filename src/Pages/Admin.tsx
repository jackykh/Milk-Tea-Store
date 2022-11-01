import React, { useRef, useState } from "react";
import { Formik, Form, Field } from "formik";
import Input from "../Components/uiComponents/Input";
import { useAppSelector } from "../Store/redux/hooks";
import { useNavigate } from "react-router-dom";

const AdminPage: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);
  const [preview, setPreview] = useState("");
  const [fileNumber, setFileNumber] = useState(0);
  const fileUploadRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const isNotEmptyValidator = (formName: string, value: string) => {
    if (value.toString().trim().length === 0) {
      return `${formName} 不能為空`;
    }
  };

  const fileOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        setFileNumber(e.target.files.length);
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = function (e) {
          if (reader.result) {
            setPreview(reader.result as string);
          }
        };
      }
    } catch (error: any) {
      alert(error.message || "Unknown Error");
    }
  };

  const onSubmitHandler = async (values: {
    productName: string;
    description: string;
    engName: string;
    price: number;
  }) => {
    try {
      const formData = new FormData();
      formData.append("productInfo", JSON.stringify(values));
      if (fileUploadRef.current?.files) {
        for (let i = 0; i < fileUploadRef.current.files.length; i++) {
          formData.append("images", fileUploadRef.current.files[i]);
        }
      }
      const response = await fetch(
        (process.env.REACT_APP_SERVER as string) + "/admin/add_product",
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
      alert(result.message);
      navigate("../products");
    } catch (error: any) {
      alert(error.message || "Unknown Error");
    }
  };

  return (
    <div className="w-full bg-slate-100 py-16 px-16 flex justify-center items-center font-sans">
      <div className="w-[50rem] flex flex-col">
        <div className="pb-10 border-b  flex justify-center">
          <h3 className="text-2xl font-medium">新增產品</h3>
        </div>
        <div className="p-10 flex flex-col justify-center items-center">
          <label
            htmlFor="images"
            className="w-[15rem] h-[15rem] rounded-full overflow-hidden group cursor-pointer relative bg-purple-300 mb-6"
          >
            <img
              src={preview}
              alt="&nbsp;"
              className="group-hover:blur-sm group-hover:brightness-50 transition-all object-contain object-center absolute"
            />
            <figcaption className="text-white text-center translate-y-[15rem] font-bold group-hover:translate-y-[5rem] transition-all">
              <div className="flex flex-col">
                <i className="fa-solid fa-upload"></i>
                <span>按此上傳</span>
              </div>
            </figcaption>
          </label>
          <input
            type="file"
            className="hidden"
            id="images"
            name="images"
            accept="image/png, image/jpeg"
            multiple
            onChange={fileOnChangeHandler}
            ref={fileUploadRef}
          />
          <span>選擇圖片數：{fileNumber} （最大上傳數：4）</span>
        </div>
        <Formik
          initialValues={{
            productName: "",
            description: "",
            engName: "",
            price: 0,
          }}
          onSubmit={(values) => {
            onSubmitHandler(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="w-full flex flex-col justify-center items-center [&>*]:mb-8 ">
              <div className="w-full relative">
                <Field
                  validate={isNotEmptyValidator.bind(null, "產品名稱")}
                  name="productName"
                  type="text"
                  placeholder="產品名稱"
                  as={Input}
                />
                {errors.productName && touched.productName && (
                  <span className="absolute right-2 p-2 select-none text-red-500">
                    {errors.productName}
                  </span>
                )}
              </div>
              <div className="w-full relative">
                <Field
                  validate={isNotEmptyValidator.bind(null, "英文名稱")}
                  name="engName"
                  type="text"
                  placeholder="英文名稱"
                  as={Input}
                />
                {errors.engName && touched.engName && (
                  <span className="absolute right-2 p-2 select-none text-red-500">
                    {errors.engName}
                  </span>
                )}
              </div>
              <div className="w-full relative">
                <Field
                  validate={isNotEmptyValidator.bind(null, "描述")}
                  name="description"
                  type="text"
                  placeholder="描述"
                  as={Input}
                />
                {errors.description && touched.description && (
                  <span className="absolute right-2 p-2 select-none text-red-500">
                    {errors.description}
                  </span>
                )}
              </div>

              <div className="w-full relative">
                <Field
                  validate={isNotEmptyValidator.bind(null, "價錢")}
                  name="price"
                  type="number"
                  placeholder="價錢"
                  as={Input}
                />
                {errors.price && touched.price && (
                  <span className="absolute right-2 p-2 select-none text-red-500">
                    {errors.price}
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

export default AdminPage;
