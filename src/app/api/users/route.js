import { connectDB } from "@/config/dbConfig";
import { validateTokenAndGetUserId } from "@/helpers/tokenValidation";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
connectDB();

export async function GET(request) {
  try {
    await validateTokenAndGetUserId(request);
    const users = await User.find({});
    return NextResponse.json({ data: users });
  } catch (error) {
    return NextResponse.json(
      { message: error.message, error },
      { status: 400 }
    );
  }
}
