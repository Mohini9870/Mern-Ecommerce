//import { Counter } from './features/counter/Counter';
import "./App.css";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

import { createBrowserRouter,  RouterProvider } from "react-router-dom";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import Protected from "./features/auth/components/Protected";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAuthAsync,
  selectLoggedInUser,
  selectUserChecked,
} from "./features/auth/authSlice";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetailPage from "./pages/AdminProductDetailPage";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import StripeCheckout from "./pages/StripeCheckout";
import ResetPasswordPage from "./pages/ResetPasswordPage";

const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdmin>
        <AdminHome />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/cart",
    element: (
      <Protected>
        <CartPage />
      </Protected>
    ),
  },
  {
    path: "/checkout",
    element: (
      <Protected>
        <Checkout />
      </Protected>
    ),
  },
  {
    path: "/product-detail/:id",
    element: (
      <Protected>
        <ProductDetailPage />
      </Protected>
    ),
  },
  {
    path: "/admin/product-detail/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage />
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/orders",
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/admin/product-form/edit/:id",
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/order-success/:id",
    element: (
      <Protected>
        <OrderSuccessPage></OrderSuccessPage>{" "}
      </Protected>
    ),
  },
  {
    path: "/my-orders",
    element: (
      <Protected>
        <UserOrdersPage></UserOrdersPage>{" "}
      </Protected>
    ),
  },
  {
    path: "/profile",
    element: (
      <Protected>
        <UserProfilePage/>
      </Protected>
    ),
  },
  {
    path: "/stripe-checkout/",
    element: (
      <Protected>
        <StripeCheckout/>
      </Protected>
    ),
  },
  {
    path: "/logout",
    element: <Logout/>
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage/>
  },
  {
    path: "/reset-password",
    element: <ResetPasswordPage/>
  },
  {
    path: "*",
    element: <PageNotFound/>
  },
]);

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const userChecked = useSelector(selectUserChecked);

  useEffect(() => {
    dispatch(checkAuthAsync());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync());
      // we can get req.user by token on backend so no need to give in front-end
      dispatch(fetchLoggedInUserAsync());
    }
  }, [dispatch, user]);

  return (
    <>
      <div className="App">
        {userChecked && (
          <Provider template={AlertTemplate} {...options}>
            <RouterProvider router={router} />
          </Provider>
        )}
        {/* Link must be inside the Provider */}
      </div>
    </>
  );
}

export default App;
