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
    role: {
      type: String,
      required: true,
      default: "user",
    },
    sellerProfile: {
      storeName: {
        type: String,
        required: false,
        default: "",
      },
      phone: {
        type: String,
        required: false,
        default: "",
      },
      category: {
        type: String,
        required: false,
        enum: [
          "Electronics",
          "Fashion & Clothing",
          "Home & Garden",
          "Books & Media",
          "Sports & Outdoors",
          "Health & Beauty",
          "Toys & Games",
          "Food & Beverages",
          "Automotive",
          "Other",
        ],
        default: "",
      },
    },
  },
  { minimize: false }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
