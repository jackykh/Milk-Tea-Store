import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import Footer from "./Components/Footer";
import Menu from "./Pages/Menu";
import Address from "./Pages/Address";
import Login from "./Pages/Login";
import TestPage from "./Pages/TestPage";
import DetailPage from "./Pages/DetailPage";
import LogoutWrapper from "./Pages/Logout";
import { useSelector } from "react-redux";
import { RootState } from "./Store/redux";

function App() {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  let link: {
    [page: string]: string;
  };

  if (!isLoggedIn) {
    link = {
      home: "Home",
      menu: "Menu",
      login: "Login",
      address: "Address",
      test: "Test",
    };
  } else {
    link = {
      home: "Home",
      menu: "Menu",
      logout: "Logout",
      address: "Address",
      test: "Test",
    };
  }

  return (
    <div className="flex flex-col h-screen">
      <NavBar link={link} />
      <Routes>
        <Route path="home" element={<HomePage />} />
        <Route path="menu/:productId" element={<DetailPage />} />
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
        <Route path="test" element={<TestPage />} />
        <Route path="*" element={<Navigate to="home" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
