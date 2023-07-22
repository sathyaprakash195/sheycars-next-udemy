import { connectDB } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
connectDB();

export async function POST(request) {
  try {
    const reqBody = await request.json();

    // check if user is exists
    const user = await User.findOne({ email: reqBody.email });
    if (!user) {
      throw new Error("User not found");
    }

    // check if user is active
    if (!user.isActive) {
      throw new Error("User is inactive , please contact admin");
    }

    // check if password is correct
    const validPassword = await bcrypt.compare(reqBody.password, user.password);
    if (!validPassword) {
      throw new Error("Invalid password");
    }

    const response = NextResponse.json({
      message: "Login successful",
    });

    // create token
    const token = jwt.sign({ _id: user._id }, process.env.jwt_secret, {
      expiresIn: "1d",
    });

    // set cookie
    response.cookies.set("token", token, {
      path: "/",
      httpOnly: true,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
