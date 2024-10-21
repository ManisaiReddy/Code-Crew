import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { createPost } from "../../services/api";

const PostForm = ({ onPostCreated }) => {
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = await createPost({ content, image, userId: user.id });
      setContent('');
      setImage(null);
      onPostCreated(newPost);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-2 border rounded mb-2"
        rows="3"
      ></textarea>
      <div className="flex items-center justify-between">
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default PostForm;