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

  const sellerData = { storeName, phone, category };

  if (role !== "seller") {
    return NextResponse.json(
      { success: false, message: "Invalid role change" },
      { status: 400 }
    );
  }
  await connectDB();

  const user = await User.findById(userId);

  if (!user) {
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );
  }
  user.role = role;
  user.sellerProfile = sellerData;
  await user.save();

  return NextResponse.json({ success: true, user });
}
