import React from "react";

import Presentation from "../Components/Presentation";

const Menu: React.FC = () => {
  const slideInfo = {
    title: "Menu",
    slides: [
      {
        caption: "幽蘭拿鐵",
        photoUrl: "milktea.png",
        backgroundColor: "bg-rose-50",
        additionalLink: "../products/1",
      },
      {
        caption: "蔓越闌珊",
        photoUrl: "milktea.png",
        backgroundColor: "bg-purple-100",
        additionalLink: "../products/2",
      },
      {
        caption: "宇治抹茶",
        photoUrl: "milktea.png",
        backgroundColor: "bg-lime-100",
        additionalLink: "../products/3",
      },
    ],
  };

  return <Presentation slideInfo={slideInfo} />;
};

export default Menu;
