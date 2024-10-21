import { useEffect, useState } from "react";

// Dummy project data
const dummyProjects = [
  {
    id: 1,
    title: "Task Management App",
    description: "A React-based task management application with drag-and-drop functionality.",
    author: "Jane Doe",
    link: "https://github.com/janedoe/task-management-app"
  },
  {
    id: 2,
    title: "Weather Forecast Dashboard",
    description: "A dashboard that displays weather forecasts using data from a public API.",
    author: "John Smith",
    link: "https://github.com/johnsmith/weather-dashboard"
  },
  {
    id: 3,
    title: "E-commerce Platform",
    description: "A full-stack e-commerce platform built with MERN stack.",
    author: "Alice Johnson",
    link: "https://github.com/alicejohnson/ecommerce-platform"
  },
  {
    id: 4,
    title: "Fitness Tracker",
    description: "A mobile app for tracking workouts and nutrition using React Native.",
    author: "Bob Wilson",
    link: "https://github.com/bobwilson/fitness-tracker"
  },
  {
    id: 5,
    title: "Social Media Analytics Tool",
    description: "A tool for analyzing social media engagement and trends.",
    author: "Emma Brown",
    link: "https://github.com/emmabrown/social-media-analytics"
  }
];

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setProjects(dummyProjects);
        setLoading(false);
      } catch (err) {
        setError(new Error('Failed to fetch projects'));
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};