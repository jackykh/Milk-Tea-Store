import CartItem from "../Components/uiComponents/CartItem";
import { useAppDispatch, useAppSelector } from "../Store/redux/hooks";
import { orderAction } from "../Store/redux/order.Slice";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const CartPage = () => {
  const navigate = useNavigate();
  const dispacth = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);

  let CartItems;
  CartItems = items.map((item) => {
    return <CartItem key={uuidv4()} cartitem={item} />;
  });
  const subTotal = items.reduce((previousValue, currentItem) => {
    return previousValue + currentItem.price * currentItem.number;
  }, 0);

  const isCartEmpty = items.length === 0;

  const emptyCart = (
    <div className="w-[50rem] h-[30rem] flex flex-col justify-center items-center [&>*]:mb-8">
      <i className="fa-solid fa-cart-shopping text-4xl "></i>
      <h1 className="text-4xl font-bold">Your cart is empty</h1>
    </div>
  );

  const submitOrderHandler = () => {
    const adjustedOrder = items.map((item) => {
      return {
        productId: item.id,
        options: item.options,
        quantity: item.number,
      };
    });
    dispacth(
      orderAction.setOrder({ totalPrice: subTotal, orderItems: adjustedOrder })
    );
    navigate("../checkout");
  };

  return (
    <div className="w-full bg-slate-100 py-16 px-32">
      <div className=" w-full flex justify-center items-start">
        {isCartEmpty ? (
          emptyCart
        ) : (
          <>
            <div className="w-[50rem] [&>*]:mb-6 mr-6">
              <div className="w-full bg-white p-10">
                <h1 className="text-4xl uppercase font-bold">購物車</h1>
              </div>
              {CartItems}
              <div className="w-full bg-white p-10 flex justify-end">
                <h1 className="text-4xl uppercase font-bold">
                  SUB-TOTAL: HKD$ {subTotal}
                </h1>
              </div>
            </div>
            <div className="w-[30rem] bg-white p-12 [&>*]:mb-10">
              <div className="pborder-solid border-b pb-10">
                <h1 className="text-4xl uppercase font-bold">CheckOut</h1>
              </div>
              <div className="flex justify-between">
                <h3 className="text-3xl font-bold">小計</h3>
                <h3 className="text-3xl font-bold">${subTotal}</h3>
              </div>
              <div className="flex justify-between">
                <h3 className="text-3xl font-bold">運送費</h3>
                <h3 className="text-3xl font-bold">$0</h3>
              </div>
              <button className="btn py-4 px-12" onClick={submitOrderHandler}>
                結帳
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
