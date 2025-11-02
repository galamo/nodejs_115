# Lesson 11 - Real-time Chat Application

A modern, real-time chat application built with React (Vite) and Node.js (Socket.IO).

## Features

- 🔐 **User Authentication**: Enter username and room name to join
- 💬 **Real-time Messaging**: Instant message delivery using WebSockets
- 🏠 **Room-based Chat**: Support for multiple chat rooms
- 👥 **User List**: See who's online in the current room
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Modern UI**: Beautiful gradient design with smooth animations

## Project Structure

```
Lesson_11/
├── api/                 # Backend server
│   ├── src/
│   │   └── index.ts    # Socket.IO server
│   ├── package.json
│   └── tsconfig.json
├── client/             # Frontend React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatRoom.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   ├── MessageInput.tsx
│   │   │   └── MessageList.tsx
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── App.css
│   │   └── index.css
│   ├── package.json
│   └── vite.config.ts
└── readme.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

#### 1. Install API Dependencies

```bash
cd Lesson_11/api
npm install
```

#### 2. Install Client Dependencies

```bash
cd Lesson_11/client
npm install
```

### Running the Application

#### Terminal 1 - Start the Backend Server

```bash
cd Lesson_11/api
npm run dev
```

The API server will start on `http://localhost:3000`

#### Terminal 2 - Start the Frontend Client

```bash
cd Lesson_11/client
npm run dev
```

The React app will start on `http://localhost:5173`

### Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Enter a username and room name, or click on a quick room button
3. Start chatting! Messages are visible to all users in the same room
4. See the list of online users in the sidebar
5. Click "Leave Room" to exit and join a different room

## Technical Details

### Backend (API)

- **Framework**: Node.js with Express
- **WebSocket Library**: Socket.IO
- **Language**: TypeScript
- **Port**: 3000

**Key Events:**
- `join-room`: Join a specific chat room
- `send-message`: Send a message to all room members
- `leave-room`: Leave the current room
- `receive-message`: Receive messages from other users
- `user-joined`: Notification when a user joins
- `user-left`: Notification when a user leaves

### Frontend (Client)

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **WebSocket Client**: Socket.IO Client
- **Port**: 5173

**Components:**
- `LoginForm`: User authentication and room selection
- `ChatRoom`: Main chat interface with user list
- `MessageList`: Display chat messages
- `MessageInput`: Send new messages

## Features in Detail

### Real-time Communication

- All messages are instantly delivered to all users in the same room
- User join/leave notifications are broadcast automatically
- Message timestamps are displayed for each message

### Room Management

- Users can join any room by entering the room name
- Multiple rooms can exist simultaneously
- Each room maintains its own user list
- Room names are case-sensitive

### User Experience

- Smooth animations when messages appear
- Auto-scroll to latest message
- Highlighting for your own messages
- System messages for user events
- Responsive design for mobile devices
- Disabled state for send button when input is empty

## Development Scripts

### API

```bash
npm run dev      # Start development server with ts-node
npm run compile  # Compile TypeScript to JavaScript
npm start        # Run compiled JavaScript
```

### Client

```bash
npm run dev      # Start Vite development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Testing

Open multiple browser windows/tabs to test multi-user functionality:

1. Start both server and client
2. Open `http://localhost:5173` in multiple tabs
3. Use different usernames but join the same room
4. Send messages and see them appear in real-time

## Future Enhancements

Possible additions:
- User authentication (JWT tokens)
- Message history storage (database)
- Private direct messaging
- File/image sharing
- Emoji reactions
- Typing indicators
- Message editing/deletion

## License

ISC

