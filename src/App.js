import React, { useEffect, useState } from "react";
import "./App.css";
import Message from "./Message";
import { db, serverTimestamp } from "./firebase";
import FlipMove from "react-flip-move";
import messImage from "./mess.png";
import SendIcon from "@mui/icons-material/Send";
import { collection, onSnapshot, addDoc, orderBy, query } from "firebase/firestore";

export default function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const name = prompt("Enter your name:");
    setUsername(name.toUpperCase());
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(db, "Messages"), orderBy("timestamp", "asc")), // Ensure messages are ordered ascendingly
      (snapshot) => {
        setMessages(snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() })));
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const container = document.querySelector('.messages');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);
  

  const sendMessage = async (event) => {
    event.preventDefault();

    if (input.trim() === "") return;

    try {
      await addDoc(collection(db, "Messages"), {
        message: input,
        username: username,
        timestamp: serverTimestamp(),
      });
      setInput(""); // Clear the input field after sending
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className="app">
      <div className="image-wrapper">
        <img className="img" src={messImage} alt="Messenger" />
      </div>
      <h1>Hello {username}!</h1>
      <div className="messages">
        <FlipMove>
          {messages.map(({ id, data }) => (
            <Message key={id} username={username} message={data} />
          ))}
        </FlipMove>
      </div>
      <form className="app-form" onSubmit={sendMessage}>
        <input
          className="input-box"
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Enter a message..."
        />
        <button
          type="submit"
          className="send-button"
          aria-label="send"
        >
          <SendIcon />
        </button>
      </form>
    </div>
  );
}
