import React from "react";
import { useAuth } from "../hooks/useAuth";

const AdminPage = () => {
  const { user } = useAuth();

  if (!user || !user.isAdmin) {
    return <div>Access Denied</div>;
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          {/* Add user management functionality here */}
        </div>
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Content Moderation</h2>
          {/* Add content moderation functionality here */}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;