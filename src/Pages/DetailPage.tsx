import React, { useState, useEffect } from "react";
import Gallery from "../Components/uiComponents/Gallery";
import CheckBox from "../Components/uiComponents/CheckBox";
import NumberInput from "../Components/uiComponents/NumberInput";
import Button from "../Components/uiComponents/Button";
import LoadingSpinner from "../Components/uiComponents/LoadingSpinner";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Store/redux/hooks";
import { cartAction } from "../Store/redux/cart-Slice";

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

const drinks = [
  {
    id: 1,
    name: "幽蘭拿鐵",
    description:
      "幽蘭拿鐵的製作方式是採用茶底+奶油+堅果。使用紅茶和碧根果製作而成。「幽蘭拿鐵」，採用進口紅茶，配以雀巢鮮奶、淡奶油和進口碧根果為原料。",
    price: 32,
    imgs: [
      "../milktea.png",
      "../milktea.png",
      "../milktea.png",
      "../milktea.png",
    ],
  },
  {
    id: 2,
    name: "蔓越闌珊",
    description:
      "配以美國進口蔓越莓，酸酸甜甜的清爽果香融入茶韻，詮釋出清爽妙不可言的口感",
    price: 34,
    imgs: [
      "../milktea.png",
      "../milktea.png",
      "../milktea.png",
      "../milktea.png",
    ],
  },
  {
    id: 3,
    name: "宇治抹茶",
    description:
      "宇治茶， 是日本的綠茶。茶葉主要產自京都府、奈良縣、滋賀縣、三重縣。",
    price: 38,
    imgs: [
      "../milktea.png",
      "../milktea.png",
      "../milktea.png",
      "../milktea.png",
    ],
  },
];

const DetailPage: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();

  let { productId } = useParams();
  let navigate = useNavigate();
  const [product, setProduct] = useState({
    id: 0,
    name: "",
    description: "",
    price: 0,
    imgs: [""],
  });
  const [isLoading, setLoading] = useState(true);
  let adjustedId: number;
  if (productId) {
    adjustedId = +productId;
  }

  useEffect(() => {
    setTimeout(() => {
      const drink = drinks.find((info) => {
        return info.id === adjustedId;
      });
      if (drink) {
        setProduct(drink);
        setLoading(false);
      }
    }, 1000);
  });

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      return navigate("../login");
    }
    const number = +(
      e.currentTarget.elements.namedItem("milkteaNumber") as HTMLInputElement
    ).value;
    if (number === 0) {
      return;
    }

    const milkteaOptions = e.currentTarget.elements.namedItem(
      `${productId}_milkteaOptions`
    ) as RadioNodeList;
    const options = [];

    for (let i = 0; i < milkteaOptions.length; i++) {
      const option = milkteaOptions[i] as HTMLInputElement;
      if (option.checked) {
        options.push(option.value);
      }
    }

    const orderData = {
      id: productId,
      name: product.name,
      options: options,
      price: product.price,
      number: number,
      photoUrl: "milktea.png",
    };

    dispatch(cartAction.addItem({ item: orderData }));
  };

  return (
    <div className="h-full w-full">
      <div className="w-full h-full bg-slate-100 flex justify-center items-center">
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <div className="w-9/12 h-[50rem] flex justify-center items-center bg-white border-gray-200 border">
            <div className="flex w-[80rem]">
              <Gallery size={30} imgs={product.imgs} />
              <form
                className="flex flex-col  ml-20 [&>*]:mb-6 justify-center
          "
                onSubmit={onSubmitHandler}
              >
                <h1 className="text-4xl">{product.name}</h1>
                <h2 className="text-3xl">{`價錢：$${product.price}`}</h2>
                <h3 className="w-9/12">{product.description}</h3>
                <CheckBox
                  options={checkBoxOptions}
                  name={`${productId}_milkteaOptions`}
                />
                <NumberInput id="milkteaNumber" max={10} />
                <div className="flex [&>*]:mr-6">
                  <button type="submit" className="btn py-4 px-12">
                    下單
                  </button>
                  <Button to="../menu">返回菜單</Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
