import { Link } from "react-router-dom";
import "./Navbar.scss";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggle } from "./features/themeSlice";

export default function Navbar() {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/fetch-data">Fetch data</Link>
      <button onClick={() => dispatch(toggle())}>
        {theme === "light" ? "🌝" : "🌞"}
      </button>
    </nav>
  );
}
