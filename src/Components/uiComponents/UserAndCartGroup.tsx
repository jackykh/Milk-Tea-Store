import { useState, useRef, useCallback } from "react";
import { useAppSelector } from "../../Store/redux/hooks";
import UserIcon from "./UserIcon";
import CartIcon from "./CartIcon";
import Dropdown from "./Dropdown";
import { AnimatePresence } from "framer-motion";

const UserAndCartGroup = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userIconRef = useRef<HTMLButtonElement>(null);
  const avatar = useAppSelector((state) => state.user.avatar);
  const NnumberOfCartItem = useAppSelector((state) => state.cart.items.length);
  const userIconOnClickHandler = () => {
    setShowUserDropdown((prevState) => !prevState);
  };
  const closeDropdown = useCallback((clickedItem: Node) => {
    if (userIconRef.current && !userIconRef.current.contains(clickedItem)) {
      setShowUserDropdown(false);
    }
  }, []);
  const userInfoLink = {
    profile: "Profile",
    myorder: "Order",
  };
  return (
    <div className="translate-x-[-100%] flex">
      <UserIcon
        photo={
          avatar !== ""
            ? `${process.env.REACT_APP_SERVER}/${avatar}`
            : "https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png"
        }
        onClick={userIconOnClickHandler}
        ref={userIconRef}
      />
      <CartIcon itemNumber={NnumberOfCartItem} />
      <AnimatePresence>
        {showUserDropdown && (
          <Dropdown
            link={userInfoLink}
            className="top-[90%] right-0 shadow"
            onClose={closeDropdown}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserAndCartGroup;
