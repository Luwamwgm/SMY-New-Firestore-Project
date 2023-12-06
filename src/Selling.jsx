import { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { firestore, storage } from "./firebase-config";
import "./App.css";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function Selling({}) {
  const auth = useContext(AuthContext);
  let name = "";
  if (auth && auth.currentUser) {
    const { displayName, email } = auth.currentUser;
    name = displayName || email;
  }
  //const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [lastId, setLastId] = useState();
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  //const [emailMe, setEmailMe] = useState("");
  const [uploadPicture, setUploadPicture] = useState(null);

  const addTodo = async (e) => {
    e.preventDefault();
    try {
      if (!uploadPicture) {
        console.log("Please upload a picture before submitting.");
        return;
      }

      const storageRef = ref(
        storage,
        "todos/" + (uploadPicture && uploadPicture.name)
      );

      const uploadTask = uploadBytes(storageRef, uploadPicture);

      // Wait for the upload to complete
      const snapshot = await getDownloadURL(storageRef);

      const docRef = await addDoc(collection(firestore, "todos"), {
        itemName: itemName,
        itemPrice: itemPrice,
        itemDescription: itemDescription,
        // emailMe: emailMe,
        uploadPicture: snapshot,
      });
      setLastId(docRef.id);
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    const fetchPost = async () => {
      const querySnapshot = await getDocs(collection(firestore, "todos"));
      const result = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(result);
    };

    console.log("Fetching data...");
    fetchPost();
  }, [lastId]);

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
            <input type="email" name="email" value={name} />
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
