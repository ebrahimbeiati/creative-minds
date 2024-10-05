import styles from "./postCard.module.css";
import Image from "next/image";
import Link from "next/link";

const PostCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <div className={styles.imgContainer}>
          <Image
            src="/blog.png"
            alt="Blog Image"
           fill
            className={styles.img}
          />
        </div>
        <span className={styles.date}>01.01.2024</span>
      </div>
      <div className={styles.bottom}>
        <h1 className={styles.title}>Title</h1>
        <p className={styles.desc}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus nam assumenda reprehenderit temporibus, quam molestiae sunt vel tenetur quos? Autem eum quis obcaecati, quas blanditiis hic error. Vel, quasi. Illo.</p>
        <Link href="/blog/post" className={styles.link}>Read more</Link>
      </div>
    </div>
  );
};

export default PostCard;
