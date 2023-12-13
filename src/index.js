import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import FetchData from "./FetchData";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SassExample from "./SassExample";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <SassExample />,
      },
      {
        path: "/fetch-data",
        element: <FetchData />,
      },
    ],
  },
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
