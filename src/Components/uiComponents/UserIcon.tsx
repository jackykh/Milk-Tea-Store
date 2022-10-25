import React from "react";
import { Link } from "react-router-dom";

const UserIcon: React.FC<{ to: string; photo: string }> = (props) => {
  return (
    <div className="h-full flex justify-center items-center p-8">
      <Link
        to={props.to}
        className="rounded-full border-solid border h-12 w-12 bg-cover"
        style={{ backgroundImage: `url(${props.photo})` }}
      >
        &nbsp;
      </Link>
    </div>
  );
};

export default UserIcon;
