import React, { forwardRef } from "react";

interface UserIconPropsType {
  photo: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const UserIcon = forwardRef<HTMLButtonElement, UserIconPropsType>(
  (props, ref) => {
    return (
      <div className="h-full flex justify-center items-center p-8">
        <button
          ref={ref}
          className="rounded-full border-solid border h-12 w-12 bg-cover"
          style={{ backgroundImage: `url(${props.photo})` }}
          onClick={props.onClick}
        >
          &nbsp;
        </button>
      </div>
    );
  }
);

export default UserIcon;
