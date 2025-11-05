import { useState, useEffect } from "react";
import { fetchRooms, Room } from "../services/room-service";

interface LoginFormProps {
  onLogin: (username: string, room: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [roomInputMode, setRoomInputMode] = useState<"select" | "input">("select");

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    setIsLoadingRooms(true);
    const fetchedRooms = await fetchRooms();
    setRooms(fetchedRooms);
    setIsLoadingRooms(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && room.trim()) {
      onLogin(username.trim(), room.trim());
    }
  };

  const handleRoomSelect = (selectedRoom: string) => {
    if (selectedRoom === "new") {
      setRoomInputMode("input");
      setRoom("");
    } else {
      setRoom(selectedRoom);
      setRoomInputMode("select");
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
            {roomInputMode === "select" ? (
              <select
                id="room"
                value={room}
                onChange={(e) => handleRoomSelect(e.target.value)}
                required
                disabled={isLoadingRooms}
                className="room-select"
              >
                <option value="">
                  {isLoadingRooms ? "Loading rooms..." : "Select a room"}
                </option>
                {rooms.map((r) => (
                  <option key={r.id} value={r.name}>
                    {r.name}
                  </option>
                ))}
                <option value="new">+ Create New Room</option>
              </select>
            ) : (
              <div className="room-input-container">
                <input
                  id="room"
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  placeholder="Enter new room name"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => {
                    setRoomInputMode("select");
                    setRoom("");
                  }}
                  className="cancel-room-button"
                  title="Cancel"
                >
                  ✕
                </button>
              </div>
            )}
          </div>
          <button type="submit" className="login-button">
            Join Room
          </button>
        </form>
        <div className="room-suggestions">
          <p className="suggestion-title">Quick rooms:</p>
          <div className="suggestion-buttons">
            <button 
              type="button"
              onClick={() => {
                setRoom("General");
                setRoomInputMode("select");
                if (username.trim()) {
                  onLogin(username.trim(), "General");
                }
              }}
            >
              General
            </button>
            <button 
              type="button"
              onClick={() => {
                setRoom("Development");
                setRoomInputMode("select");
                if (username.trim()) {
                  onLogin(username.trim(), "Development");
                }
              }}
            >
              Development
            </button>
            <button 
              type="button"
              onClick={() => {
                setRoom("Random");
                setRoomInputMode("select");
                if (username.trim()) {
                  onLogin(username.trim(), "Random");
                }
              }}
            >
              Random
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

