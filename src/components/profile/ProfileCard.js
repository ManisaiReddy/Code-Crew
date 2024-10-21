import React from "react";
import { Link } from "react-router-dom";

const ProfileCard = ({ user }) => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center">
        <img
          className="h-16 w-16 rounded-full mr-4"
          src={user.avatar}
          alt={user.username}
        />
        <div>
          <h2 className="text-xl font-bold">{user.fullName}</h2>
          <p className="text-gray-600">@{user.username}</p>
        </div>
      </div>
      <p className="mt-4 text-gray-700">{user.bio}</p>
      <div className="mt-6 flex justify-between">
        <span className="text-gray-600">{user.followers} followers</span>
        <span className="text-gray-600">{user.following} following</span>
      </div>
      <Link
        to={`/profile/${user.username}`}
        className="mt-4 block text-center bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
      >
        View Full Profile
      </Link>
    </div>
  );
};

export default ProfileCard;