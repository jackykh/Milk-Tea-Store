import React from "react";

import Presentation from "../Components/Presentation";

const HomePage: React.FC = () => {
  const slideInfo = {
    title: "Explore A New World of Flavor",
    slides: [
      {
        caption: "不同口味的配料",
        caption2: "100% 有機水果",
        photoUrl: "Oranges__68426-transformed.png",
        backgroundColor: "bg-orange-100",
      },
      {
        caption: "採用紐西蘭淡奶油",
        caption2: "奶香四溢",
        photoUrl: "Flag-New-Zealand.webp",
        backgroundColor: "bg-rose-50",
      },
      {
        caption: "真正本土茶飲品牌",
        caption2: "2022年創立",
        photoUrl: "milktea.png",
        backgroundColor: "bg-purple-100",
      },
    ],
  };

  return <Presentation slideInfo={slideInfo} />;
};

export default HomePage;
