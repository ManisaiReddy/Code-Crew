import React from "react";
import aiImage from "../Images/ai.png";
import cssImage from "../Images/css.png";
import fullstackImage from "../Images/fullstack.png";
import htmlImage from "../Images/html.png";
import javascriptImage from "../Images/javascript.png";
import nodejsImage from "../Images/node.png";
import pythonImage from "../Images/python.png";
import reactImage from "../Images/logo192.png";
import { useNavigate } from "react-router-dom";
import { useCourses } from "../hooks/useCourses";

import {
  FaCalendarAlt,
  FaClock,
  FaSpinner,
  FaUserGraduate,
} from "react-icons/fa";

const CoursesPage = () => {
  const navigate = useNavigate();
  const { courses, loading, error } = useCourses();

  if (loading)
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <FaSpinner className="animate-spin text-6xl text-blue-500 mb-4" />
        <p className="text-xl text-gray-600">Loading courses...</p>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 text-xl">
        Error: {error.message}
      </div>
    );

  const getCourseImage = (courseTitle) => {
    const title = courseTitle.toLowerCase();
    if (title.includes("ai") || title.includes("artificial intelligence"))
      return aiImage;
    if (title.includes("html")) return htmlImage;
    if (title.includes("css")) return cssImage;
    if (title.includes("javascript")) return javascriptImage;
    if (title.includes("react")) return reactImage;
    if (title.includes("python")) return pythonImage;
    if (title.includes("node")) return nodejsImage;
    if (title.includes("fullstackcourse")) return fullstackImage;
    return fullstackImage; // Default image
  };

  const handleEnroll = (courseTitle) => {
    const title = courseTitle.toLowerCase();
    let route = "";
  
    if (title.includes("html")) route = "html";
    else if (title.includes("css")) route = "css";
    else if (title.includes("javascript")) route = "javascript";
    else if (title.includes("node")) route = "nodejs";
    else if (title.includes("fullstack")) route = "fullstack";
    else if (title.includes("python")) route = "python";
    else if (title.includes("ai") || title.includes("artificial intelligence")) route = "ai";
  
    navigate(`/courses/${route}`);
  };

  const dummyCourses = [
    {
      id: "ai-001",
      title: "Artificial Intelligence Fundamentals",
      description: "Learn the basics of AI and machine learning.",
    },
    {
      id: "html-001",
      title: "HTML5 Essentials",
      description: "Master the latest HTML5 features and best practices.",
    },
    {
      id: "css-001",
      title: "Advanced CSS Techniques",
      description: "Dive deep into CSS3 and modern styling techniques.",
    },
  ];

  const allCourses = [...dummyCourses, ...courses].sort((a, b) => {
    const order = [
      "ai",
      "html",
      "css",
      "javascript",
      "react",
      "python",
      "fullstackcourse",
    ];
    const aIndex = order.findIndex((tech) =>
      a.title.toLowerCase().includes(tech)
    );
    const bIndex = order.findIndex((tech) =>
      b.title.toLowerCase().includes(tech)
    );
    return (
      (aIndex === -1 ? Infinity : aIndex) - (bIndex === -1 ? Infinity : bIndex)
    );
  });

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-extrabold mb-12 text-center text-gray-800">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600">
          Explore Our Courses
        </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allCourses
          .sort((a, b) => {
            const aIsAI =
              a.title.toLowerCase().includes("ai") ||
              a.title.toLowerCase().includes("artificial intelligence");
            const bIsAI =
              b.title.toLowerCase().includes("ai") ||
              b.title.toLowerCase().includes("artificial intelligence");
            if (aIsAI && !bIsAI) return -1;
            if (!aIsAI && bIsAI) return 1;
            return 0;
          })
          .map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="relative h-0 pb-[56.25%]">
                <img
                  src={getCourseImage(course.title)}
                  alt={course.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <h2 className="absolute bottom-4 left-4 text-white text-2xl font-bold">
                  {course.title}
                </h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4 h-20 overflow-hidden">
                  {course.description}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <span className="flex items-center">
                    <FaCalendarAlt className="mr-2" /> 8 weeks
                  </span>
                  <span className="flex items-center">
                    <FaClock className="mr-2" /> 5 hours/week
                  </span>
                  <span className="flex items-center">
                    <FaUserGraduate className="mr-2" /> Beginner
                  </span>
                </div>
                {/* <button className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg hover:from-blue-600 hover:to-indigo-700">
                Enroll Now
              </button> */}
                <button
                  onClick={() => handleEnroll(course.title)}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg hover:from-blue-600 hover:to-indigo-700"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CoursesPage;
