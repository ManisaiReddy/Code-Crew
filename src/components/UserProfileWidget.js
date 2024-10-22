import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSpinner, FaUser } from "react-icons/fa";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaSpinner, FaUser } from "react-icons/fa";

// const UserProfileWidget = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isExpanded, setIsExpanded] = useState(false);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const response = await axios.get('http://localhost:8000/api/user/profile', {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setUser(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to fetch user profile');
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   if (loading) {
//     return <FaSpinner className="animate-spin text-2xl text-blue-500" />;
//   }

//   if (error) {
//     return <div className="text-red-500">{error}</div>;
//   }

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="relative">
//       <button
//         onClick={() => setIsExpanded(!isExpanded)}
//         className="flex items-center space-x-2 bg-white p-2 rounded-full shadow-md"
//       >
//         {user.profile_pic ? (
//           <img
//             src={`http://localhost:8000/${user.profile_pic}`}
//             alt={user.full_name}
//             className="w-8 h-8 rounded-full object-cover"
//           />
//         ) : (
//           <FaUser className="w-8 h-8 text-gray-400" />
//         )}
//         <span className="font-medium">{user.full_name}</span>
//       </button>

//       {isExpanded && (
//         <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
//           <div className="p-4">
//             <h3 className="text-lg font-semibold mb-2">{user.full_name}</h3>
//             <p className="text-sm text-gray-600 mb-1">Email: {user.email}</p>
//             <p className="text-sm text-gray-600 mb-1">Gender: {user.gender}</p>
//             <p className="text-sm text-gray-600 mb-1">DOB: {new Date(user.dob).toLocaleDateString()}</p>
//             <p className="text-sm text-gray-600 mb-1">Interests: {user.interests}</p>
//             {user.resume_link && (
//               <a
//                 href={user.resume_link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="text-sm text-blue-500 hover:underline"
//               >
//                 View Resume
//               </a>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserProfileWidget;



const UserProfileWidget = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleMouseEnter = () => {
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    setIsExpanded(false);
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
    <div className="relative" onMouseLeave={handleMouseLeave}>
      <button
        onMouseEnter={handleMouseEnter}
        className="flex items-center space-x-2 bg-white p-2 rounded-full shadow-md"
      >
        {user.profile_pic ? (
          <img
            src={`http://localhost:8000/${user.profile_pic}`}
            alt={user.full_name}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <FaUser className="w-8 h-8 text-gray-400" />
        )}
        <span className="font-medium">{user.full_name}</span>
      </button>

      {isExpanded && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10">
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-2">{user.full_name}</h3>
            <p className="text-sm text-gray-600 mb-1">Email: {user.email}</p>
            <p className="text-sm text-gray-600 mb-1">Gender: {user.gender}</p>
            <p className="text-sm text-gray-600 mb-1">DOB: {new Date(user.dob).toLocaleDateString()}</p>
            <p className="text-sm text-gray-600 mb-1">Interests: {user.interests}</p>
            {user.resume_link && (
              <a
                href={user.resume_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline"
              >
                View Resume
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileWidget;