import CodeMirror from "@uiw/react-codemirror";
import React, { useEffect, useState } from "react";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { FaPlay, FaSave, FaTrash } from "react-icons/fa";

const CSSCourse = () => {
  const [programs, setPrograms] = useState(() => {
    const saved = localStorage.getItem('cssPrograms');
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        code: `/* Basic CSS Example */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f0f0f0;
}

.title {
    color: #333;
    font-size: 24px;
    text-align: center;
}`, 
        html: `<div class="container">
    <h1 class="title">Welcome to CSS Styling</h1>
</div>`,
        output: '', 
        name: 'Basic Styling' 
      }
    ];
  });

  const [selectedTopic, setSelectedTopic] = useState('basics');

  const topics = {
    basics: {
      title: "CSS Fundamentals",
      content: [
        "Selectors and Properties",
        "Box Model",
        "Colors and Typography",
        "Layout Basics",
        "Display and Positioning"
      ]
    },
    intermediate: {
      title: "Intermediate Styling",
      content: [
        "Flexbox Layout",
        "Grid System",
        "Transitions & Animations",
        "Responsive Design",
        "Pseudo-classes & Elements"
      ]
    },
    advanced: {
      title: "Advanced Techniques",
      content: [
        "CSS Architecture",
        "CSS Preprocessors",
        "CSS Variables",
        "Advanced Animations",
        "CSS Best Practices"
      ]
    }
  };

  const COURSE_PDF_URL='https://drive.google.com/file/d/11TPoqAf18shpnI5BspKLWQiszJxXa8x_/view?usp=drive_link'

  useEffect(() => {
    localStorage.setItem('cssPrograms', JSON.stringify(programs));
  }, [programs]);

  const handleCodeChange = (id, newCode) => {
    setPrograms(programs.map(prog => 
      prog.id === id ? { ...prog, code: newCode } : prog
    ));
  };

  const handleHtmlChange = (id, newHtml) => {
    setPrograms(programs.map(prog => 
      prog.id === id ? { ...prog, html: newHtml } : prog
    ));
  };

  const runCode = (id) => {
    const program = programs.find(p => p.id === id);
    try {
      const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        ${program.code}
    </style>
</head>
<body>
    ${program.html}
</body>
</html>`;

      setPrograms(programs.map(prog =>
        prog.id === id ? { ...prog, output: htmlContent } : prog
      ));
    } catch (error) {
      setPrograms(programs.map(prog =>
        prog.id === id ? { ...prog, output: `Error: ${error.message}` } : prog
      ));
    }
  };

  const addProgram = () => {
    const newId = Math.max(...programs.map(p => p.id)) + 1;
    setPrograms([...programs, { 
      id: newId, 
      code: '/* Write your CSS here */\n', 
      html: '<!-- Write your HTML here -->\n',
      output: '', 
      name: `Program ${newId}` 
    }]);
  };

  const removeProgram = (id) => {
    setPrograms(programs.filter(prog => prog.id !== id));
  };

  const saveProgram = (id) => {
    localStorage.setItem(`css_program_${id}`, JSON.stringify(programs.find(p => p.id === id)));
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold">CSS Course</h1>
      <a
        href={COURSE_PDF_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600 flex items-center gap-2"
      >
        Learn Course
      </a>
    </div>
      
      {/* Course Navigation */}
      <div className="mb-8">
        <div className="flex space-x-4 mb-4">
          {Object.keys(topics).map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-4 py-2 rounded-lg ${
                selectedTopic === topic 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {topics[topic].title}
            </button>
          ))}
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">
            {topics[selectedTopic].title} - Topics Covered
          </h3>
          <ul className="list-disc pl-6 space-y-2">
            {topics[selectedTopic].content.map((item, index) => (
              <li key={index} className="text-gray-700">{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {programs.map((program) => (
          <div key={program.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">{program.name}</h3>
              <div className="flex gap-4">
                <button
                  onClick={() => runCode(program.id)}
                  className="bg-purple-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-600"
                >
                  <FaPlay /> Preview
                </button>
                <button
                  onClick={() => saveProgram(program.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-600"
                >
                  <FaSave /> Save
                </button>
                <button
                  onClick={() => removeProgram(program.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-red-600"
                >
                  <FaTrash /> Remove
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold mb-2">HTML:</h4>
                <CodeMirror
                  value={program.html}
                  height="200px"
                  extensions={[html()]}
                  onChange={(value) => handleHtmlChange(program.id, value)}
                  className="border rounded-lg"
                  theme="dark"
                />
              </div>
              <div>
                <h4 className="font-semibold mb-2">CSS:</h4>
                <CodeMirror
                  value={program.code}
                  height="200px"
                  extensions={[css()]}
                  onChange={(value) => handleCodeChange(program.id, value)}
                  className="border rounded-lg"
                  theme="dark"
                />
              </div>
            </div>

            {program.output && (
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Preview:</h4>
                <div className="border rounded-lg p-4 bg-white">
                  <iframe
                    title="preview"
                    srcDoc={program.output}
                    style={{ width: '100%', height: '300px', border: 'none' }}
                    sandbox="allow-scripts"
                  />
                </div>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addProgram}
          className="bg-purple-500 text-white px-6 py-3 rounded-lg hover:bg-purple-600"
        >
          Add New Program
        </button>
      </div>
    </div>
  );
};

export default CSSCourse;