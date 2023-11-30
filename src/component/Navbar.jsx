import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
const navigate = useNavigate();

const handleHome = () => {
  navigate(`/entries`)
}

  return (
    <div className="navbar-container">
      <div className="navbar-container-home">
        <div className="vetLogo-container">
          <img onClick={handleHome} className="vetLogo" src="/vetLogo.png" alt="" />
        </div>
        {/* <div className="new-log">
          {" "}
          <p className="text-black">New Log</p>
        </div> */}
      </div>
      <div className="navbar-container-new text-white text-xl"></div>
    </div>
  );
}
