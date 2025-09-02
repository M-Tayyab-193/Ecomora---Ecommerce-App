import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Address from "@/models/Address";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();
    const addresses = await Address.find({ userId });

    if (addresses.length === 0) {
      return NextResponse.json({
        success: false,
        message: "No addresses found",
      });
    }

    return NextResponse.json({
      success: true,
      message: "Addresses retrieved successfully",
      addresses,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
