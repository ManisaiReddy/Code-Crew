import PostCard from "../components/post/PostCard";
import React, { useEffect, useState } from "react";
import SearchBar from "../components/common/SearchBar";
import { FaSpinner } from "react-icons/fa";
import { commentOnPost, fetchPosts, likePost } from "../services/api";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  const handleLike = async (postId) => {
    try {
      await likePost(postId);
      setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
    } catch (err) {
      console.error('Error liking post:', err);
    }
  };

  const handleComment = async (postId, comment) => {
    try {
      const newComment = await commentOnPost(postId, comment);
      setPosts(posts.map(post => post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] } 
        : post
      ));
    } catch (err) {
      console.error('Error commenting on post:', err);
    }
  };

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-screen">
      <FaSpinner className="animate-spin text-6xl text-blue-500 mb-4" />
      <p className="text-xl text-gray-600">Loading posts...</p>
    </div>
  );
  if (error) return <div className="text-center text-red-500 text-xl">Error: {error.message}</div>;

  const filteredPosts = posts.filter(post =>
    post?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post?.body?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <SearchBar onSearch={setSearchQuery} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {filteredPosts.map(post => (
          <PostCard 
            key={post.id} 
            post={post} 
            onLike={handleLike}
            onComment={handleComment}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;