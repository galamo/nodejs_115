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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");

    newSocket.on("connect", () => {
      console.log("Connected to server");
      newSocket.emit("join-room", { room: user.room, username: user.username });
    });

    newSocket.on("room-joined", (data: { users: string[] }) => {
      setUsers(data.users);
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
                {username}
              </li>
            ))}
          </ul>
        </aside>

        <div className="chat-messages-container">
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

