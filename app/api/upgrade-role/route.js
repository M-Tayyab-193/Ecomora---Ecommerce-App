import { getAuth } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { userId } = getAuth(request);
  if (!userId) return { status: 401, body: { error: "Unauthorized" } };

  const { role } = await request.json();

  // only allow "seller" upgrade through this route
  if (role !== "seller") {
    return NextResponse.json({
      status: 400,
      body: { error: "Invalid role change" },
    });
  }
  await connectDB();
  await User.findByIdAndUpdate(userId, { role });

  return NextResponse.json({ success: true, role });
}
