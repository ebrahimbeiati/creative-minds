import styles from "./BlogPage.module.css";
import PostCard from "@/components/PostCard/PostCard";
const BlogPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.post}>
        <PostCard />
      </div>
      <div className={styles.post}>
        <PostCard />
      </div>
      <div className={styles.post}>
        <PostCard />
      </div>
    </div>
  );
}

export default BlogPage;