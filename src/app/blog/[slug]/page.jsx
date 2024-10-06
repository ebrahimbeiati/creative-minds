import styles from './SinglePage.module.css'
import Image from "next/image";
import PostUser from "@/components/postUser/PostUser";


const getData = async (slug) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${slug}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
};
const SinglePage =async ({ params }) => {
  const { slug } = params;

  const post =await getData(slug);

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/blog.png" alt="" fill className={styles.img} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.detail}>
          <Image
            src="/avatar.png"
            alt=""
            width={50}
            height={50}
            className={styles.avatar}
          />
          <PostUser userId={post.userId} />

        <div className={styles.detailText}>
          <span className={styles.detailTitle}>Published</span>
          <span className={styles.detailValue}>01.02.2024</span>
          </div>
        </div>
        <div className={styles.content}>
          {post.body}
        </div>
      </div>
    
    </div>
  );
}

export default SinglePage;