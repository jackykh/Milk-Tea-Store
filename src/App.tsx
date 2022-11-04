import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import Footer from "./Components/Footer";
import Menu from "./Pages/Menu";
import Address from "./Pages/Address";
import Login from "./Pages/Login";
import DetailPage from "./Pages/DetailPage";
import LogoutWrapper from "./Pages/Logout";
import { useAppSelector, useAppDispatch } from "./Store/redux/hooks";
import { authAction, authInfoType } from "./Store/redux/auth-Slice";
import { userAction } from "./Store/redux/user-Slice";
import { logoutThunk } from "./Store/redux/auth-Slice";
import CartPage from "./Pages/CartPage";
import Profile from "./Pages/Profile";
import ProductList from "./Pages/ProductList";
import AdminPage from "./Pages/Admin";
import EditProductPage from "./Pages/EditProductPage";
import EditPasswordPage from "./Pages/EditPasswordPage";
import SendResetEmailPage from "./Pages/SendResetEmailPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import CheckoutPage from "./Pages/CheckoutPage";
import OrderListPage from "./Pages/OrderListPage";
import UserAndCartGroup from "./Components/uiComponents/UserAndCartGroup";

function App() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = useAppSelector((state) => state.auth.token);
  const group = useAppSelector((state) => state.user.group);
  const isAdmin = group === "admin";
  const dispatch = useAppDispatch();

  useEffect(() => {
    const savedAuthInfo = localStorage.getItem("loginInfo");
    let timer: ReturnType<typeof setTimeout>;
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
      } catch (error: any) {
        alert(error.message || "Unknown Error");
      }
    };
    let authInfo: authInfoType;
    if (savedAuthInfo && token === "") {
      authInfo = JSON.parse(savedAuthInfo);
      const currentTime = new Date().getTime();
      if (authInfo.expirationTime > currentTime) {
        dispatch(authAction.login(authInfo));

        ////定時登出
        timer = setTimeout(() => {
          dispatch(logoutThunk);
        }, authInfo.expirationTime - currentTime);
      } else {
        dispatch(logoutThunk);
      }
    } else if (savedAuthInfo && token !== "") {
      fetchUserInfo(token);
    }
    return () => clearTimeout(timer);
  }, [dispatch, token]);

  let link: {
    [page: string]: string;
  };

  if (!isLoggedIn) {
    link = {
      home: "Home",
      menu: "Latest Products",
      products: "Product List",
      login: "Login",
      address: "Address",
    };
  } else if (isAdmin) {
    link = {
      home: "Home",
      menu: "Latest Products",
      products: "Product List",
      logout: "Logout",
      address: "Address",
      admin: "Admin",
    };
  } else {
    link = {
      home: "Home",
      menu: "Latest Products",
      products: "Product List",
      logout: "Logout",
      address: "Address",
    };
  }

  return (
    <div className="flex flex-col h-screen px-36 min-w-[128rem]">
      <div className="h-32 shrink-0 flex z-50">
        <NavBar link={link} />
        {isLoggedIn && <UserAndCartGroup />}
      </div>
      <Routes>
        <Route path="home" element={<HomePage />} />
        <Route path="products/:productId" element={<DetailPage />} />
        <Route path="products" element={<ProductList />} />
        <Route path="menu" element={<Menu />} />
        <Route path="address" element={<Address />} />

        <Route
          path="reset_password/a/:passwordToken"
          element={<ResetPasswordPage />}
        />
        <Route path="reset_password" element={<SendResetEmailPage />} />
        {!isLoggedIn && <Route path="login" element={<Login />} />}
        {isLoggedIn && (
          <Route
            path="logout"
            element={
              <LogoutWrapper>
                <Navigate to="home" replace />
              </LogoutWrapper>
            }
          />
        )}
        {isLoggedIn && <Route path="cart" element={<CartPage />} />}
        {isLoggedIn && <Route path="checkout" element={<CheckoutPage />} />}
        {isAdmin && (
          <Route path="admin/edit/:productId" element={<EditProductPage />} />
        )}
        {isAdmin && <Route path="admin" element={<AdminPage />} />}
        {isLoggedIn && <Route path="myorder" element={<OrderListPage />} />}
        {isLoggedIn && (
          <Route path="profile/edit_password" element={<EditPasswordPage />} />
        )}
        {isLoggedIn && <Route path="profile" element={<Profile />} />}
        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
