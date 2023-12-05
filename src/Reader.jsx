import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "./firebase-config";
//import "./App.css";
import "./Buying.css";

export default function Reader({ auth }) {
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
        <h1 className="header">Home </h1>

        <div className="todo-content">
          <ul>
            {todos?.map((todo) => (
              <li key={todo.id}>
                <img src={todo.uploadPicture} alt="Item" />
                <p>Name: {todo.itemName}</p>
                <p>Price: {todo.itemPrice}</p>
                <p>Description: {todo.itemDescription}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
