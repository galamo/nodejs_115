import { Message } from "../types/index";

interface MessageListProps {
  messages: Message[];
  currentUser: string;
}

const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="empty-state">
          <p>No messages yet. Start the conversation!</p>
        </div>
      ) : (
        messages.map((msg, index) => {
          const isSystem = msg.username === "System";
          const isOwnMessage = msg.username === currentUser;

          return (
            <div
              key={index}
              className={`message ${isSystem ? "system-message" : ""} ${
                isOwnMessage ? "own-message" : ""
              }`}
            >
              {!isSystem && (
                <div className="message-header">
                  <span className="message-username">
                    {isOwnMessage ? "You" : msg.username}
                  </span>
                  <span className="message-time">{formatTime(msg.timestamp)}</span>
                </div>
              )}
              <div className="message-content">{msg.message}</div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default MessageList;

