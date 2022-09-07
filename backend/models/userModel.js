// The structure and contents of the MongoDB schema for Users is defined this JavaScript file
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
