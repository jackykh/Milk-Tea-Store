import React, { useEffect, useState } from "react";
import { useAppSelector } from "../Store/redux/hooks";
import Accordion from "../Components/uiComponents/Accordion";
import { v4 as uuidv4 } from "uuid";

type orderInfoType = Array<{
  orderId: string;
  orderItems: Array<{
    productId: string;
    productName: string;
    price: number;
    quantity: number;
  }>;
  status: string;
  totalPrice: number;
}>;

const OrderListPage: React.FC = () => {
  const token = useAppSelector((state) => state.auth.token);
  const [orderInfo, setOrderInfo] = useState<orderInfoType>([]);
  const [showFullOrderList, setShowFullOrderList] = useState(true);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const response = await fetch(
          (process.env.REACT_APP_SERVER as string) + "/order/get_orders",
          {
            method: "GET",
            headers: {
              Authorization: "bearer " + token,
            },
          }
        );
        const result = await response.json();
        if (!response.ok) {
          const error = new Error(result.message || "Unknown Error");
          throw error;
        }
        const adjustedOrderData = result.result.map((order: any) => {
          return {
            orderId: order._id,
            orderItems: order.orderItems.map((item: any) => {
              return {
                productId: item.product._id,
                productName: item.product.productName,
                price: item.product.price,
                quantity: item.quantity,
              };
            }),
            status: order.status,
            totalPrice: order.totalPrice,
          };
        });
        if (adjustedOrderData.length > 4) {
          setShowFullOrderList(false);
        }
        setOrderInfo(adjustedOrderData);
      } catch (error) {
        if (error instanceof Error) alert(error.message);
        console.log(error);
      }
    };
    if (token) {
      fetchOrderData();
    }
  }, [token]);

  const orderList = orderInfo.map((order) => {
    const content = order.orderItems.map((item) => {
      return (
        <div key={uuidv4()} className="border-b border-dashed border-gray-400">
          {Object.entries(item).map((props: [string, string | number]) => {
            return (
              <div
                key={uuidv4()}
                className="mb-2"
              >{`${props[0]} : ${props[1]}`}</div>
            );
          })}
        </div>
      );
    });

    const footer = [
      `訂單狀態：${order.status}`,
      `總價：$${order.totalPrice}`,
    ].map((value) => <h1 key={uuidv4()}>{value}</h1>);

    return (
      <Accordion
        key={order.orderId}
        title={`訂單編號：${order.orderId}`}
        content={content}
        footer={footer}
        className="mb-8"
      />
    );
  });

  return (
    <div className="w-full bg-slate-100 p-32 flex flex-col justify-center items-center [&>*]:mb-10">
      <div className="pb-10 border-b flex justify-center">
        <h3 className="text-4xl font-medium">訂單列表</h3>
      </div>
      <div
        className={`w-[60rem] ${
          !showFullOrderList && "h-[80rem] overflow-hidden"
        } relative`}
      >
        {orderList}
        {!showFullOrderList && (
          <div
            className="absolute bottom-0 w-full h-[15rem] bg-gradient-to-t from-[rgba(241,245,249,0.9)] to-transparent hover:from-[rgba(241,245,249,0.7)] cursor-pointer"
            onClick={() => setShowFullOrderList(true)}
          >
            <button className="absolute bottom-8 right-1/2 translate-x-1/2">
              展開全部訂單
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderListPage;
