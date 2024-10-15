"use server";

import styles from "./adminPage.module.css";
import { Suspense } from "react";
import AdminPosts from "@/components/adminPosts/AdminPosts";
import AdminPostForm from "@/components/adminPostsForm/AdminPostForm";
import AdminUsers from "@/components/adminUsers/AdminUsers";
import AdminUserForm from "@/components/adminUserForm/AdminUserForm";
import { auth } from "@/lib/auth"; // Adjust import as necessary
import { redirect } from "next/navigation";

const AdminPage = async () => {
  try {
    const session = await auth(); // Ensure user is authenticated and authorized
    return (
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.col}>
            <Suspense>
              <AdminPosts />
            </Suspense>
          </div>
          <div className={styles.col}>
            <AdminPostForm userId={session.user.id} />
          </div>
        </div>
        <div className={styles.row}>
          <div className={styles.col}>
            <Suspense>
              <AdminUsers />
            </Suspense>
          </div>
          <div className={styles.col}>
            <AdminUserForm userId={session.user.id} />
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Auth error:", error);
    redirect("/login"); // Redirect unauthorized users to login
  }
};

export default AdminPage;
