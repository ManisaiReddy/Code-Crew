import { useEffect, useState } from "react";

// Dummy course data
const dummyCourses = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the basics of React, including components, state, and props.",
    image: "https://via.placeholder.com/300x200?text=React+Course",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    description: "Dive deep into JavaScript concepts like closures, prototypes, and async programming.",
    image: "https://via.placeholder.com/300x200?text=JavaScript+Course",
  },
  {
    id: 3,
    title: "Node.js Fundamentals",
    description: "Build server-side applications with Node.js and Express.",
    image: "https://via.placeholder.com/300x200?text=Node.js+Course",
  },
  {
    id: 4,
    title: "Full Stack Web Development",
    description: "Create end-to-end web applications using modern technologies.",
    image: "https://via.placeholder.com/300x200?text=Full+Stack+Course",
  },
];

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setCourses(dummyCourses);
        setLoading(false);
      } catch (err) {
        setError(new Error('Failed to fetch courses'));
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return { courses, loading, error };
};
