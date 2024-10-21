import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const CommentSection = ({ comments, postId }) => {
  const [newComment, setNewComment] = useState('');
  const { user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit the comment
    console.log('Submitting comment:', newComment);
    setNewComment('');
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="text-lg font-semibold mb-2">Comments</h3>
      {comments.map((comment, index) => (
        <div key={index} className="mb-2">
          <p className="font-semibold">{comment.author}</p>
          <p>{comment.content}</p>
        </div>
      ))}
      {user && (
        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            className="w-full p-2 border rounded"
            rows="3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
          ></textarea>
          <button
            type="submit"
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Post Comment
          </button>
        </form>
      )}
    </div>
  );
};

export default CommentSection;