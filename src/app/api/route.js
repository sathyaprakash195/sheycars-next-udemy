import { connectDB } from "@/config/dbConfig";
import { NextResponse } from "next/server";

connectDB();
export async function GET() {
  return NextResponse.json({ data: "Home Route" }, { status: 200 });
}
