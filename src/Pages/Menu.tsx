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
      additionalLink: "../products/6368b9f2185823dcc5307e13",
    },
    {
      id: uuidv4(),
      caption: "香滑奶蓋",
      photoUrl: "milktea.png",
      backgroundColor: "bg-purple-100",
      additionalLink: "../products/6368d5a8185823dcc5307e31",
    },
    {
      id: uuidv4(),
      caption: "水果茶",
      photoUrl: "milktea.png",
      backgroundColor: "bg-lime-100",
      additionalLink: "../products/6368d544185823dcc5307e24",
    },
  ],
};

const Menu: React.FC = () => {
  return <Presentation slideInfo={slideInfo} />;
};

export default Menu;
