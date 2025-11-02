import { RolesProvider } from "@/context/roles.context";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./Header";
import ProtectedRoute from "./ProtectedRoute";
import Data from "@/pages/Data";
import Expenses from "@/pages/expenses";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import styles from "./style.module.css";

export default function MainLayout() {
  return (
    <RolesProvider>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/data" replace />} />
          <Route
            path="/data"
            element={
              <ProtectedRoute>
                <Data />
              </ProtectedRoute>
            }
          />
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <Expenses />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <div className="card">
                <h2>Not Found</h2>
              </div>
            }
          />
          <Route
            path="/socket"
            element={
              <div>
                <SocketExample />
              </div>
            }
          />
        </Routes>
      </main>
    </RolesProvider>
  );
}
const socket = io("http://localhost:3000");

function SocketExample() {
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [chat, setChat] = useState("");
  const [inputValue, setInputValue] = useState("");

  const handleSave = () => {
    socket.emit("sendMessage", inputValue);
  };

  const handleConnect = () => {
    socket.emit("connectUserName", userName);
  };

  useEffect(() => {
    socket.on("messageFromApi", (msg) => {
      setChat(`${chat} __ ${msg}`);
    });

    return () => {
      socket.off("Closing Chat");
    };
  }, [chat]);

  return (
    <div>
      <h1>
        <div> Socket example</div>
      </h1>
      <div>
        {chat.split("__").map((item) => (
          <div>{item}</div>
        ))}
      </div>

      <div>
        <div className={styles.container}>
          <h2 className={styles.title}>Connect to Chat</h2>
          <input
            type="text"
            value={userName}
            placeholder="Enter your userName"
            onChange={(e) => setUserName(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleConnect} className={styles.button}>
            Connect
          </button>
        </div>
      </div>

      <div>
        <div className={styles.container}>
          <h2 className={styles.title}>Save a Message</h2>
          <input
            type="text"
            value={inputValue}
            placeholder="Type something..."
            onChange={(e) => setInputValue(e.target.value)}
            className={styles.input}
          />
          <button onClick={handleSave} className={styles.button}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
