import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// import React, { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// const RegisterForm = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     fullName: "",
//     gender: "",
//     dob: "",
//     interests: "",
//     resumeLink: "",
//   });
//   const [profilePic, setProfilePic] = useState(null);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e) => {
//     setProfilePic(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formDataToSend = new FormData();
//     Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));
//     if (profilePic) formDataToSend.append("profilePic", profilePic);

//     try {
//       const response = await axios.post("http://localhost:8000/api/auth/register", formDataToSend, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log(response.data);
//       // Automatically log in after successful registration
//       const loginResponse = await axios.post("http://localhost:8000/api/auth/login", {
//         email: formData.email,
//         password: formData.password,
//       });
//       console.log(loginResponse.data);
//       // Redirect to home page or dashboard
//       navigate("/");
//     } catch (err) {
//       setError("Registration failed. Please try again.");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
//       <h2 className="text-2xl font-bold mb-4">Register</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <input
//         type="email"
//         name="email"
//         placeholder="Email"
//         value={formData.email}
//         onChange={handleChange}
//         className="w-full p-2 mb-4 border rounded"
//         required
//       />
//       <input
//         type="password"
//         name="password"
//         placeholder="Password"
//         value={formData.password}
//         onChange={handleChange}
//         className="w-full p-2 mb-4 border rounded"
//         required
//       />
//       <input
//         type="text"
//         name="fullName"
//         placeholder="Full Name"
//         value={formData.fullName}
//         onChange={handleChange}
//         className="w-full p-2 mb-4 border rounded"
//         required
//       />
//       <select
//         name="gender"
//         value={formData.gender}
//         onChange={handleChange}
//         className="w-full p-2 mb-4 border rounded"
//         required
//       >
//         <option value="">Select Gender</option>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//         <option value="other">Other</option>
//       </select>
//       <input
//         type="date"
//         name="dob"
//         value={formData.dob}
//         onChange={handleChange}
//         className="w-full p-2 mb-4 border rounded"
//         required
//       />
//       <input
//         type="text"
//         name="interests"
//         placeholder="Interests (comma-separated)"
//         value={formData.interests}
//         onChange={handleChange}
//         className="w-full p-2 mb-4 border rounded"
//         required
//       />
//       <input
//         type="url"
//         name="resumeLink"
//         placeholder="Resume Link"
//         value={formData.resumeLink}
//         onChange={handleChange}
//         className="w-full p-2 mb-4 border rounded"
//         required
//       />
//       <input
//         type="file"
//         accept="image/*"
//         onChange={handleFileChange}
//         className="w-full p-2 mb-4 border rounded"
//         required
//       />
//       <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
//         Register
//       </button>
//       <p className="mt-4">
//         Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
//       </p>
//     </form>
//   );
// };

// export default RegisterForm;

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    gender: "",
    dob: "",
    interests: "",
    resumeLink: "",
  });
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => formDataToSend.append(key, formData[key]));
    if (profilePic) formDataToSend.append("profilePic", profilePic);

    try {
      const response = await axios.post("http://localhost:8000/api/auth/register", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(response.data);
      // Automatically log in after successful registration
      const loginResponse = await axios.post("http://localhost:8000/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      console.log(loginResponse.data);
      // Redirect to home page or dashboard
      navigate("/");
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <div className="mt-1">
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <div className="mt-1">
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="interests" className="block text-sm font-medium text-gray-700">
                Interests (comma-separated)
              </label>
              <div className="mt-1">
                <input
                  id="interests"
                  name="interests"
                  type="text"
                  required
                  value={formData.interests}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="resumeLink" className="block text-sm font-medium text-gray-700">
                Resume Link
              </label>
              <div className="mt-1">
                <input
                  id="resumeLink"
                  name="resumeLink"
                  type="url"
                  required
                  value={formData.resumeLink}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="profilePic" className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <div className="mt-1">
                <input
                  id="profilePic"
                  name="profilePic"
                  type="file"
                  accept="image/*"
                  required
                  onChange={handleFileChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Register
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;