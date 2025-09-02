import { getAuth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { userId } = getAuth(request);
  if (!userId) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { role, sellerProfile } = await request.json();
  const { storeName, phone, category } = sellerProfile || {};

  if (role !== "seller") {
    return NextResponse.json(
      { success: false, message: "Invalid role change" },
      { status: 400 }
    );
  }

  console.log("Input values:", { storeName, phone, category });
  await connectDB();

  try {
    // Method 2: Find, modify, and save
    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    console.log("User before update:", user.toObject());

    // Update the fields directly
    user.role = role;

    if (!user.sellerProfile) {
      user.sellerProfile = {};
    }
    user.sellerProfile.storeName = storeName;
    user.sellerProfile.phone = phone;
    user.sellerProfile.category = category;

    console.log("User after field assignment:", user.toObject());

    // Save the changes
    const savedUser = await user.save();

    console.log("Saved user:", savedUser.toObject());

    return NextResponse.json({ success: true, user: savedUser });
  } catch (error) {
    console.error("Update error:", error);
    return NextResponse.json(
      { success: false, message: "Update failed", error: error.message },
      { status: 500 }
    );
  }
}
