import React from "react";
import { FaCode } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

// import React from "react";
// import { FaCode } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";

// // import React from "react";
// // import { FaCode } from "react-icons/fa";
// // import { Link } from "react-router-dom";
// // import { useAuth } from "../../hooks/useAuth";

// // const Navbar = () => {
// //   const { user, logout } = useAuth();

// //   return (
// //     <nav className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white shadow-lg">
// //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
// //         <div className="flex items-center justify-between h-20">
// //           <Link to="/" className="flex-shrink-0 flex items-center group">
// //             <FaCode className="h-10 w-10 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
// //             <span className="ml-2 text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200 group-hover:from-yellow-300 group-hover:to-yellow-100 transition-all duration-300 font-sans">CodeCrew</span>
// //           </Link>
// //           <div className="flex items-center space-x-6">
// //             <Link to="/courses" className="px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-300 font-serif">Courses</Link>
// //             <Link to="/projects" className="px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-300 font-serif">Projects</Link>
// //             {user && user.isAdmin && (
// //               <Link to="/admin" className="px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-300 font-serif">Admin</Link>
// //             )}
// //             {user ? (
// //               <>
// //                 <Link to={`/profile/${user.username}`} className="px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-300 font-serif">
// //                   {user.username}
// //                 </Link>
// //                 <button onClick={logout} className="px-4 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-700 transition-colors duration-300 font-sans">
// //                   Logout
// //                 </button>
// //               </>
// //             ) : (
// //               <Link to="/login" className="px-4 py-2 rounded-md text-base font-medium bg-green-600 hover:bg-green-700 transition-colors duration-300 font-sans">
// //                 Login
// //               </Link>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;



// const Navbar = () => {
//   const { user, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     // Clear localStorage
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     // Call the logout function from useAuth
//     logout();
//     // Redirect to login page
//     navigate("/login");
//   };

//   return (
//     <nav className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white shadow-lg">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-20">
//           <Link to="/" className="flex-shrink-0 flex items-center group">
//             <FaCode className="h-10 w-10 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
//             <span className="ml-2 text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200 group-hover:from-yellow-300 group-hover:to-yellow-100 transition-all duration-300 font-sans">CodeCrew</span>
//           </Link>
//           <div className="flex items-center space-x-6">
//             <Link to="/courses" className="px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-300 font-serif">Courses</Link>
//             <Link to="/projects" className="px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-300 font-serif">Projects</Link>
//             {user && user.isAdmin && (
//               <Link to="/admin" className="px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-300 font-serif">Admin</Link>
//             )}
//             {user ? (
//               <>
//                 <Link to={`/profile/${user.username}`} className="px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-300 font-serif">
//                   {user.username}
//                 </Link>
//                 <button onClick={handleLogout} className="px-4 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-700 transition-colors duration-300 font-sans">
//                   Logout
//                 </button>
//               </>
//             ) : (
//               <Link to="/login" className="px-4 py-2 rounded-md text-base font-medium bg-green-600 hover:bg-green-700 transition-colors duration-300 font-sans">
//                 Login
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;



const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // Call the logout function from useAuth
    logout();
    // Redirect to login page
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0 flex items-center group">
            <FaCode className="h-10 w-10 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
            <span className="ml-2 text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-200 group-hover:from-yellow-300 group-hover:to-yellow-100 transition-all duration-300 font-sans">CodeCrew</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/courses" className="px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-300 font-serif">Courses</Link>
            <Link to="/projects" className="px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-300 font-serif">Projects</Link>
            {localStorage.getItem("token") ? (
              <>
                {user && user.isAdmin && (
                  <Link to="/admin" className="px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-300 font-serif">Admin</Link>
                )}
                {user && (
                  <Link to={`/profile/${user.username}`} className="px-4 py-2 rounded-md text-base font-medium hover:bg-blue-700 transition-colors duration-300 font-serif">
                    {user.username}
                  </Link>
                )}
                <button onClick={handleLogout} className="px-4 py-2 rounded-md text-base font-medium bg-red-600 hover:bg-red-700 transition-colors duration-300 font-sans">
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="px-4 py-2 rounded-md text-base font-medium bg-green-600 hover:bg-green-700 transition-colors duration-300 font-sans">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;