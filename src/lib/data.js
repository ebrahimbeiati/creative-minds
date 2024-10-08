import { Post } from "./models"
import { User } from "./models"


import { connectToDb } from "./utils";

export const getPosts = async () => {
    try {
        connectToDb();
        const posts = await Post.find();
        return posts
} catch (error) {
    console.log(error)
    throw new Error("Failed to fetch posts")
    
}

}
export const getPost = async (slug) => {
      try {
        connectToDb();
const post = await Post.findOne({ slug });
        return post
      } catch (error) {
        console.log(error)
        throw new Error("Failed to fetch post");
      }
}

export const getUser = async (id) => {
      try {
        connectToDb();
        const user = await User.findById(id);
        return user;
      } catch (error) {
        console.error(`Error fetching user with id ${id}:`, error);
        throw new Error(`Failed to fetch user with id ${id}: ${error.message}`);
      }
}

export const getAllUser = async (id) => {
  try {
    connectToDb();
    const allUser = await Post.find();
    return allUser;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts");
  }
};