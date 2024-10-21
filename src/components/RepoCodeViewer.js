import React, { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";

const RepoCodeViewer = ({ repoLink }) => {
  const [repoCode, setRepoCode] = useState('');
  const [codeLoading, setCodeLoading] = useState(false);

  useEffect(() => {
    const fetchRepoCode = async () => {
      setCodeLoading(true);
      try {
        // This is a placeholder. You'll need to implement actual API call to fetch repo contents
        const response = await fetch(`https://api.github.com/repos/${repoLink.split('github.com/')[1]}/contents`);
        const data = await response.json();
        // For simplicity, we're just getting the content of the first file
        const fileContent = await fetch(data[0].download_url);
        const code = await fileContent.text();
        setRepoCode(code);
      } catch (err) {
        console.error("Failed to fetch repo code:", err);
        setRepoCode("Failed to load repository code.");
      }
      setCodeLoading(false);
    };

    if (repoLink) {
      fetchRepoCode();
    }
  }, [repoLink]);

  if (codeLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <FaSpinner className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg overflow-x-auto">
      <pre>
        <code>{repoCode}</code>
      </pre>
    </div>
  );
};

export default RepoCodeViewer;