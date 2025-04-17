import mongoose from 'mongoose';
// User.model.js
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
    },
    resetPasswordToken: {
      type: Date,
    },
    resetPasswordExpires: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model('User', UserSchema);
