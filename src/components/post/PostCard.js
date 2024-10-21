import React, { useState } from "react";

const PostCard = ({ post, onLike, onComment }) => {
  const { id, title, body, image, likes, comments, coder, coderProfile } = post;
  const [comment, setComment] = useState('');

  const handleLike = () => {
    onLike(id);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      onComment(id, comment);
      setComment('');
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 flex items-center">
        <img 
          src={coderProfile} 
          alt={coder} 
          className="w-10 h-10 rounded-full mr-3"
        />
        <h3 className="font-semibold">{coder}</h3>
      </div>
      <img 
        src={image} 
        alt={title} 
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600 mb-4">{body}</p>
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={handleLike}
            className="flex items-center text-gray-500 hover:text-red-500"
          >
            <span className="mr-1">❤️</span>
            {likes}
          </button>
          <span className="text-gray-500">💬 {comments.length}</span>
        </div>
        <form onSubmit={handleCommentSubmit} className="flex">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow border rounded-l-lg px-2 py-1"
          />
          <button 
            type="submit"
            className="bg-blue-500 text-white px-4 py-1 rounded-r-lg"
          >
            Send
          </button>
        </form>
        <div className="mt-4">
          {comments.slice(0, 3).map((comment, index) => (
            <p key={index} className="text-sm text-gray-600 mb-1">
              <span className="font-semibold">{comment.user}:</span> {comment.text}
            </p>
          ))}
          {comments.length > 3 && (
            <p className="text-sm text-blue-500 cursor-pointer">
              View all {comments.length} comments
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;