import { useState } from "react";
import ChatRoom from "./components/ChatRoom";
import LoginForm from "./components/LoginForm";
import "./App.css";

interface User {
  username: string;
  room: string;
}

function App() {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (username: string, room: string) => {
    setUser({ username, room });
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return <ChatRoom user={user} onLogout={handleLogout} />;
}

export default App;

