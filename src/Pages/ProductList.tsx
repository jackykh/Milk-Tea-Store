import React from "react";
import ProductItem from "../Components/uiComponents/ProductItem";

const drinks = [
  {
    id: 1,
    name: "幽蘭拿鐵",
    description:
      "幽蘭拿鐵的製作方式是採用茶底+奶油+堅果。使用紅茶和碧根果製作而成。「幽蘭拿鐵」，採用進口紅茶，配以雀巢鮮奶、淡奶油和進口碧根果為原料。",
    price: 32,
    imgs: ["https://celestialteainghk.com/assets/images/drink_product05.jpg"],
  },
  {
    id: 2,
    name: "蔓越闌珊",
    description:
      "配以美國進口蔓越莓，酸酸甜甜的清爽果香融入茶韻，詮釋出清爽妙不可言的口感",
    price: 34,
    imgs: ["https://celestialteainghk.com/assets/images/drink_product05.jpg"],
  },
  {
    id: 3,
    name: "宇治抹茶",
    description:
      "宇治茶， 是日本的綠茶。茶葉主要產自京都府、奈良縣、滋賀縣、三重縣。",
    price: 38,
    imgs: ["https://celestialteainghk.com/assets/images/drink_product05.jpg"],
  },
];

const ProductList: React.FC = () => {
  const productList = drinks.map((drink) => {
    return (
      <ProductItem
        img={drink.imgs[0]}
        id={drink.id.toString()}
        caption={drink.name}
        caption2={"$" + drink.price}
      />
    );
  });

  const pagination = (
    <div className="flex justify-center [&>*]:mr-3 ">
      <button className="w-16 h-16 rounded-xl border-slate-900 border flex justify-center items-center hover:bg-purple-100 ">
        1
      </button>
      <button className="w-16 h-16 rounded-xl border-slate-900 border flex justify-center items-center hover:bg-purple-100 ">
        2
      </button>
      <button className="w-16 h-16 rounded-xl border-slate-900 border flex justify-center items-center hover:bg-purple-100 ">
        3
      </button>
    </div>
  );

  return (
    <div className="w-full bg-slate-100 p-32 flex flex-col [&>*]:mb-20">
      <div className="pb-10 border-b flex justify-center">
        <h3 className="text-4xl font-medium">產品列表</h3>
      </div>
      <div className="w-full grid grid-cols-autofit-30 grid-rows-1 gap-16">
        {productList}
      </div>
      {pagination}
    </div>
  );
};

export default ProductList;
