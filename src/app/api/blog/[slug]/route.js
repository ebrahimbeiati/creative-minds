import { Post } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  const { slug } = await params;

  try {
    await connectToDb();
    const post = await Post.findOne({ slug });
    
    if (!post) {
      return NextResponse.json(
        { error: "Post not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(post);
  } catch (err) {
    console.error("Database connection error:", err);
    return NextResponse.json(
      { error: "Database connection failed. Please check your MongoDB configuration." },
      { status: 500 }
    );
  }
};

export const DELETE = async (request, { params }) => {
  const { slug } = params;

  try {
    connectToDb();

    await Post.deleteOne({ slug });
    return NextResponse.json("Post deleted");
  } catch (err) {
    console.log(err);
    throw new Error("Failed to delete post!");
  }
};
