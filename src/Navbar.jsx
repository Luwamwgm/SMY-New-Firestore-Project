import { useContext } from "react";
import { signOut } from "firebase/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import "./Navbar.css";
//import logo from "./images.jpeg";

export default function Navbar() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const handleLogout = () => {
    console.log("logging out");
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Signed out successfully");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <h1 className="hello">SMY Children's Toys and Books Store</h1>

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
              <NavLink to="/BuyingPage">Buying</NavLink>
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
            <li>
              {" "}
              <button onClick={() => navigate("/signup")}> sign up </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
