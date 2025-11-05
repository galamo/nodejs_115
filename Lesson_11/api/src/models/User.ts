import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  username: string;
}

const UserSchema: Schema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IUser>('User', UserSchema);

