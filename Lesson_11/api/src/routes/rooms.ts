import express, { Request, Response } from "express";
import Room from "../models/Room";

const router = express.Router();

async function getRooms(){
    const rooms = await Room.find({}).select("id name").exec();
    return rooms;
}

// couchbase/ opensearch / document db? 

// GET all rooms
router.get("/", async (req: Request, res: Response) => {
    try {
        const rooms = await getRooms()
        res.json(rooms);
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ error: "Failed to fetch rooms" });
    }
});

// POST create a new room
router.post("/", async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        // - _ numbers, text, 20 max characters 
        // - validation
        // TODO: input valdiation
        if (!name || !name.trim()) {
            return res.status(400).json({ error: "Room name is required" });
        }

        // Generate a unique ID (using room name as base, or you can use UUID)
        const roomId = name.trim().toLowerCase().replace(/\s+/g, "-");

        // Check if room already exists
        const existingRoom = await Room.findOne({ id: roomId });
        if (existingRoom) {
            return res.json(existingRoom);
        }

        // Create new room
        const newRoom = new Room({
            id: roomId,
            name: name.trim(),
        });

        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);
    } catch (error: any) {
        console.error("Error creating room:", error);
        if (error.code === 11000) {
            // Duplicate key error
            const existingRoom = await Room.findOne({
                id: req.body.name?.trim().toLowerCase().replace(/\s+/g, "-")
            });
            return res.json(existingRoom);
        }
        res.status(500).json({ error: "Failed to create room" });
    }
});

export default router;

