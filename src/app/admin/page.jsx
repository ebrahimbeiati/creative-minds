import { Suspense } from "react";
import AdminPosts from "@/components/adminPosts/AdminPosts";
import AdminPostForm from "@/components/adminPostForm/adminPostForm";
import AdminUsers from "@/components/adminUsers/AdminUsers";
import AdminUserForm from "@/components/adminUserForm/AdminUserForm";

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Admin Dashboard
          </h1>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Manage your blog posts and users from this central dashboard.
          </p>
        </div>

        {/* Posts Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Blog Posts Management</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Existing Posts</h3>
              <Suspense fallback={
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              }>
                <AdminPosts />
              </Suspense>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Create New Post</h3>
              <AdminPostForm />
            </div>
          </div>
        </div>

        {/* Users Section */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">User Management</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">User List</h3>
              <Suspense fallback={
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                </div>
              }>
                <AdminUsers />
              </Suspense>
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Add New User</h3>
              <AdminUserForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
