import React, { useState, useEffect } from "react";
import Gallery from "../Components/uiComponents/Gallery";
import CheckBox from "../Components/uiComponents/CheckBox";
import NumberInput from "../Components/uiComponents/NumberInput";
import Button from "../Components/uiComponents/Button";
import LoadingSpinner from "../Components/uiComponents/LoadingSpinner";
import { useParams, useNavigate, Link } from "react-router-dom";
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

const DetailPage: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const group = useAppSelector((state) => state.user.group);
  const dispatch = useAppDispatch();

  let { productId } = useParams();
  let navigate = useNavigate();
  const [product, setProduct] = useState({
    id: "",
    productName: "",
    description: "",
    price: 0,
    photos: [""],
  });
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await fetch(
          process.env.REACT_APP_SERVER +
            `/api/products/get_product/${productId}`
        );
        const result = await response.json();
        if (!response.ok) {
          const error = new Error(result.message || "Unknown Error");
          throw error;
        }
        const { _id, productName, description, price, photos } = result.product;
        const adjustedPhotosUrl = (photos as Array<string>).map((photo) => {
          return `${process.env.REACT_APP_SERVER}/${photo}`;
        });
        setProduct({
          id: _id,
          productName: productName,
          description: description,
          price: price,
          photos: adjustedPhotosUrl,
        });
        setLoading(false);
      } catch (error: any) {
        if (error.message) {
          setError(error.message as string);
        } else {
          setError("Unknown Error");
        }

        setLoading(false);
      }
    };
    getProducts();
  }, [productId]);

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
      name: product.productName,
      options: options,
      price: product.price,
      number: number,
      photoUrl: product.photos[0],
    };

    dispatch(cartAction.addItem({ item: orderData }));
  };

  return (
    <div className="h-full w-full">
      <div className="w-full h-full bg-slate-100 flex justify-center items-center">
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <div className="w-9/12 h-[50rem] flex justify-center items-center bg-white border-gray-200 border">
            {!error && (
              <div className="flex w-[80rem] relative">
                {group === "admin" && (
                  <Link
                    to={`../admin/edit/${product.id}`}
                    className="absolute top-0 right-0 text-purple-900 flex flex-col items-center p-3 rounded hover:bg-slate-100"
                  >
                    <i className="fa-solid fa-pen-to-square text-2xl"></i>
                    <span className="text-xl">編輯產品</span>
                  </Link>
                )}
                <Gallery size={30} imgs={product.photos} />
                <form
                  className="flex flex-col  ml-20 [&>*]:mb-6 justify-center
          "
                  onSubmit={onSubmitHandler}
                >
                  <h1 className="text-4xl">{product.productName}</h1>
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
                    <Button to="../products">返回菜單</Button>
                  </div>
                </form>
              </div>
            )}
            {error && (
              <div className="w-[50rem] h-[30rem] flex flex-col justify-center items-center [&>*]:mb-8">
                <i className="fa-solid fa-cart-shopping text-4xl "></i>
                <h1 className="text-4xl font-bold">{error}</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailPage;
