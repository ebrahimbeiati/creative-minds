import { getUser } from "@/lib/data";
import styles from "./postUser.module.css";
import Image from "next/image";

// You can keep the fetching from API or local data
const PostUser = async ({ userId }) => {
  let user;
  let error;

  try {
    // Uncomment if you want to fetch from API
    // user = await getData(userId);

    // Use local fetching for now
    user = await getUser(userId);

    if (!user) {
      error = "User not found";
    }
  } catch (err) {
    error = "Error fetching user data";
    console.error(err);
  }

  return (
    <div className={styles.container}>
      {error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <>
          <Image
            className={styles.avatar}
            src={user.img ? user.img : "/noavatar.png"}
            alt={user.username || "User Avatar"}
            width={50}
            height={50}
            // Important for Next.js Image optimization
            priority={true} // load high priority if this image is important
          />
          <div className={styles.texts}>
            <span className={styles.title}>Author</span>
            <span className={styles.username}>{user.username}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default PostUser;
