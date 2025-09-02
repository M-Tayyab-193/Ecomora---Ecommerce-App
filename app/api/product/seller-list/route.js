import authSeller from "@/lib/authSeller";
import Product from "@/models/Product";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";

export async function GET(request) {
  try {
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }
    const isSeller = authSeller(userId);

    if (!isSeller) {
      return NextResponse.json(
        {
          success: false,
          message: "User is not a seller",
        },
        { status: 403 }
      );
    }
    await connectDB();
    const products = await Product.find({ userId });

    return NextResponse.json(
      {
        success: true,
        products,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}
