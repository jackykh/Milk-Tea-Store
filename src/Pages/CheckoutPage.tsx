import React from "react";
import { useAppSelector } from "../Store/redux/hooks";
import { Formik, Form, Field } from "formik";
import Input from "../Components/uiComponents/Input";

interface creditCardFormType {
  cardNumber: string;
  exp_date: string;
  cvc: string;
}

const CheckoutPage: React.FC = () => {
  const { totalPrice, orderItems } = useAppSelector((state) => state.order);
  const { token } = useAppSelector((state) => state.auth);

  const isNotEmptyValidator = (formName: string, value: string) => {
    if (value.trim().length === 0) {
      return `${formName} 不能為空`;
    }
  };

  const onSubmitHandler = async (creditCardInfo: creditCardFormType) => {
    const exp_month = creditCardInfo.exp_date.slice(0, 2);
    const exp_year = "20" + creditCardInfo.exp_date.slice(2, 4);
    const adjustedValue = {
      cardNumber: creditCardInfo.cardNumber,
      exp_month,
      exp_year,
      cvc: creditCardInfo.cvc,
    };
    try {
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
            creditCardInfo: adjustedValue,
          }),
        }
      );
      const result = await response.json();
      if (!response.ok) {
        const error = new Error(result.message || "Unknown Error");
        throw error;
      }
      alert(result.message);
      console.log(result);
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="w-full bg-slate-100 py-16 px-32">
      <Formik
        initialValues={{ cardNumber: "", exp_date: "", cvc: "" }}
        onSubmit={(values) => {
          onSubmitHandler(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className=" w-full flex justify-center items-start">
              <div className="w-[50rem] [&>*]:mb-6 mr-6">
                <div className="w-full bg-white p-10">
                  <h1 className="text-4xl uppercase font-bold">Check out</h1>
                </div>
                <div className="w-full bg-white p-10 [&>*]:mb-10">
                  <h3 className="font-bold">信用卡資訊</h3>

                  <div className="flex w-full relative">
                    <Field
                      validate={isNotEmptyValidator.bind(null, "卡號")}
                      name="cardNumber"
                      type="tel"
                      className="input mr-[-3.5rem]"
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                      as={Input}
                    />
                    {errors.cardNumber && touched.cardNumber && (
                      <span className="absolute right-20 p-2 select-none text-red-500">
                        {errors.cardNumber}
                      </span>
                    )}
                    <i className="fa-solid fa-credit-card text-3xl flex items-center"></i>
                  </div>

                  <div className="flex w-full">
                    <div className="mr-6 relative">
                      <Field
                        validate={isNotEmptyValidator.bind(null, "有效期")}
                        name="exp_date"
                        type="tel"
                        className="input"
                        placeholder="xx/xx"
                        as={Input}
                      />
                      {errors.exp_date && touched.exp_date && (
                        <span className="absolute right-2 p-2 select-none text-red-500">
                          {errors.exp_date}
                        </span>
                      )}
                    </div>
                    <div className="relative">
                      <Field
                        validate={isNotEmptyValidator.bind(null, "cvc")}
                        name="cvc"
                        type="tel"
                        className="input"
                        placeholder="cvc"
                        as={Input}
                      />
                      {errors.cvc && touched.cvc && (
                        <span className="absolute right-2 p-2 select-none text-red-500">
                          {errors.cvc}
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
                <button type="submit" className="btn py-4 px-12">
                  送出訂單
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CheckoutPage;
