import { getUser } from "@/lib/data";
import styles from "./adminUsers.module.css";
import Image from "next/image";
import { deleteUser } from "@/lib/action";
import { useAuth } from "@clerk/nextjs";

const AdminUsers = async () => {
  const users = await getUser();
  console.log(users); // Log to see if `users` is null or an array

  return (
    <div className={styles.container}>
      <h1>Users</h1>
      {users && users.length > 0 ? (
        users.map((user) => (
          <div className={styles.user} key={user.id}>
            <div className={styles.detail}>
              <span>{user.username}</span>
            </div>
            <form action={deleteUser}>
              <input type="hidden" name="id" value={user.id} />
              <button className={styles.userButton}>Delete</button>
            </form>
          </div>
        ))
      ) : (
        <p>No users available.</p>
      )}
    </div>
  );
};


export default AdminUsers;
