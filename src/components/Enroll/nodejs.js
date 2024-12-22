import CodeMirror from "@uiw/react-codemirror";
import React, { useEffect, useState } from "react";
import { javascript } from "@codemirror/lang-javascript";
import { useLayoutEffect, useRef } from "react";
import { FaPlay, FaSave, FaTrash } from "react-icons/fa";

const NodeJSCourse = () => {
    const editorRef = useRef(null);
  const [programs, setPrograms] = useState(() => {
    const saved = localStorage.getItem('nodePrograms');
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        code: `// Basic Node.js Server Example
const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});`, 
        output: '', 
        name: 'HTTP Server Example' 
      }
    ];
  });
  // Add this useLayoutEffect
  useLayoutEffect(() => {
    // Disable ResizeObserver loop limit
    const resizeObserverLoopErrDiv = document.getElementById('webpack-dev-server-client-overlay-div');
    const resizeObserverLoopErr = document.getElementById('webpack-dev-server-client-overlay');
    if (resizeObserverLoopErr) {
      resizeObserverLoopErr.remove();
    }
    if (resizeObserverLoopErrDiv) {
      resizeObserverLoopErrDiv.remove();
    }
  }, []);

  const [selectedTopic, setSelectedTopic] = useState('basics');

  const topics = {
    basics: {
      title: "Node.js Fundamentals",
      content: [
        "Node.js Runtime & Event Loop",
        "Modules and NPM",
        "File System Operations",
        "Buffers and Streams",
        "Error Handling"
      ]
    },
    intermediate: {
      title: "Web Development",
      content: [
        "Express.js Framework",
        "RESTful API Design",
        "Database Integration",
        "Authentication & JWT",
        "Middleware Implementation"
      ]
    },
    advanced: {
      title: "Advanced Concepts",
      content: [
        "Microservices Architecture",
        "WebSocket Implementation",
        "Performance Optimization",
        "Security Best Practices",
        "Testing with Jest"
      ]
    }
  };

  useEffect(() => {
    localStorage.setItem('nodePrograms', JSON.stringify(programs));
  }, [programs]);

  const handleCodeChange = (id, newCode) => {
    setPrograms(programs.map(prog => 
      prog.id === id ? { ...prog, code: newCode } : prog
    ));
  };
 
  const COURSE_PDF_URL = "https://drive.google.com/file/d/1Uv7uFRBuDddyi8psmnJFIzJgBdEoQKQH/view?usp=sharing";

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

      // Analyze code type and generate appropriate output
      if (program.code.includes('http.createServer')) {
        const portMatch = program.code.match(/listen\((\d+)/);
        const port = portMatch ? portMatch[1] : '3000';
        output.push(`Server started successfully!`);
        output.push(`Listening on port ${port}`);
        output.push(`\nTest the server:`);
        output.push(`curl http://localhost:${port}`);
      } 
      else if (program.code.includes('fs.readFile')) {
        output.push(`File system operation simulated`);
        output.push(`File read successfully`);
      }
      else if (program.code.includes('express')) {
        output.push(`Express server started`);
        output.push(`Server is running on port 3000`);
      }
      else {
        // For other types of code, try to execute safely
        const sandbox = {
          console: customConsole,
          setTimeout: (fn) => fn(),
          setInterval: (fn) => fn(),
          require: (module) => {
            return {
              createServer: () => ({ listen: () => {} }),
              readFile: () => {},
              writeFile: () => {},
            };
          }
        };

        new Function('sandbox', `with (sandbox) { ${program.code} }`)(sandbox);
      }

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
      code: '// Write your Node.js code here\nconsole.log("Hello, World!");', 
      output: '', 
      name: `Program ${newId}` 
    }]);
  };

  const removeProgram = (id) => {
    setPrograms(programs.filter(prog => prog.id !== id));
  };

  const saveProgram = (id) => {
    localStorage.setItem(`node_program_${id}`, JSON.stringify(programs.find(p => p.id === id)));
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
    <div className="flex justify-between items-center mb-8">
    <h1 className="text-4xl font-bold">Node.js Course</h1>
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
                  ? 'bg-green-500 text-white' 
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
      ref={editorRef}
      value={program.code}
      height="200px"
      extensions={[javascript({ jsx: true })]}
      onChange={(value) => handleCodeChange(program.id, value)}
      className="border rounded-lg mb-4"
      theme="dark"
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        highlightSpecialChars: true,
        foldGutter: true,
        drawSelection: true,
        dropCursor: true,
        allowMultipleSelections: true,
        indentOnInput: true,
        bracketMatching: true,
        closeBrackets: true,
        autocompletion: true,
        rectangularSelection: true,
        crosshairCursor: true,
        highlightActiveLine: true,
        highlightSelectionMatches: true,
        closeBracketsKeymap: true,
        defaultKeymap: true,
        searchKeymap: true,
        historyKeymap: true,
        foldKeymap: true,
        completionKeymap: true,
        lintKeymap: true,
      }}
      style={{ overflow: 'hidden' }}
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
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
        >
          Add New Program
        </button>
      </div>
    </div>
  );
};

export default NodeJSCourse;