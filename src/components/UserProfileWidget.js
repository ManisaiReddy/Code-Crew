import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEllipsisV, FaPlus, FaSpinner, FaTimes, FaUser } from "react-icons/fa";

const UserProfileWidget = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8000/api/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch user profile');
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowOptions(false); // Close options when modal is closed
  };

  const toggleOptions = (e) => {
    e.stopPropagation(); // Prevent click from propagating to modal
    setShowOptions(!showOptions);
  };

  const closeOptions = () => {
    setShowOptions(false);
  };

  if (loading) {
    return <FaSpinner className="animate-spin text-2xl text-blue-500" />;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="flex items-center space-x-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
      >
        {user?.profile_pic ? (
          <img
            src={`http://localhost:8000/${user.profile_pic}`}
            alt={user.full_name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <FaUser className="w-8 h-8 text-gray-400" />
        )}
        <span className="font-medium">{user?.full_name}</span>
      </button>

      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal} // Close modal on clicking outside
        >
          <div 
            className="bg-white rounded-lg w-full max-w-md p-6 relative shadow-lg transform transition-all duration-300 ease-in-out"
            onClick={e => e.stopPropagation()} // Prevents modal from closing when clicking inside
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes className="w-5 h-5" />
            </button>

            <button
              onClick={toggleOptions}
              className="absolute top-4 right-16 text-gray-500 hover:text-gray-700"
            >
              <FaEllipsisV className="w-5 h-5" />
            </button>

            {showOptions && (
              <div className="absolute top-10 right-16 bg-white shadow-md rounded-md" onClick={closeOptions}>
                <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit Profile</button>
                <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</button>
                <button className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</button>
              </div>
            )}

            <div className="flex flex-col items-center space-y-4 mb-6" onClick={closeOptions}>
              <div className="relative">
                {user?.profile_pic ? (
                  <img
                    src={`http://localhost:8000/${user.profile_pic}`}
                    alt={user.full_name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <FaUser className="w-20 h-20 text-gray-400" />
                )}
                <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1">
                  <FaPlus className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-2xl font-bold">{user?.full_name}</h2>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors">
                Create Post
              </button>
            </div>

            <form className="grid grid-cols-2 gap-4 mb-6" onClick={closeOptions}>
              <div>
                <label className="text-sm text-gray-500">Username</label>
                <input
                  type="text"
                  value={user?.username || 'N/A'}
                  className="w-full border border-gray-300 rounded-md p-2"
                  readOnly
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Full Name</label>
                <input
                  type="text"
                  value={user?.full_name || 'N/A'}
                  className="w-full border border-gray-300 rounded-md p-2"
                  readOnly
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Date of Birth</label>
                <input
                  type="text"
                  value={user?.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'}
                  className="w-full border border-gray-300 rounded-md p-2"
                  readOnly
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Resume Link</label>
                <input
                  type="text"
                  value={user?.resume_link || 'N/A'}
                  className="w-full border border-gray-300 rounded-md p-2"
                  readOnly
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Gender</label>
                <input
                  type="text"
                  value={user?.gender || 'N/A'}
                  className="w-full border border-gray-300 rounded-md p-2"
                  readOnly
                />
              </div>
              <div>
                <label className="text-sm text-gray-500">Interests</label>
                <input
                  type="text"
                  value={user?.interests || 'N/A'}
                  className="w-full border border-gray-300 rounded-md p-2"
                  readOnly
                />
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-gray-200" onClick={closeOptions}>
              <h3 className="text-lg font-bold mb-4">Your Posts</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-500">Post Name</label>
                  <p className="font-medium">{user?.post_name || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-sm text-gray-500">Post Description</label>
                  <p className="font-medium">{user?.post_description || 'N/A'}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-200" onClick={closeOptions}>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {/* Add edit profile handler */}}
                  className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleCloseModal}
                  className="w-full py-2 px-4 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileWidget;