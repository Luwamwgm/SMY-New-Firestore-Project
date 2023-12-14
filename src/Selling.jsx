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
import { useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  //let name = "";
  useEffect(() => {
    console.log("selling compnent useEffect");
    console.log("auth state", auth);
    const fetchData = async () => {
      try {
        setLoading(true);
        if (auth && auth.currentUser) {
          const { displayName, email } = auth.currentUser;
          setName(displayName || email);
          setIsOwner(email === "tes@yahoo.com");
        } else if (!auth && auth.currentUser) {
          //setName(""); // Clear name when user is not logged in
          //setIsOwner(false);
          setLoading(false);
          console.log("Redirecting to home page");
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [auth, navigate]);

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
      await uploadTask;

      const downloadURL = await getDownloadURL(storageRef);
      console.log("File uploaded successfully. Download URL:", downloadURL);
      // Wait for the upload to complete
      const snapshot = await getDownloadURL(storageRef);
      console.log("upload a picture");
      const docRef = await addDoc(collection(firestore, "todos"), {
        itemName: itemName,
        itemPrice: itemPrice,
        itemDescription: itemDescription,
        // emailMe: emailMe,
        uploadPicture: downloadURL,
        //uploadPicture: snapshot,
        user: name,
      }).catch((error) => {
        console.error("Error adding document:", error);
        alert("Failed to add the item, please try again.");
      });
      setLastId(docRef.id);
      console.log("Document written with ID: ", docRef.id);
      //navigate("/SellingPage");
      //fetchPost();
    } catch (e) {
      console.error("Error adding document: ", e);
      alert("Failed to add the item, please try again.");
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
      alert("can not remove item");
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

      if (lastId) {
        setItemName("");
        setItemPrice("");
        setItemDescription("");
        setUploadPicture(null);
      }
    };

    console.log("Fetching data...");
    fetchPost();
  }, [auth, lastId, name, isOwner]);

  return (
    <div className="todo">
      <h2 className="header">Welcome to Selling Page {name}</h2>

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
                <button onClick={() => removeTodo(todo.id)}>Remove Item</button>
              )}

              {/* Allow regular user to remove only their own items */}
              {!isOwner && name === todo.user && (
                <button onClick={() => removeTodo(todo.id)}>Remove Item</button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
