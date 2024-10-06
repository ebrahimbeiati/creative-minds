import styles from './SinglePage.module.css'
import Image from "next/image";
const SinglePage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src="/blog.png" alt="" fill className={styles.img} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.title}>Title</h1>
        <div className={styles.detail}>
          <Image
            src="/avatar.png"
            alt=""
            width={50}
            height={50}
            className={styles.avatar}
          />
        </div>
        <div className={styles.detailText}>
          <span className={styles.detailTitle}>Author</span>
          <span className={styles.detailValue}>Ebrahim</span>
        </div>
        <div className={styles.detailText}>
          <span className={styles.detailTitle}>Published</span>
          <span className={styles.detailValue}>01.02.2024</span>
        </div>
        <div className={styles.content}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi
          repellendus, deleniti maiores qui doloribus molestiae architecto sunt.
          Eveniet quisquam, sed quam laborum aut, totam repudiandae commodi,
          assumenda sunt ipsa atque?
        </div>
      </div>
    </div>
  );
}

export default SinglePage;