import { io, Socket } from "socket.io-client";

export function initSocketConnection() {
    const socketConnection = io("http://localhost:3000");
    return socketConnection;
}




export function onConnect(socket: Socket, setHistoryLoaded: (a: boolean) => void, user: { room: string, username: string }) {
    socket.on("connect", () => {
        console.log("Connected to server");
        socket.emit("join-room", { room: user.room, username: user.username });
        setHistoryLoaded(false);
    });
}


export async function onConnectPromise(socket: Socket, user: { room: string, username: string }): Promise<void> {
    return new Promise((resolve, reject) => {
        socket.on("connect", () => {
            if (!socket.connected) return reject()
            console.log("Connected to server");
            socket.emit("join-room", { room: user.room, username: user.username });
            return resolve()
        });
    })
}
