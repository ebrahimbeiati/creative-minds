import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  try {
    await connectToDb();
    const posts = await Post.find();
    return NextResponse.json(posts);
  } catch (err) {
    console.log("Database connection error, returning empty array:", err.message);
    // Return empty array instead of error to prevent client-side errors
    return NextResponse.json([]);
  }
};
