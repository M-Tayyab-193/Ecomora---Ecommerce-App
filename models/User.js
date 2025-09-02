import mongoose from "mongoose";

// Define the seller profile schema separately
const sellerProfileSchema = new mongoose.Schema(
  {
    storeName: {
      type: String,
      default: "",
      trim: true,
    },
    phone: {
      type: String,
      default: "",
      trim: true,
    },
    category: {
      type: String,
      default: "Other",
      trim: true,
    },
  },
  { _id: false }
); // Don't create _id for subdocument

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
      type: sellerProfileSchema,
      default: () => ({
        storeName: "",
        phone: "",
        category: "Other",
      }),
    },
  },
  {
    minimize: false,
    // This ensures subdocuments are properly initialized
    collection: "users",
  }
);

// Add a pre-save hook to ensure sellerProfile is always initialized
userSchema.pre("save", function () {
  if (!this.sellerProfile) {
    this.sellerProfile = {
      storeName: "",
      phone: "",
      category: "Other",
    };
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
