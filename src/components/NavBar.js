import React from "react";
import { NavLink } from "react-router-dom";

const linkStyles = {
    width: "100px",
    padding: "12px",
    margin: "0 6px 6px",
    background: "#097969",
    textDecoration: "none",
    color: "white",
};

function NavBar() {
    return (
        <div className="navbar">
            <NavLink to="/" exact style={linkStyles}>
                About
            </NavLink>
            <NavLink to="/gardeners" exact style={linkStyles}>
                Gardeners
            </NavLink>
            <NavLink to="/gardens" exact style={linkStyles}>
                Gardens
            </NavLink>
            <NavLink to="/plants" exact style={linkStyles}>
                Plants
            </NavLink>
        </div>
    );
}

export default NavBar;
