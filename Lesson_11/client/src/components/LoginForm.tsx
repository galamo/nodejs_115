import { useState } from "react";

interface LoginFormProps {
  onLogin: (username: string, room: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && room.trim()) {
      onLogin(username.trim(), room.trim());
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>💬 Chat Application</h1>
        <p className="subtitle">Join a room and start chatting</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="room">Room Name</label>
            <input
              id="room"
              type="text"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              placeholder="Enter room name"
              required
            />
          </div>
          <button type="submit" className="login-button">
            Join Room
          </button>
        </form>
        <div className="room-suggestions">
          <p className="suggestion-title">Quick rooms:</p>
          <div className="suggestion-buttons">
            <button onClick={() => onLogin(username || "User", "General")}>
              General
            </button>
            <button onClick={() => onLogin(username || "User", "Development")}>
              Development
            </button>
            <button onClick={() => onLogin(username || "User", "Random")}>
              Random
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

