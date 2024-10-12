import styles from './adminPage.module.css'
import { Suspense } from 'react';
import AdminPosts from '@/components/adminPosts/AdminPosts';
import AdminPostForm from '@/components/adminPosts/AdminPostForm';
import AdminUsers from '@/components/adminUsers/AdminUsers';
import AdminUserForm from '@/components/adminUsers/AdminUserForm';
const AdminPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense>
            <AdminPosts />
          </Suspense>
        </div>
        <div className={styles.col}>
        
            <AdminPostForm />
          
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.col}>
          <Suspense>
            <AdminUsers />
          </Suspense>
        </div>
        <div className={styles.col}>
          
            <AdminUserForm />
         
        </div>
      </div>
    </div>
  );
}

export default AdminPage;