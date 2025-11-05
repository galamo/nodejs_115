const API_BASE_URL = "http://localhost:3000";

export interface Room {
  id: string;
  name: string;
}

export async function fetchRooms(): Promise<Room[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rooms`);
    if (!response.ok) {
      throw new Error("Failed to fetch rooms");
    }
    const rooms = await response.json();
    return rooms;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return [];
  }
}

export async function createRoom(name: string): Promise<Room | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    if (!response.ok) {
      throw new Error("Failed to create room");
    }
    const room = await response.json();
    return room;
  } catch (error) {
    console.error("Error creating room:", error);
    return null;
  }
}

