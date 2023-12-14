import "./App.css";
import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Error from "./Error";
import Signup from "./Signup";
import Login from "./Login";
import AuthProvider from "./AuthContext";
import Writer from "./Selling";
import Reader from "./Reader";
import Selling from "./Selling";

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    console.log("AUTH ==> ", auth);
  }, [auth]);

  const router = createBrowserRouter([
    { path: "/login", element: <Login />, errorElement: <Error /> },
    { path: "/signup", element: <Signup /> },
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Home />, errorElement: <Error /> },

        {
          path: "/SellingPage",
          element: auth?.currentUser ? (
            <Selling auth={auth} />
          ) : (
            <Navigate to="/login " replace />
          ),
        },
        {
          path: "/BuyingPage",
          element: <Reader auth={false} />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider {...{ auth, setAuth }}>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
