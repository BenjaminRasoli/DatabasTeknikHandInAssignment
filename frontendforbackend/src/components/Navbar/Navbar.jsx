import React from "react";
import "./Navbar.css";
import { Link, NavLink } from "react-router";

function Navbar() {
  return (
    <div className="navbarWrapper">
      <ul className="navbar">
        <li>
          <Link to="/">
            <h1>noxfort</h1>
          </Link>
        </li>
        <NavLink to="/upload">
          <button className="uploadButton">upload project</button>
        </NavLink>
      </ul>
    </div>
  );
}

export default Navbar;
