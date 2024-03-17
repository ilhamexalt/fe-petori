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

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StoreDetail from "./pages/StoreDetail";
import Setting from "./pages/Setting";
import Profile from "./pages/Profile";
import ContactUs from "./pages/ContactUs";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/user",
    element: <User />,
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
  },
  {
    path: "/setting",
    element: <Setting />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/contactus",
    element: <ContactUs />,
  },
]);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchIntervalInBackground: false,
      cacheTime: 10_000,
      refetchOnWindowFocus: false,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  </React.StrictMode>
);
