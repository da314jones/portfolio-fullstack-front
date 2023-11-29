import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-container-home">
        <img src="/vetLogo.png" alt="" />
      </div>
      <div className="navbar-container-lst text-white text-xl">Journal</div>
      <div className="navbar-container-new text-white text-xl">New Entry</div>
    </div>
  );
}
