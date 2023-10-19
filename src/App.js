import logo from "./logo.svg";
import "./App.css";
import Home from "./components/Home/Home.jsx";
import Cart from "./components/Cart/Cart.jsx";
import Brand from "./components/Brand/Brand.jsx";
import WishList from "./components/WishList/WishList.jsx";
import Register from "./components/Register/Register.jsx";
import Login from "./components/Login/Login.jsx";
import Logout from "./components/Logout/Logout.jsx";
import Products from "./components/Products/Products.jsx";
import Layout from "./components/Layout/Layout.jsx";
import Category from "./components/Category/Category.jsx";
import NoutFound from "./components/NotFound/NotFound.jsx";
import {
  RouterProvider,
  createBrowserRouter,
  createHashRouter,
} from "react-router-dom";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import UserContextProvider from "./Context/UserContext";
import ProtectedRputer from "./components/ProtectedRputer/ProtectedRputer";
import Productsdetails from "./components/Productsdetails/Productsdetails";

import { Toaster } from "react-hot-toast";
import Profile from "./components/Profile/Profile";
import CartContextProvider from "./Context/CartContext";
import WishContextProvider from "./Context/WishlistContext";
import Checkout from "./components/Checkout/Checkout";
import AllOrder from "./components/AllOrder/AllOrder";
import Resetcode from "./components/Resetcode/Resetcode";
import ResetPassword from "./components/ResetPassword/ResetPassword";
let router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRputer>
            <Home />
          </ProtectedRputer>
        ),
      },
      {
        path: "Cart",
        element: (
          <ProtectedRputer>
            <Cart />
          </ProtectedRputer>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRputer>
            <WishList />
          </ProtectedRputer>
        ),
      },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "Profile", element: <Profile /> },
      {
        path: "brand",
        element: (
          <ProtectedRputer>
            <Brand />
          </ProtectedRputer>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRputer>
            <AllOrder />
          </ProtectedRputer>
        ),
      },
      { path: "Logout", element: <Logout /> },
      {
        path: "category",
        element: (
          <ProtectedRputer>
            <Category />
          </ProtectedRputer>
        ),
      },
      {
        path: "Productsdetails/:id",
        element: (
          <ProtectedRputer>
            <Productsdetails />
          </ProtectedRputer>
        ),
      },
      {
        path: "Checkout",
        element: (
          <ProtectedRputer>
            <Checkout />
          </ProtectedRputer>
        ),
      },
      { path: "ForgetPassword", element: <ForgetPassword /> },
      { path: "Resetcode", element: <Resetcode /> },
      { path: "ResetPassword", element: <ResetPassword /> },
      {
        path: "products",
        element: (
          <ProtectedRputer>
            <Products />
          </ProtectedRputer>
        ),
      },
      { path: "*", element: <NoutFound /> },
    ],
  },
]);

function App() {
  return (
    <>
      <WishContextProvider>
        <CartContextProvider>
          <UserContextProvider>
            <RouterProvider router={router}></RouterProvider>

            <Toaster />
          </UserContextProvider>
        </CartContextProvider>
      </WishContextProvider>
    </>
  );
}

export default App;
