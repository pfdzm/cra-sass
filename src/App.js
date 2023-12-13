import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import "./App.scss";
import { useSelector } from "react-redux";

function App() {
  const theme = useSelector((state) => state.theme);
  return (
    <div className={`App ${theme}`}>
      <Navbar />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
