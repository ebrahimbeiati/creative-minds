import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectToDb();
    const posts = await Post.find();
    return NextResponse.json(posts);
  } catch (err) {
    console.error("Database connection error:", err);
    return NextResponse.json(
      { error: "Database connection failed. Please check your MongoDB configuration." },
      { status: 500 }
    );
  }
};
