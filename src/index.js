import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "../src/components/LoginForm";
import Home from "./components/Home";
import Profile from "./components/Profile";
import App from "./App";
// import { Navigate } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <LoginForm />
        <Outlet />
      </>
    ),
    errorElement: <p>Page Not Found</p>,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/Home",
    element: <Home />,
  },
  {
    path: "/App",
    element: <App />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
