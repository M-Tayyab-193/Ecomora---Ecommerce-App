import { Inngest } from "inngest";
import connectDB from "./db";
import User from "@/models/User";
import { clerkClient } from "@clerk/nextjs/server";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "ecomora-next" });

// Inngest function to save user data to a database
export const createUser = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  {
    event: "clerk/user.created",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const userData = {
      _id: id,
      name: first_name + " " + last_name,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
      role: "user",
      sellerProfile: {
        storeName: "",
        phone: "",
        category: "",
      },
    };
    await connectDB();
    await User.create(userData);
  }
);

// Inngest function to update user data
export const updateUserData = inngest.createFunction(
  { id: "update-user-from-clerk" },
  {
    event: "clerk/user.updated",
  },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } =
      event.data;

    const userData = {
      _id: id,
      name: first_name + " " + last_name,
      email: email_addresses[0].email_address,
      imageUrl: image_url,
    };
    await connectDB();
    await User.findByIdAndUpdate(id, userData);
  }
);

// Inngest function to delete user from the database
export const deleteUser = inngest.createFunction(
  { id: "delete-user-from-clerk" },
  {
    event: "clerk/user.deleted",
  },
  async ({ event }) => {
    const { id } = event.data;

    await connectDB();
    await User.findByIdAndDelete(id);
  }
);
