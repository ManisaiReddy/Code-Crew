import PostCard from "../components/post/PostCard";
import ProfileDetails from "../components/profile/ProfileDetails";
import React from "react";
import { useParams } from "react-router-dom";
import { usePosts } from "../hooks/usePosts";

const ProfilePage = () => {
  const { username } = useParams();
  const { posts, loading, error } = usePosts(username);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <ProfileDetails username={username} />
      <h2 className="text-2xl font-bold mt-8 mb-4">Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;