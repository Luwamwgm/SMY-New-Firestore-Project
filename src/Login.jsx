import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import { firebaseAuth } from "./firebase-config";
import "./Login.css";
// https://stackoverflow.com/questions/65948671/how-to-go-back-to-previous-route-in-react-router-dom-v6

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(
        firebaseAuth,
        email,
        password
      );

      // Signed in
      const user = userCredential.user;
      console.log("Login successful. Navigating to /SellingPage");
      navigate("/SellingPage");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("Login error:", errorCode, errorMessage);
      alert("Wrong email or password, Please try again!");
      // Display error message to the user
    } finally {
      setLoading(false);
    }
  };
  /* signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        //navigate(-1) || navigate("/selling");
        //console.log(user.id);
        console.log("Login successful. Navigating to /SellingPage");
        navigate("/SellingPage");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Login error:", errorCode, errorMessage);
        alert("please try again");
      });
  };*/

  return (
    <>
      <main>
        <section>
          <div>
            <h2>To the Selling page Please</h2>
            <h1>Login</h1>

            <form onSubmit={onLogin}>
              <div>
                <label htmlFor="email-address">Email address</label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  required
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <button type="submit">Login</button>
              </div>
            </form>

            <p className="text-sm text-white text-center">
              No account yet? <NavLink to="/signup">Sign up</NavLink>
            </p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
