import React, { useEffect } from "react";
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
import { authThunk } from "./Store/redux/auth-Slice";
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

const App: React.FC = () => {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const group = useAppSelector((state) => state.user.group);
  const isAdmin = group === "admin";
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authThunk);
  }, [dispatch]);

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
};

export default App;
