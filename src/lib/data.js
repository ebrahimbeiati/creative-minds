import { Post } from "./models"


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
        const post = await Post.find(slug);
        return post;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch posts");
      }
}

export const getUser = async (id) => {
      try {
        connectToDb();
        const user = await Post.findById(id);
        return user;
      } catch (error) {
        console.log(error);
        throw new Error("Failed to fetch posts");
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