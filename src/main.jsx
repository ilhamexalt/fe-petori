import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import User from "./pages/User";
import Store from "./pages/Store";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StoreDetail from "./pages/StoreDetail";
import Setting from "./pages/Setting";
import Profile from "./pages/Profile";
import ContactUs from "./pages/ContactUs";
import Verification from "./pages/Verification";
import ForgotPassword from "./pages/auth/ForgotPassword";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Service from "./pages/Service";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Login />,
    errorElement: <Error />,
  },
  {
    path: "/signup",
    element: <Register />,
    errorElement: <Error />,
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />,
    errorElement: <Error />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    errorElement: <Error />,
  },
  {
    path: "/user",
    element: <User />,
    errorElement: <Error />,
    children: [
      {
        path: "/user/:id",
        element: <User />,
      },
    ],
  },
  {
    path: "/store",
    element: <Store />,
    errorElement: <Error />,
    children: [
      {
        path: "/store/:id",
        element: <Store />,
      },
    ],
  },
  {
    path: "/storedetail/:id",
    element: <StoreDetail />,
    errorElement: <Error />,
  },
  {
    path: "/setting",
    element: <Setting />,
    errorElement: <Error />,
  },
  {
    path: "/profile",
    element: <Profile />,
    errorElement: <Error />,
  },
  {
    path: "/contactus",
    element: <ContactUs />,
    errorElement: <Error />,
  },
  {
    path: "/verification",
    element: <Verification />,
    errorElement: <Error />,
    children: [
      {
        path: "/verification/:id",
      },
    ],
  },
  {
    path: "/service",
    element: <Service />,
    errorElement: <Error />,
    children: [
      {
        path: "/service/:id",
        element: <Service />,
      },
    ],
  },
]);

const queryClient = new QueryClient({
  // defaultOptions: {
  //   queries: {
  //     refetchIntervalInBackground: false,
  //     cacheTime: 10_000,
  //     refetchOnWindowFocus: false,
  //   },
  // },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
