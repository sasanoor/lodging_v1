import React from "react";
import { Link } from "react-router-dom";
import config from "../config";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#282c34", color: "white" }}>
      <Link to="/" style={{ margin: "0 10px", color: "white" }}><h2 style={{ display: "inline", marginRight: "20px" }}>{config.appName}</h2></Link>
      <Link to="/add-guest" style={{ margin: "0 10px", color: "white" }}>Add Guest</Link>
      <Link to="/view-guest-list" style={{ margin: "0 10px", color: "white" }}>Guests List</Link>
      <Link to="/messages" style={{ margin: "0 10px", color: "white" }}>Messages</Link>
    </nav>
  );
}

export default Navbar;
