import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaDownload, FaEllipsisV, FaPlus, FaSpinner, FaTimes, FaUpload, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { FaEllipsisV, FaPlus, FaSpinner, FaTimes, FaUpload, FaUser } from "react-icons/fa";

// const UserProfileWidget = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showOptions, setShowOptions] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [projectDescription, setProjectDescription] = useState("");

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

//   const handleOpenModal = () => {
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setShowOptions(false);
//   };

//   const toggleOptions = (e) => {
//     e.stopPropagation();
//     setShowOptions(!showOptions);
//   };

//   const closeOptions = () => {
//     setShowOptions(false);
//   };

//   const handleFileUpload = (event) => {
//     const files = event.target.files;
//     const fileList = Array.from(files);
//     const reader = new FileReader();

//     reader.onload = (e) => {
//       const fileContent = e.target.result;
//       const newFile = {
//         name: files[0].name,
//         content: fileContent,
//         description: projectDescription
//       };
//       setUploadedFiles([...uploadedFiles, newFile]);
//       setProjectDescription("");
//     };

//     fileList.forEach(file => {
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleOpenUploadModal = () => {
//     setIsUploadModalOpen(true);
//   };

//   const handleCloseUploadModal = () => {
//     setIsUploadModalOpen(false);
//   };

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
//     <>
//       <button
//         onClick={handleOpenModal}
//         className="flex items-center space-x-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-50"
//       >
//         {user?.profile_pic ? (
//           <img
//             src={`http://localhost:8000/${user.profile_pic}`}
//             alt={user.full_name}
//             className="w-8 h-8 rounded-full object-cover"
//           />
//         ) : (
//           <FaUser className="w-8 h-8 text-gray-400" />
//         )}
//         <span className="font-medium text-sm">{user?.full_name}</span>
//       </button>

//       {isModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           onClick={handleCloseModal}
//         >
//           <div
//             className="bg-white rounded-lg w-1/2 h-1/2 p-4 relative shadow-lg flex flex-col overflow-hidden"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={handleCloseModal}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-sm"
//             >
//               <FaTimes className="w-4 h-4" />
//             </button>

//             <div className="flex flex-col h-full space-y-4">
//               <div className="flex flex-col items-center relative">
//                 <div className="relative">
//                   {user?.profile_pic ? (
//                     <img
//                       src={`http://localhost:8000/${user.profile_pic}`}
//                       alt={user.full_name}
//                       className="w-16 h-16 rounded-full object-cover"
//                     />
//                   ) : (
//                     <FaUser className="w-16 h-16 text-gray-400" />
//                   )}
//                   <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 text-xs">
//                     <FaPlus className="w-3 h-3" />
//                   </button>
//                 </div>

//                 <div className="absolute top-0 right-4">
//                   <div className="relative">
//                     <button
//                       onClick={() => setDropdownOpen(!dropdownOpen)}
//                       className="text-gray-600 hover:text-gray-800"
//                     >
//                       <FaEllipsisV className="w-4 h-4" />
//                     </button>
//                     {dropdownOpen && (
//                       <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-32 z-10">
//                         <button
//                           onClick={() => {
//                             /* Add download handler */
//                           }}
//                           className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         >
//                           Download
//                         </button>
//                         <button
//                           onClick={handleOpenUploadModal}
//                           className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         >
//                           Upload
//                         </button>
//                         <button
//                           onClick={() => {
//                             /* Add logout handler */
//                           }}
//                           className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                         >
//                           Logout
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <h2 className="text-base font-bold mt-2">{user?.full_name}</h2>
//               </div>

//               <div className="grid grid-cols-2 gap-2 text-sm">
//                 <div>
//                   <span className="font-semibold text-gray-600">Full Name:</span>{" "}
//                   <span className="text-gray-800">{user?.full_name || "N/A"}</span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-600">Date of Birth:</span>{" "}
//                   <span className="text-gray-800">
//                     {user?.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}
//                   </span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-600">Resume Link:</span>{" "}
//                   <a
//                     href={user?.resume_link || "#"}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-500 hover:underline"
//                   >
//                     {user?.resume_link || "N/A"}
//                   </a>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-600">Gender:</span>{" "}
//                   <span className="text-gray-800">{user?.gender || "N/A"}</span>
//                 </div>
//                 <div>
//                   <span className="font-semibold text-gray-600">Interests:</span>{" "}
//                   <span className="text-gray-800">{user?.interests || "N/A"}</span>
//                 </div>
//               </div>

//               <div className="flex-1 overflow-auto border-t pt-2">
//                 <h3 className="font-bold text-gray-700 text-sm mb-2">Posts:</h3>
//                 <div className="space-y-2">
//                   {uploadedFiles.length ? (
//                     uploadedFiles.map((file, index) => (
//                       <div
//                         key={index}
//                         className="bg-gray-100 p-2 rounded-md shadow-sm text-xs"
//                       >
//                         <h4 className="font-semibold">{file.name}</h4>
//                         <p className="text-gray-600 truncate">{file.description}</p>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-gray-500 text-sm">No posts available.</p>
//                   )}
//                 </div>
//               </div>

//               <div className="flex justify-end space-x-2 mt-2">
//                 <button
//                   onClick={() => {
//                     /* Add edit profile handler */
//                   }}
//                   className="py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
//                 >
//                   Edit Profile
//                 </button>
//                 <button
//                   onClick={handleCloseModal}
//                   className="py-1 px-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-xs"
//                 >
//                   Close
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {isUploadModalOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           onClick={handleCloseUploadModal}
//         >
//           <div
//             className="bg-white rounded-lg w-1/2 p-4 relative shadow-lg flex flex-col overflow-hidden"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <button
//               onClick={handleCloseUploadModal}
//               className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-sm"
//             >
//               <FaTimes className="w-4 h-4" />
//             </button>

//             <div className="flex flex-col h-full space-y-4">
//               <h2 className="text-base font-bold mt-2">Upload Project</h2>
//               <input
//                 type="file"
//                 onChange={handleFileUpload}
//                 className="border p-2 rounded-md"
//               />
//               <textarea
//                 placeholder="Project Description"
//                 value={projectDescription}
//                 onChange={(e) => setProjectDescription(e.target.value)}
//                 className="border p-2 rounded-md"
//               />
//               <button
//                 onClick={handleCloseUploadModal}
//                 className="py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
//               >
//                 Upload
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default UserProfileWidget;

const UserProfileWidget = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [projectDescription, setProjectDescription] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
          return;
        }
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
  }, [navigate]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setShowOptions(false);
    setDropdownOpen(false);
  };

  const toggleOptions = (e) => {
    e.stopPropagation();
    setDropdownOpen(!dropdownOpen);
  };

  const closeOptions = () => {
    setDropdownOpen(false);
  };

  const handleFileUpload = (event) => {
    const files = event.target.files;
    const fileList = Array.from(files);
    const reader = new FileReader();

    reader.onload = (e) => {
      const fileContent = e.target.result;
      const newFile = {
        name: files[0].name,
        content: fileContent,
        description: projectDescription
      };
      setUploadedFiles([...uploadedFiles, newFile]);
      setProjectDescription("");

      // Simulate saving the file to the uploads folder
      const blob = new Blob([fileContent], { type: files[0].type });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = files[0].name;
      link.click();
      URL.revokeObjectURL(url);
    };

    fileList.forEach(file => {
      reader.readAsDataURL(file);
    });
  };

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
    setDropdownOpen(false);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const handleOpenDownloadModal = () => {
    setIsDownloadModalOpen(true);
    setDropdownOpen(false);
  };

  const handleCloseDownloadModal = () => {
    setIsDownloadModalOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/');
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
        <span className="font-medium text-sm">{user?.full_name}</span>
      </button>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-lg w-1/2 h-1/2 p-4 relative shadow-lg flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-sm"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            <div className="flex flex-col h-full space-y-4">
              <div className="flex flex-col items-center relative">
                <div className="relative">
                  {user?.profile_pic ? (
                    <img
                      src={`http://localhost:8000/${user.profile_pic}`}
                      alt={user.full_name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <FaUser className="w-16 h-16 text-gray-400" />
                  )}
                  <button className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 text-xs">
                    <FaPlus className="w-3 h-3" />
                  </button>
                </div>

                <div className="absolute top-0 right-4">
                  <div className="relative">
                    <button
                      onClick={toggleOptions}
                      className="text-gray-600 hover:text-gray-800"
                    >
                      <FaEllipsisV className="w-4 h-4" />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute right-0 mt-2 bg-white border rounded shadow-md w-32 z-10">
                        <button
                          onClick={handleOpenDownloadModal}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FaDownload className="inline mr-2" /> Download
                        </button>
                        <button
                          onClick={handleOpenUploadModal}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <FaUpload className="inline mr-2" /> Upload
                        </button>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <h2 className="text-base font-bold mt-2">{user?.full_name}</h2>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="font-semibold text-gray-600">Full Name:</span>{" "}
                  <span className="text-gray-800">{user?.full_name || "N/A"}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Date of Birth:</span>{" "}
                  <span className="text-gray-800">
                    {user?.dob ? new Date(user.dob).toLocaleDateString() : "N/A"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Resume Link:</span>{" "}
                  <a
                    href={user?.resume_link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {user?.resume_link || "N/A"}
                  </a>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Gender:</span>{" "}
                  <span className="text-gray-800">{user?.gender || "N/A"}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600">Interests:</span>{" "}
                  <span className="text-gray-800">{user?.interests || "N/A"}</span>
                </div>
              </div>

              <div className="flex-1 overflow-auto border-t pt-2">
                <h3 className="font-bold text-gray-700 text-sm mb-2">Posts:</h3>
                <div className="space-y-2">
                  {uploadedFiles.length ? (
                    uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="bg-gray-100 p-2 rounded-md shadow-sm text-xs"
                      >
                        <h4 className="font-semibold">{file.name}</h4>
                        <p className="text-gray-600">{file.description}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No posts available.</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-2">
                <button
                  onClick={() => {
                    /* Add edit profile handler */
                  }}
                  className="py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
                >
                  Edit Profile
                </button>
                <button
                  onClick={handleCloseModal}
                  className="py-1 px-3 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isUploadModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseUploadModal}
        >
          <div
            className="bg-white rounded-lg w-1/2 p-4 relative shadow-lg flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseUploadModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-sm"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            <div className="flex flex-col h-full space-y-4">
              <h2 className="text-base font-bold mt-2">Upload Project</h2>
              <input
                type="file"
                onChange={handleFileUpload}
                className="border p-2 rounded-md"
              />
              <textarea
                placeholder="Project Description"
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="border p-2 rounded-md"
              />
              <button
                onClick={handleCloseUploadModal}
                className="py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-xs"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}

      {isDownloadModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseDownloadModal}
        >
          <div
            className="bg-white rounded-lg w-1/2 p-4 relative shadow-lg flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseDownloadModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-sm"
            >
              <FaTimes className="w-4 h-4" />
            </button>

            <div className="flex flex-col h-full space-y-4">
              <h2 className="text-base font-bold mt-2">Download Projects</h2>
              <div className="space-y-2">
                {uploadedFiles.length ? (
                  uploadedFiles.map((file, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 p-2 rounded-md shadow-sm text-xs"
                    >
                      <h4 className="font-semibold">{file.name}</h4>
                      <p className="text-gray-600">{file.description}</p>
                      <a
                        href={file.content}
                        download={file.name}
                        className="text-blue-500 hover:underline text-xs"
                      >
                        Download
                      </a>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">No files available for download.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfileWidget;
