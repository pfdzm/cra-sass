import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import FetchData from "./FetchData";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SassExample from "./SassExample";
import { store } from "./store";
import { Provider as ReduxProvider } from "react-redux";

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
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
);
