import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase-config";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
//import "./App.css";
import "./Buying.css";

export default function Reader({}) {
  const auth = useContext(AuthContext);
  const [name, setName] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    if (auth && auth.currentUser) {
      const { displayName, email } = auth.currentUser;
      setName(displayName || email);
    }

    const fetchPost = async () => {
      const querySnapshot = await getDocs(collection(firestore, "todos"));

      const result = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(result);
    };
    //catch(error){console.log("Error fetching data:", error);}

    console.log("Fetching data...");
    fetchPost();
  }, [auth]);

  const sendEmail = (ownerEmail) => {
    const subject = encodeURIComponent("Item Inquiry");
    const body = encodeURIComponent(
      `Hi, I'm interested in your item. Is it still available?`
    );
    window.location.href = `mailto:${ownerEmail}?subject=${subject}&body=${body}`;
  };

  return (
    <section className="todo-container">
      <div className="todo">
        <h1 className="header">Please find Books and Toys </h1>

        <div className="todo-content">
          <ul>
            {todos?.map((todo) => (
              <li key={todo.id}>
                <img src={todo.uploadPicture} alt="Item" />
                <p>Name: {todo.itemName}</p>
                <p>Price: {todo.itemPrice}</p>
                <p>Description: {todo.itemDescription}</p>
                <button onClick={() => sendEmail(todo.user)}>
                  Click to Send an Email for availability
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
