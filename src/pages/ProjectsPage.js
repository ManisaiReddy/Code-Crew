import React from "react";
import { FaSpinner } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useProjects } from "../hooks/useProjects";

const ProjectsPage = () => {
  const { projects, loading, error } = useProjects();

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-screen">
      <FaSpinner className="animate-spin text-6xl text-blue-500 mb-4" />
      <p className="text-xl text-gray-600">Loading projects...</p>
    </div>
  );
  if (error) return <div className="text-center text-red-500 text-xl">Error: {error.message}</div>;

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold mb-6">Community Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <div key={project.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">By {project.author}</span>
                <Link to={project.link} className="text-blue-500 hover:underline">
                  View Project
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;