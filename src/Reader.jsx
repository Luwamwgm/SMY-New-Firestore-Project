import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase-config";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
//import "./App.css";
import "./Buying.css";

export default function Reader({}) {
  const auth = useContext(AuthContext);
  let name = "";
  if (auth && auth.currentUser) {
    const { displayName, email } = auth.currentUser;
    name = displayName || email;
  }
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      const querySnapshot = await getDocs(collection(firestore, "todos"));
      /*
       * To look at the shape of the data returned form FireStore
      querySnapshot.docs.map((doc) => {
        console.log(doc.id, doc.data());
      });
      */
      const result = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(result);
    };
    //catch(error){console.log("Error fetching data:", error);}

    console.log("Fetching data...");
    fetchPost();
  }, []);

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
                <a
                  href={`mailto:${name}?subject=Availability Inquiry&body=I'm interested in your item. Is it still available?`}
                >
                  Click to Send an Email for availability
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
