import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router"; // Import useRouter for navigation
import { Suspense } from "react";
import styles from "./admin.module.css";
import AdminPosts from "@/components/adminPosts/adminPosts";
import AdminPostForm from "@/components/adminPostForm/adminPostForm";
import AdminUsers from "@/components/adminUsers/adminUsers";
import AdminUserForm from "@/components/adminUserForm/adminUserForm";

const AdminPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect if the user is not authenticated
    if (status === "loading") {
      return; // Do nothing while loading
    }
    if (status === "unauthenticated") {
      router.push("/login"); // Redirect to login if not authenticated
    }
  }, [status, router]);

  // You can log the session here to check its content
  console.log("Session:", session);

  if (status === "loading") {
    return <div>Loading...</div>; // Loading state
  }

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminPosts />
          </Suspense>
        </div>
        <div className={styles.col}>
          {session && <AdminPostForm userId={session.user.id} />}{" "}
          {/* Ensure you check session before using it */}
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense fallback={<div>Loading...</div>}>
            <AdminUsers />
          </Suspense>
        </div>
        <div className={styles.col}>
          <AdminUserForm />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
