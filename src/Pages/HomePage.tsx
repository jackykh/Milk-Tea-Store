import React from "react";

import Presentation from "../Components/Presentation";
import { v4 as uuidv4 } from "uuid";

const slideInfo = {
  title: "Explore A New World of Flavor",
  slides: [
    {
      id: uuidv4(),
      caption: "不同口味的配料",
      caption2: "100% 有機水果",
      photoUrl: "Oranges__68426-transformed.png",
      backgroundColor: "bg-orange-100",
    },
    {
      id: uuidv4(),
      caption: "採用紐西蘭淡奶油",
      caption2: "奶香四溢",
      photoUrl: "NZ-New-Zealand-Flag-icon.png",
      backgroundColor: "bg-rose-50",
    },
    {
      id: uuidv4(),
      caption: "真正本土茶飲品牌",
      caption2: "2022年創立",
      photoUrl: "milktea.png",
      backgroundColor: "bg-purple-100",
    },
  ],
};

const HomePage: React.FC = () => {
  return <Presentation slideInfo={slideInfo} />;
};

export default HomePage;
