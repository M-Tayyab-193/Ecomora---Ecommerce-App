import connectDB from "@/config/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

const authSeller = async (userId) => {
  try {
    if (!userId) return false;

    await connectDB();
    const user = await User.findById(userId);
    if (!user) return false;

    if (user.role === "seller") {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message });
  }
};

export default authSeller;
