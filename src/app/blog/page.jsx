import styles from "./BlogPage.module.css";
import PostCard from "@/components/PostCard/PostCard";


const getData = async  () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
     return  res.json();
  
}

/*************  ✨ Codeium Command ⭐  *************/
/**
 * BlogPage component renders a list of blog posts.
 * The component fetches a list of posts from the API and renders each
 * post as a PostCard component.
 *
 * @return {JSX.Element} - A JSX element containing a list of PostCard components.
 */
/******  86cdcb8d-f98a-4486-819b-1afb1d8c7897  *******/
const BlogPage = async () => {
  const posts = await getData()
  return (
    <div className={styles.container}>
      {posts.map((post) => (
          <div className={styles.post} key={post.id}>
        <PostCard post={post} />
      </div>
      ))}
    
      
     
    </div>
  );
}

export default BlogPage;