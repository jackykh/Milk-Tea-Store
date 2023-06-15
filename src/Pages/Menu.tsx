import React from "react";

import Presentation from "../Components/Presentation";
import { v4 as uuidv4 } from "uuid";

const slideInfo = {
  title: "Latest Products",
  slides: [
    {
      id: uuidv4(),
      caption: "經典奶茶",
      photoUrl: "milktea.png",
      backgroundColor: "bg-rose-50",
      additionalLink: "../products/648ac6cfda0cf1e6087a9303",
    },
    {
      id: uuidv4(),
      caption: "粉條奶茶",
      photoUrl: "milktea.png",
      backgroundColor: "bg-purple-100",
      additionalLink: "../products/648ac722da0cf1e6087a9317",
    },
    {
      id: uuidv4(),
      caption: "香橙茶",
      photoUrl: "milktea.png",
      backgroundColor: "bg-lime-100",
      additionalLink: "../products/648ac784da0cf1e6087a931c",
    },
  ],
};

const Menu: React.FC = () => {
  return <Presentation slideInfo={slideInfo} />;
};

export default Menu;
