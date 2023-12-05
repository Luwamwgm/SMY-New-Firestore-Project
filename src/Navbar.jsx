import { useContext } from "react";
import { signOut } from "firebase/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed out successfully");
        //navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="navbar">
      <nav>
        <ul>
          <li>
            <Link to="/BuyingPage" className="title">
              SMY Children's toys and books store
            </Link>
            <div className="menu">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </li>
          <li>
            {" "}
            <NavLink to="/">About Us</NavLink>
          </li>

          <li>
            <NavLink to="/SellingPage">Selling</NavLink>
          </li>
          <li>
            {auth && auth.currentUser ? (
              <button onClick={handleLogout}> Logout </button>
            ) : (
              <button onClick={() => navigate("/login")}> Login </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}
