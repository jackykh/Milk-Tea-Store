import React from "react";
import { useAppDispatch } from "../../Store/redux/hooks";
import { cartAction } from "../../Store/redux/cart-Slice";
import CheckBox from "./CheckBox";

interface cartItem {
  cartitem: {
    id: string;
    name: string;
    price: number;
    options: string[];
    number: number;
    photoUrl: string;
  };
}

const checkBoxOptions = [
  {
    id: "noIce",
    content: "走冰",
  },
  {
    id: "moreIce",
    content: "加冰",
  },
  {
    id: "lessSweet",
    content: "少甜",
  },
];

const CartItem: React.FC<cartItem> = (props) => {
  const {
    id: productId,
    name,
    price,
    number,
    photoUrl,
    options,
  } = props.cartitem;

  const dispatch = useAppDispatch();

  const numberOptions = (maxNumber: number): React.ReactElement[] => {
    const options: React.ReactElement[] = [];
    for (let i = 1; i <= maxNumber; i++) {
      options.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  const deleteHandler = () => {
    dispatch(cartAction.deleteItem({ id: productId }));
  };

  const getCheckBoxValue = (checkedOptions: string) => {
    dispatch(cartAction.changeOptions({ id: productId, checkedOptions }));
  };

  const numberChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(
      cartAction.changeNumber({ id: productId, number: +event.target.value })
    );
  };

  return (
    <div className="w-full bg-white h-[20rem] p-10 flex relative">
      <i
        className="fa-regular fa-circle-xmark absolute top-4 right-4 text-4xl text-purple-900 cursor-pointer"
        onClick={deleteHandler}
      ></i>
      <div className="w-[10rem] object-contain flex justify-center items-center mr-6">
        <img src={photoUrl} className="w-[8rem]" alt="product" />
      </div>
      <div className="flex-1 [&>*]:mb-6">
        <h3 className="text-5xl text-red-500 bold">${price}</h3>
        <h3>{name}</h3>
        <div className="flex [&>*]:mr-3">
          <div className="flex [&>*]:mr-3">
            <CheckBox
              options={checkBoxOptions}
              name={"milkTeaOptions_" + productId}
              checked={options}
              sendValueToFather={getCheckBoxValue}
            />
          </div>
          <h3>數量：</h3>
          <select
            id="select"
            defaultValue={number}
            onChange={numberChangeHandler}
          >
            {numberOptions(10)}
          </select>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CartItem;
