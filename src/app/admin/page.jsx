import styles from './adminPage.module.css'
import { Suspense } from 'react';
import AdminPosts from '@/components/adminPosts/AdminPosts';
import AdminPostForm from '@/components/adminPostsForm/AdminPostForm';
import AdminUsers from '@/components/adminUsers/AdminUsers';
import AdminUserForm from '@/components/adminUserForm/AdminUserForm';
const AdminPage = async() => {
  const session = await auth()
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
}

export default AdminPage;