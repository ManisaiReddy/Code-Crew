import React from "react";
import RepoCodeViewer from "../RepoCodeViewer";
import { FaGithub, FaSpinner } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useProjects } from "../../hooks/useProjects";

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const { projects, loading, error } = useProjects();

  if (loading) return (
    <div className="flex flex-col justify-center items-center h-screen">
      <FaSpinner className="animate-spin text-6xl text-blue-500 mb-4" />
      <p className="text-xl text-gray-600">Loading project details...</p>
    </div>
  );
  if (error) return <div className="text-center text-red-500 text-xl">Error: {error.message}</div>;

  const project = projects.find(p => p.link === `/projects/${projectId}`);

  if (!project) return <div className="text-center text-red-500 text-xl">Project not found</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link to="/projects" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Projects</Link>
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <p className="text-gray-600 mb-4">{project.description}</p>
      <p className="text-sm text-gray-500 mb-4">By {project.author}</p>
      
      {project.repoLink && (
        <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors mb-8">
          <FaGithub className="mr-2" />
          View on GitHub
        </a>
      )}

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Repository Code</h2>
        <RepoCodeViewer repoLink={project.repoLink} />
      </div>
    </div>
  );
};

export default ProjectDetailPage;