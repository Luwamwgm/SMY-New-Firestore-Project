import { useContext } from "react";
import { signOut } from "firebase/auth";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./Navbar.css";
import logo from "/images.jpeg";
import { useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleLogout = () => {
    console.log("logging out");
    signOut(auth)
      .then(() => {
        console.log("Signed out successfully");
        auth.setAuth(null);
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error("error logging out");
        //alert("Error logging out");
      });
  };

  return (
    <>
      <div className="class">
        {" "}
        <div className="logo-container">
          <a href="/">
            <img
              className="logo"
              src={logo}
              alt="SMY Children's Toys and Books Store Logo"
            />
          </a>
          <h2 className="hello">
            <a href="/">SMY Children's Toys and Books Store</a>
          </h2>
        </div>
        <div className="navbar">
          <nav>
            <ul>
              <li>
                {" "}
                <Link to="/" className="title">
                  {" "}
                  Home
                </Link>
              </li>

              <li>
                <NavLink to="/BuyingPage">Buy Items</NavLink>
              </li>

              <li>
                <NavLink to="/SellingPage">Sell Your Items</NavLink>
              </li>
              <li>
                {auth && auth.currentUser ? (
                  <button onClick={handleLogout}> Logout </button>
                ) : (
                  <button onClick={() => navigate("/login")}> Login </button>
                )}
              </li>
              <li>
                {" "}
                <button onClick={() => navigate("/signup")}> sign up </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
