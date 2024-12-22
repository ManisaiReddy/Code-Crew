import AICourse from "./components/Enroll/ai";
import AdminPage from "./pages/AdminPage";
import CSSCourse from "./components/Enroll/css";
import CoursesPage from "./pages/CoursesPage";
import Footer from "./components/common/Footer";
import FullstackCourse from "./components/Enroll/fullstack";
import HomePage from "./pages/HomePage";
import HtmlCourse from "./components/Enroll/html";
import JavaScriptCourse from "./components/Enroll/javascript";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/common/Navbar";
import NodeJSCourse from "./components/Enroll/nodejs";
import ProfilePage from "./pages/ProfilePage";
import ProjectDetailPage from "./components/profile/ProjectDetailPage";
import ProjectsPage from "./pages/ProjectsPage";
import PythonCourse from "./components/Enroll/python";
import React from "react";
import RegisterForm from "./components/forms/RegistrationForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// import { AuthProvider } from "./context/AuthContext";

// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import AdminPage from "./pages/AdminPage";
// import CoursesPage from "./pages/CoursesPage";
// import Footer from "./components/common/Footer";
// import HomePage from "./pages/HomePage";
// import LoginPage from "./pages/LoginPage";
// import Navbar from "./components/common/Navbar";
// import ProfilePage from "./pages/ProfilePage";
// import ProjectsPage from "./pages/ProjectsPage";
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { AuthProvider } from "./context/AuthContext";

// // 


// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
//           <Navbar />
//           <main className="flex-grow">
//             <Routes>
//               <Route path="/" element={<HomePage />} />
//               <Route path="/login" element={<LoginPage />} />
//               <Route path="/profile/:username" element={<ProfilePage />} />
//               <Route path="/courses" element={<CoursesPage />} />
//               <Route path="/projects" element={<ProjectsPage />} />
//               <Route path="/admin" element={<AdminPage />} />
//             </Routes>
//           </main>
//           <Footer />
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/profile/:username" element={<ProfilePage />} />
              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/javascript" element={<JavaScriptCourse />} />
              <Route path="/courses/python" element={<PythonCourse />} />
              <Route path="/courses/html" element={<HtmlCourse />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:projectId" element={<ProjectDetailPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/courses/ai" element={<AICourse />} />
              <Route path="/courses/css" element={<CSSCourse />} />
              <Route path="/courses/fullstack" element={<FullstackCourse />} />
              <Route path="/courses/nodejs" element={<NodeJSCourse />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;