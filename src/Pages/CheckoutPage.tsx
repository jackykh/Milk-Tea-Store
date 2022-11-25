import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../Store/redux/hooks";
import { Formik, Form, FormikProps } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { cartAction } from "../Store/redux/cart-Slice";
import LoadingSpinner from "../Components/uiComponents/LoadingSpinner";

interface creditCardFormType {
  address: string;
  cardNumber: string;
  exp_date: string;
  cvc: string;
}

const CheckoutPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { totalPrice, orderItems } = useAppSelector((state) => state.order);
  const { token } = useAppSelector((state) => state.auth);
  const email = useAppSelector((state) => state.user.email);
  const [isLoading, setIsLoading] = useState(false);

  const getSchema = () =>
    yup.object().shape({
      address: yup.string().required("地址不能為空"),
      cardNumber: yup
        .string()
        .required("請輸入正確卡號碼！")
        .min(16, "請輸入不少於十六位數字"),
      exp_date: yup
        .string()
        .min(5, "請輸入正確到期日")
        .required("到期日不能為空")
        .test("date test", function (value) {
          if (value && !/^(0\d|1[0-2])\/2[2-9]$/.test(value)) {
            return this.createError({ message: "請輸入正確到期日" });
          } else {
            return true;
          }
        }),
      cvc: yup
        .number()
        .min(3, "請輸入完整卡驗證碼")
        .required("卡驗證碼不能為空"),
    });

  const onSubmitHandler = async (formInfo: creditCardFormType) => {
    const address = formInfo.address;
    const cardNumber = formInfo.cardNumber.replace(/\s/g, "");
    const exp_date = formInfo.exp_date.split("/");
    const exp_month = exp_date[0];
    const exp_year = "20" + exp_date[1];
    const adjustedCreditCardInfo = {
      cardNumber,
      exp_month,
      exp_year,
      cvc: formInfo.cvc,
    };
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_SERVER}/order/add_order`,
        {
          method: "POST",
          headers: {
            Authorization: "bearer " + token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderItems,
            creditCardInfo: adjustedCreditCardInfo,
            address,
            email,
          }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        const error = new Error(result.message || "Unknown Error");
        throw error;
      }
      alert(result.message);
      dispatch(cartAction.clearAllItems());
      setIsLoading(false);
      navigate("../home");
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full bg-slate-100 py-16 px-32 flex justify-center items-center">
      {!isLoading && (
        <Formik
          initialValues={{ cardNumber: "", exp_date: "", cvc: "", address: "" }}
          onSubmit={(values) => {
            onSubmitHandler(values);
          }}
          validationSchema={getSchema}
        >
          {(props: FormikProps<creditCardFormType>) => (
            <Form>
              <div className=" w-full flex justify-center items-start">
                <div className="w-[50rem] [&>*]:mb-6 mr-6">
                  <div className="w-full bg-white p-10">
                    <h1 className="text-4xl uppercase font-bold">Check out</h1>
                  </div>
                  <div className="w-full bg-white p-10 [&>*]:mb-10 relative">
                    <h3 className="font-bold">運送地址</h3>
                    <input
                      type="text"
                      name="address"
                      className="input"
                      placeholder="地址"
                      onChange={props.handleChange}
                      onBlur={props.handleBlur}
                      value={props.values.address}
                    />
                    {props.errors.address && props.touched.address && (
                      <span className="absolute right-12 p-2 select-none text-red-500">
                        {props.errors.address as string}
                      </span>
                    )}
                  </div>
                  <div className="w-full bg-white p-10 [&>*]:mb-10">
                    <h3 className="font-bold">信用卡資訊</h3>

                    <div className="flex w-full relative">
                      <input
                        type="text"
                        name="cardNumber"
                        maxLength={19}
                        className="input no-spin-button mr-[-3.5rem]"
                        placeholder="xxxx-xxxx-xxxx-xxxx"
                        onChange={props.handleChange}
                        onBlur={props.handleBlur}
                        value={props.values.cardNumber
                          .replace(/[\s\D]/g, "")
                          .replace(/(\d{4})/g, "$1 ")
                          .trim()}
                      />
                      {props.errors.cardNumber && props.touched.cardNumber && (
                        <span className="absolute right-20 p-2 select-none text-red-500">
                          {props.errors.cardNumber}
                        </span>
                      )}
                      <i className="fa-solid fa-credit-card text-3xl flex items-center"></i>
                    </div>

                    <div className="flex w-full">
                      <div className="mr-6 relative flex-1">
                        <input
                          type="text"
                          name="exp_date"
                          maxLength={5}
                          placeholder="exp date"
                          className="input no-spin-button mr-8"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.exp_date
                            .replace(/[\s\D]/g, "")
                            .replace(/(\d{2})(\d)/, "$1/$2")}
                        />
                        {props.errors.exp_date && props.touched.exp_date && (
                          <span className="right-2 p-2 select-none text-red-500">
                            {props.errors.exp_date}
                          </span>
                        )}
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          name="cvc"
                          maxLength={3}
                          placeholder="cvc"
                          className="input no-spin-button"
                          onChange={props.handleChange}
                          onBlur={props.handleBlur}
                          value={props.values.cvc.replace(/[\s\D]/g, "")}
                        />
                        {props.errors.cvc && props.touched.cvc && (
                          <span className="right-2 p-2 select-none text-red-500">
                            {props.errors.cvc}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-full bg-white p-10 flex justify-end">
                    <h1 className="text-4xl uppercase font-bold">
                      Total Price: HKD$ {totalPrice}
                    </h1>
                  </div>
                </div>
                <div className="w-[30rem] bg-white p-12 [&>*]:mb-10">
                  <div className="pborder-solid border-b pb-10">
                    <h1 className="text-4xl uppercase font-bold">Detail</h1>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-3xl font-bold">總價</h3>
                    <h3 className="text-3xl font-bold">${totalPrice}</h3>
                  </div>
                  <div className="flex justify-between">
                    <h3 className="text-3xl font-bold">運送費</h3>
                    <h3 className="text-3xl font-bold">$0</h3>
                  </div>
                  <div className="w-full flex flex-col [&>*]:mb-6">
                    <button type="submit" className="btn py-4 px-12">
                      送出訂單
                    </button>
                    <Link to="../cart" className="btn py-4 px-12">
                      <i className="fa-solid fa-rotate-left mr-3"></i>返回購物車
                    </Link>
                    <div className="text-6xl flex justify-center [&>*]:mr-6">
                      <i className="fa-brands fa-cc-stripe"></i>
                      <i className="fa-brands fa-cc-visa"></i>
                      <i className="fa-brands fa-cc-mastercard"></i>
                    </div>
                    <div>
                      信用卡資訊可使用Stripe提供之
                      <a
                        className="underline"
                        href="https://stripe.com/docs/testing"
                      >
                        測試卡號
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      )}
      {isLoading && <LoadingSpinner />}
    </div>
  );
};

export default CheckoutPage;
