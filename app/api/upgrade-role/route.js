import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { userId } = getAuth(request);
  if (!userId) return { status: 401, body: { error: "Unauthorized" } };

  const { role, sellerProfile } = await request.json();
  const { storeName, phone, category } = sellerProfile || {};
  console.log(role, storeName, phone, category);

  // only allow "seller" upgrade through this route
  if (role !== "seller") {
    return NextResponse.json(
      { success: false, message: "Invalid role change" },
      { status: 400 }
    );
  }
  await connectDB();
  const updatedUser = await User.findByIdAndUpdate(
    userId,
    {
      $set: {
        role,
        "sellerProfile.storeName": storeName,
        "sellerProfile.phone": phone,
        "sellerProfile.category": category,
      },
    },
    { new: true }
  );
  console.log("Updated user", updatedUser);

  return NextResponse.json({ success: true, role });
}
