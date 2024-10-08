import styles from "./postUser.module.css";
import { getUser } from "@/lib/data";
import Image from "next/image";

const PostUser = async ({ userId }) => {
  const user = await getUser(userId);
  return (
    <div className={styles.container}>
      <Image
        src={user.img? user.img : "/avatar.png"} // Fallback to avatar.png if user.img is not available
        alt=""
        width={50}
        height={50}
        className={styles.avatar}
      />
      <div className={styles.texts}>
        <span className={styles.title}>Author</span>
        <span className={styles.username}>{user.username}</span>
      </div>
    </div>
  );
}

export default PostUser