import mongoose from 'mongoose';
// user.model.js
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

// UserSchema.pre('save', async function (next) {
//   if (this.isModified) {
//     this.password = bcrypt.hash(this.password, 10);
//   }
//   next();
// });
export const User = mongoose.model('User', UserSchema);
