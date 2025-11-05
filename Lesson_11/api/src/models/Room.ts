import mongoose, { Schema, Document } from 'mongoose';

export interface IRoom extends Document {
  id: string;
  name: string;
}

const RoomSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IRoom>('Room', RoomSchema);

