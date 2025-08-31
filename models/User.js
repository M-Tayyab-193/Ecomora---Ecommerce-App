import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    imageUrl: {
      type: String,
      default: "https://placehold.co/30x30?text=30x30",
    },
    cartItems: {
      type: Object,
      default: {},
    },
  },
  { minimize: false }
);

const User = mongoose.model.User || mongoose.model("User", userSchema);

export default User;
