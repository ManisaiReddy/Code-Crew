import CodeMirror from "@uiw/react-codemirror";
import React, { useEffect, useState } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { FaPlay, FaSave, FaTrash } from "react-icons/fa";

const JavaScriptCourse = () => {
  const [programs, setPrograms] = useState(() => {
    const saved = localStorage.getItem('jsPrograms');
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        code: '// Write your JavaScript code here\nconsole.log("Hello, World!");', 
        output: '', 
        name: 'Program 1' 
      }
    ];
  });
  

  const [selectedTopic, setSelectedTopic] = useState('basics');

  const topics = {
    basics: {
      title: "JavaScript Fundamentals",
      content: [
        "Variables and Data Types",
        "Operators and Control Flow",
        "Functions and Scope",
        "Arrays and Objects",
        "Error Handling"
      ]
    },
    intermediate: {
      title: "Intermediate Concepts",
      content: [
        "ES6+ Features",
        "Promises and Async/Await",
        "DOM Manipulation",
        "Event Handling",
        "Local Storage"
      ]
    },
    advanced: {
      title: "Advanced Topics",
      content: [
        "Closures and Prototypes",
        "Design Patterns",
        "Memory Management",
        "Web APIs",
        "Performance Optimization"
      ]
    }
  };
  // Add the course PDF URL constant
  const COURSE_PDF_URL = "https://drive.google.com/file/d/16DwmN7jL9DD1pQ5tyNwoP4UKM9L4_kRk/view?usp=sharing";

  useEffect(() => {
    localStorage.setItem('jsPrograms', JSON.stringify(programs));
  }, [programs]);

  const handleCodeChange = (id, newCode) => {
    setPrograms(programs.map(prog => 
      prog.id === id ? { ...prog, code: newCode } : prog
    ));
  };

  const runCode = (id) => {
    const program = programs.find(p => p.id === id);
    try {
      // Create a safe evaluation environment
      let output = [];
      const customConsole = {
        log: (...args) => {
          output.push(args.map(arg => 
            typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
          ).join(' '));
        },
        error: (...args) => {
          output.push(`Error: ${args.join(' ')}`);
        },
        warn: (...args) => {
          output.push(`Warning: ${args.join(' ')}`);
        }
      };

      // Create sandbox environment
      const sandbox = {
        console: customConsole,
        setTimeout: (fn, delay) => fn(),
        setInterval: (fn, delay) => fn(),
        clearTimeout: () => {},
        clearInterval: () => {},
      };

      // Wrap code to capture console output
      const wrappedCode = `
        with (sandbox) {
          ${program.code}
        }
      `;

      // Execute code in isolated context
      new Function('sandbox', wrappedCode)(sandbox);

      setPrograms(programs.map(prog =>
        prog.id === id ? { ...prog, output: output.join('\n') || 'Code executed successfully!' } : prog
      ));
    } catch (error) {
      setPrograms(programs.map(prog =>
        prog.id === id ? { ...prog, output: `Runtime Error: ${error.message}` } : prog
      ));
    }
  };

  const addProgram = () => {
    const newId = Math.max(...programs.map(p => p.id)) + 1;
    setPrograms([...programs, { 
      id: newId, 
      code: '// Write your JavaScript code here\nconsole.log("Hello, World!");', 
      output: '', 
      name: `Program ${newId}` 
    }]);
  };

  const removeProgram = (id) => {
    setPrograms(programs.filter(prog => prog.id !== id));
  };

  const saveProgram = (id) => {
    localStorage.setItem(`js_program_${id}`, JSON.stringify(programs.find(p => p.id === id)));
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
       <div className="flex justify-between items-center mb-8">
       <h1 className="text-4xl font-bold">JavaScript Course</h1>
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
                  ? 'bg-blue-500 text-white' 
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
                  className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-600"
                >
                  <FaPlay /> Run
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

            <CodeMirror
              value={program.code}
              height="200px"
              extensions={[javascript({ jsx: true })]}
              onChange={(value) => handleCodeChange(program.id, value)}
              className="border rounded-lg mb-4"
              theme="dark"
            />

            {program.output && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Output:</h4>
                <pre className="whitespace-pre-wrap font-mono bg-gray-800 text-white p-4 rounded-lg">
                  {program.output}
                </pre>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addProgram}
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Add New Program
        </button>
      </div>
    </div>
  );
};

export default JavaScriptCourse;