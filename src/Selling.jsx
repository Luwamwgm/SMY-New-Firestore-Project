import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { firebaseAuth } from "./firebase-config";
import { firestore, storage } from "./firebase-config";
import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Selling({}) {
  const auth = useContext(AuthContext);
  const [name, setName] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  //const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [lastId, setLastId] = useState();
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  //const [emailMe, setEmailMe] = useState("");
  const [uploadPicture, setUploadPicture] = useState(null);

  //let name = "";
  useEffect(() => {
    if (auth && auth.currentUser) {
      const { displayName, email } = auth.currentUser;
      setName(displayName || email);

      setIsOwner(email === "tes@yahoo.com");
    }
  }, [auth]);

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      if (!uploadPicture) {
        alert("Please upload a picture before submitting.");
        return;
      }
      const sanitizedFileName = uploadPicture.name.replace(/[^\w\s]/gi, "_");

      console.log("User Name:", name);
      console.log("Sanitized File Name:", sanitizedFileName);

      const storageRef = ref(storage, `todos/${sanitizedFileName}`);
      console.log("Storage Reference:", storageRef);
      const uploadTask = uploadBytes(storageRef, uploadPicture);

      // Wait for the upload to complete
      const snapshot = await getDownloadURL(storageRef);
      console.log("clicked twice");
      const docRef = await addDoc(collection(firestore, "todos"), {
        itemName: itemName,
        itemPrice: itemPrice,
        itemDescription: itemDescription,
        // emailMe: emailMe,
        uploadPicture: snapshot,
        user: name,
      });
      setLastId(docRef.id);
      console.log("Document written with ID: ", docRef.id);
      //fetchPost();
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const removeTodo = async (id) => {
    try {
      await deleteDoc(doc(firestore, "todos", id));
      console.log("Document with ID removed: ", id);

      // Update the state to trigger a re-render
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (e) {
      console.error("Error removing document: ", e);
    }
  };
  useEffect(() => {
    const fetchPost = async () => {
      const querySnapshot = await getDocs(collection(firestore, "todos"));

      let result;
      if (isOwner) {
        // If owner, fetch all items
        result = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
      } else {
        // If not owner, fetch only the user's items
        result = querySnapshot.docs
          .filter((doc) => doc.data().user === name)
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
      }

      setTodos(result);
    };

    console.log("Fetching data...");
    fetchPost();
  }, [auth, lastId, name, isOwner]);

  return (
    <section className="todo-container">
      <div className="todo">
        <h1 className="header">Welcome to Selling Page {name}</h1>

        <div className="list">
          <div>
            <input
              type="text"
              placeholder="Item Name"
              onChange={(e) => setItemName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Item price"
              onChange={(e) => setItemPrice(e.target.value)}
            />
            <br />
            <input
              type="text"
              placeholder="Item desription"
              onChange={(e) => setItemDescription(e.target.value)}
            />
          </div>
          <div>
            upload you item image
            {uploadPicture && (
              <div>
                <img
                  alt="not found"
                  width={"250px"}
                  src={URL.createObjectURL(uploadPicture)}
                />
                <br />
                <button onClick={() => setUploadPicture(null)}>Remove</button>
              </div>
            )}
            <br />
            <input
              type="file"
              name="myPicture"
              onChange={(event) => {
                console.log(
                  event.target.files[0],
                  setUploadPicture(event.target.files[0])
                );
              }}
            />
            <input
              type="email"
              name="email"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="btn-container">
            <button type="button" className="btn" onClick={addTodo}>
              Submit
            </button>
          </div>
        </div>

        <div className="todo-content">
          <ul>
            {todos?.map((todo) => (
              <li key={todo.id}>
                <img src={todo.uploadPicture} alt="Item" />
                <p>Name: {todo.itemName}</p>
                <p>Price: {todo.itemPrice}</p>
                <p>Description: {todo.itemDescription}</p>
                <p>Email: {todo.user}</p>
                <p>Added by: {todo.user}</p>
                {/* Allow owner to remove any item */}
                {isOwner && (
                  <button onClick={() => removeTodo(todo.id)}>
                    Remove Item
                  </button>
                )}

                {/* Allow regular user to remove only their own items */}
                {!isOwner && name === todo.user && (
                  <button onClick={() => removeTodo(todo.id)}>
                    Remove Item
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
