// Add the "use client" directive at the top of the file
"use client";

import PostCard from "@/components/postCard/postCard";
import styles from "./blog.module.css";
import { useEffect, useState } from "react"; // Ensure you import useState and useEffect

// Example of getData to fetch posts
const getData = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Something went wrong");
  }

  return res.json(); // This returns an array of posts
};

const BlogPage = () => {
  const [visiblePosts, setVisiblePosts] = useState(10); // Display 10 posts initially
  const [allPosts, setAllPosts] = useState([]); // All fetched posts

  // Fetch posts on component mount
  useEffect(() => {
    const fetchData = async () => {
      const posts = await getData();
      setAllPosts(posts);
    };
    fetchData();
  }, []);

  const loadMorePosts = () => {
    setVisiblePosts((prevVisible) => prevVisible + 10); // Load 10 more posts
  };

  return (
    <div className={styles.container}>
      {allPosts.slice(0, visiblePosts).map((post) => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
      {visiblePosts < allPosts.length && (
        <button className={styles.loadMoreButton} onClick={loadMorePosts}>
          See More
        </button>
      )}
    </div>
  );
};

export default BlogPage;
