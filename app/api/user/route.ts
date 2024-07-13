import { connectToDB } from "@/lib/db";
import { UserModel } from "@/schemas/user";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();

    const users = await UserModel.find({});

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return new NextResponse(
      JSON.stringify({ message: "Failed to get users" }),
      { status: 500 }
    );
  }
}
