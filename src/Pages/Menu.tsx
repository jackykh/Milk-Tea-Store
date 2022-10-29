import React from "react";

import Presentation from "../Components/Presentation";

const Menu: React.FC = () => {
  const slideInfo = {
    title: "Menu",
    slides: [
      {
        caption: "經典奶茶",
        photoUrl: "milktea.png",
        backgroundColor: "bg-rose-50",
        additionalLink: "../products/635a32a528d08d7ff237ecb3",
      },
      {
        caption: "香滑奶蓋",
        photoUrl: "milktea.png",
        backgroundColor: "bg-purple-100",
        additionalLink: "../products/635a331728d08d7ff237ecb6",
      },
      {
        caption: "水果茶",
        photoUrl: "milktea.png",
        backgroundColor: "bg-lime-100",
        additionalLink: "../products/635a335428d08d7ff237ecb9",
      },
    ],
  };

  return <Presentation slideInfo={slideInfo} />;
};

export default Menu;
