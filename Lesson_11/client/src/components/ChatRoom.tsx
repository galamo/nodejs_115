import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

interface User {
  username: string;
  room: string;
}

interface Message {
  username: string;
  message: string;
  timestamp: string;
}

const ChatRoom: React.FC<{ user: User; onLogout: () => void }> = ({
  user,
  onLogout,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");

    newSocket.on("connect", () => {
      console.log("Connected to server");
      newSocket.emit("join-room", { room: user.room, username: user.username });
      setHistoryLoaded(false); // Reset when joining a new room
    });

    newSocket.on("room-joined", (data: { users: string[]; history?: Message[] }) => {
      setUsers(data.users);
      if (data.history && data.history.length > 0) {
        setMessages(data.history);
        setHistoryLoaded(true);
      }
    });

    newSocket.on("receive-message", (message: Message) => {
      setMessages((prev) => [...prev, message]);
    });

    newSocket.on("user-joined", (data: { username: string; users: string[] }) => {
      setUsers(data.users);
      setMessages((prev) => [
        ...prev,
        {
          username: "System",
          message: `${data.username} joined the room`,
          timestamp: new Date().toISOString(),
        },
      ]);
    });

    newSocket.on("user-left", (data: { username: string; users: string[] }) => {
      setUsers(data.users);
      setMessages((prev) => [
        ...prev,
        {
          username: "System",
          message: `${data.username} left the room`,
          timestamp: new Date().toISOString(),
        },
      ]);
    });

    newSocket.on("user-removed-notification", (data: { username: string; users: string[] }) => {
      setUsers(data.users);
      setMessages((prev) => [
        ...prev,
        {
          username: "System",
          message: `${data.username} was removed from the room`,
          timestamp: new Date().toISOString(),
        },
      ]);
    });

    newSocket.on("user-removed", (data: { message: string }) => {
      // Handle being removed by admin
      alert(data.message);
      newSocket.close();
      onLogout();
    });

    newSocket.on("remove-user-success", (data: { message: string }) => {
      // Admin confirmation
      console.log(data.message);
    });

    newSocket.on("remove-user-error", (data: { message: string }) => {
      // Admin error handling
      alert(data.message);
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.emit("leave-room", { room: user.room, username: user.username });
        newSocket.close();
      }
    };
  }, [user.room, user.username]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const sendMessage = (message: string) => {
    if (socket && message.trim()) {
      socket.emit("send-message", {
        room: user.room,
        username: user.username,
        message: message.trim(),
      });
    }
  };

  const handleRemoveUser = (targetUsername: string) => {
    if (socket && user.username === "admin") {
      if (window.confirm(`Remove user "${targetUsername}" from the room?`)) {
        socket.emit("remove-user", {
          room: user.room,
          adminUsername: user.username,
          targetUsername,
        });
      }
    }
  };

  const handleLogout = () => {
    if (socket) {
      socket.emit("leave-room", { room: user.room, username: user.username });
      socket.close();
    }
    onLogout();
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <div className="header-left">
          <h2>💬 {user.room}</h2>
          <span className="user-badge">{user.username}</span>
        </div>
        <div className="header-right">
          <span className="users-count">{users.length} online</span>
          <button onClick={handleLogout} className="logout-button">
            Leave Room
          </button>
        </div>
      </header>

      <div className="chat-main">
        <aside className="users-sidebar">
          <h3>👥 Users Online</h3>
          <ul className="users-list">
            {users.map((username, index) => (
              <li key={index} className={username === user.username ? "current-user" : ""}>
                <span>{username}</span>
                {user.username === "admin" && username !== "admin" && (
                  <button
                    className="remove-user-button"
                    onClick={() => handleRemoveUser(username)}
                    title={`Remove ${username}`}
                  >
                    🗑️
                  </button>
                )}
              </li>
            ))}
          </ul>
        </aside>

        <div className="chat-messages-container">
          {historyLoaded && messages.length > 0 && (
            <div className="history-indicator">
              📜 {messages.length} message{messages.length !== 1 ? 's' : ''} loaded
            </div>
          )}
          <MessageList messages={messages} currentUser={user.username} />
          <div ref={messagesEndRef} />
        </div>
      </div>

      <footer className="chat-footer">
        <MessageInput onSendMessage={sendMessage} />
      </footer>
    </div>
  );
};

export default ChatRoom;

