import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import Footer from "./Components/Footer";
import Menu from "./Pages/Menu";
import Address from "./Pages/Address";
import Login from "./Pages/Login";
import TestPage from "./Pages/TestPage";
import DetailPage from "./Pages/DetailPage";
import CartIcon from "./Components/uiComponents/CartIcon";
import UserIcon from "./Components/uiComponents/UserIcon";
import LogoutWrapper from "./Pages/Logout";
import { useAppSelector, useAppDispatch } from "./Store/redux/hooks";
import { authAction, authInfoType } from "./Store/redux/auth-Slice";
import { userAction } from "./Store/redux/user-Slice";
import CartPage from "./Pages/CartPage";
import Profile from "./Pages/Profile";
import ProductList from "./Pages/ProductList";

function App() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const NnumberOfCartItem = useAppSelector((state) => state.cart.items.length);
  const token = useAppSelector((state) => state.auth.token);
  const userAvatar = useAppSelector((state) => state.user.avatar);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedAuthInfo = localStorage.getItem("loginInfo");

    const fetchUserInfo = async (token: string) => {
      try {
        const res = await fetch(
          (process.env.REACT_APP_SERVER as string) + "/api/user/get_userinfo",
          {
            method: "GET",
            headers: {
              Authorization: "bearer " + token,
            },
          }
        );
        const fetchedUserInfo = await res.json();
        if (!res.ok) {
          const error = new Error(fetchedUserInfo.message || "Server Error");
          throw error;
        }
        dispatch(userAction.setUser(fetchedUserInfo));
      } catch (error) {
        console.log(error);
      }
    };

    let authInfo: authInfoType;
    if (savedAuthInfo && token === "") {
      authInfo = JSON.parse(savedAuthInfo);
      const currentTime = new Date().getTime();
      if (authInfo.expirationTime > currentTime) {
        dispatch(authAction.login(authInfo));
      } else {
        dispatch(authAction.logout());
      }
    } else if (savedAuthInfo && token !== "") {
      fetchUserInfo(token);
    }
  }, [dispatch, token]);

  let link: {
    [page: string]: string;
  };

  if (!isLoggedIn) {
    link = {
      home: "Home",
      menu: "Menu",
      login: "Login",
      address: "Address",
    };
  } else {
    link = {
      home: "Home",
      menu: "Menu",
      products: "Product List",
      logout: "Logout",
      address: "Address",
    };
  }

  return (
    <div className="flex flex-col h-screen px-36">
      <div className="h-32 shrink-0 flex">
        <NavBar link={link} />
        {isLoggedIn && (
          <div className="translate-x-[-100%] flex">
            <UserIcon
              to="profile"
              photo={
                userAvatar !== ""
                  ? `${process.env.REACT_APP_SERVER}/${userAvatar}`
                  : "https://w7.pngwing.com/pngs/754/2/png-transparent-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-thumbnail.png"
              }
            />
            <CartIcon itemNumber={NnumberOfCartItem} />
          </div>
        )}
      </div>
      <Routes>
        <Route path="home" element={<HomePage />} />
        <Route path="products/:productId" element={<DetailPage />} />
        <Route path="products" element={<ProductList />} />
        <Route path="menu" element={<Menu />} />
        <Route path="address" element={<Address />} />
        <Route path="login" element={<Login />} />
        <Route
          path="logout"
          element={
            <LogoutWrapper>
              <Navigate to="home" replace />
            </LogoutWrapper>
          }
        />
        <Route path="cart" element={<CartPage />} />
        <Route path="test" element={<TestPage />} />
        <Route path="profile" element={<Profile />} />
        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
