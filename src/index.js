import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginForm from "../src/components/LoginForm";
import Home from "./components/Home";
import Profile from "./components/Profile";
import App from "./App";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Home />
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
    path: "/login",
    element: <LoginForm />,
  },
  {
    path: "/App",
    element: <App />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
