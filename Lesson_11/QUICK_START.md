# Quick Start Guide

Get the Chat Application running in 3 minutes!

## Step 1: Install Dependencies

Open two terminals and run:

**Terminal 1 (Backend):**
```bash
cd Lesson_11/api
npm install
```

**Terminal 2 (Frontend):**
```bash
cd Lesson_11/client
npm install
```

## Step 2: Start the Servers

**Terminal 1:**
```bash
npm run dev
```
✅ Backend running on http://localhost:3000

**Terminal 2:**
```bash
npm run dev
```
✅ Frontend running on http://localhost:5173

## Step 3: Use the App

1. Open http://localhost:5173 in your browser
2. Enter your username (e.g., "Alice")
3. Enter a room name or click a quick room button
4. Start chatting! Open another tab with a different username to see real-time updates

## Features to Try

- ✅ Send messages and see them instantly
- ✅ See who's online in your room
- ✅ Get notified when users join/leave
- ✅ Your messages are highlighted in purple
- ✅ Auto-scroll to newest messages
- ✅ **Message history** - Rejoin to see past messages
- ✅ **Admin controls** - Log in as "admin" to remove users
- ✅ Responsive design - try resizing the window

## Troubleshooting

**Problem:** `npm install` fails
- **Solution:** Make sure you're using Node.js v18 or higher

**Problem:** Backend can't start
- **Solution:** Check if port 3000 is already in use. Change the port in `api/src/index.ts` if needed

**Problem:** Frontend can't start
- **Solution:** Check if port 5173 is already in use

**Problem:** No messages appearing
- **Solution:** Make sure both servers are running and check the browser console for errors

## Architecture

```
Browser (localhost:5173)
    ↕ WebSocket
Backend (localhost:3000)
    ↕ Socket.IO
Multiple Clients
```

Enjoy chatting! 🎉

