import { useEffect, useState } from "react";

const projectData = [
  {
    id: 1,
    title: "Node.js RESTful API",
    description: "A simple and scalable Node.js RESTful API with MongoDB integration.",
    author: "Adnan Rahić",
    link: "/projects/nodejs-restful-api",
    repoLink: "https://github.com/adnanrahic/nodejs-restful-api"
  },
  {
    id: 2,
    title: "Python Machine Learning",
    description: "Comprehensive Python code for machine learning and data science techniques.",
    author: "Sebastian Raschka",
    link: "/projects/python-machine-learning",
    repoLink: "https://github.com/rasbt/python-machine-learning-book-3rd-edition"
  },
  {
    id: 3,
    title: "PyOD: Python Outlier Detection",
    description: "A comprehensive and scalable Python toolkit for detecting outliers in multivariate data.",
    author: "Yue Zhao",
    link: "/projects/pyod",
    repoLink: "https://github.com/yzhao062/pyod"
  },
  {
    id: 4,
    title: "Java Design Patterns",
    description: "Implementation of various design patterns in Java with real-world examples.",
    author: "Ilkka Seppälä",
    link: "/projects/java-design-patterns",
    repoLink: "https://github.com/iluwatar/java-design-patterns"
  },
  {
    id: 5,
    title: "Spring PetClinic",
    description: "Sample application demonstrating the use of Spring Boot with Java.",
    author: "Spring Team",
    link: "/projects/spring-petclinic",
    repoLink: "https://github.com/spring-projects/spring-petclinic"
  },
  {
    id: 6,
    title: "Heart Disease Detection",
    description: "Machine learning project for predicting heart disease using various algorithms.",
    author: "Mr. Khan",
    link: "/projects/heart-disease-detection",
    repoLink: "https://github.com/MrKhan0747/Heart-Disease-Detection"
  },
  {
    id: 7,
    title: "CatBoost",
    description: "A fast, scalable, high performance gradient boosting on decision trees library.",
    author: "CatBoost Team",
    link: "/projects/catboost",
    repoLink: "https://github.com/catboost/catboost"
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
        setProjects(projectData);
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