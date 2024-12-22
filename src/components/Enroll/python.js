import CodeMirror from "@uiw/react-codemirror";
import React, { useEffect, useState } from "react";
import { python } from "@codemirror/lang-python";
import { FaPlay, FaSave, FaTrash } from "react-icons/fa";

const PythonCourse = () => {
  const [programs, setPrograms] = useState(() => {
    const saved = localStorage.getItem('pythonPrograms');
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        code: `# Basic Python Example
def greet(name):
    return f"Hello, {name}!"

# Test the function
result = greet("Python Learner")
print(result)

# List comprehension example
numbers = [1, 2, 3, 4, 5]
squares = [n**2 for n in numbers]
print("Squares:", squares)`, 
        output: '', 
        name: 'Basic Python Program' 
      }
    ];
  });

  const [selectedTopic, setSelectedTopic] = useState('basics');

  const topics = {
    basics: {
      title: "Python Fundamentals",
      content: [
        "Variables and Data Types",
        "Control Flow (if/else, loops)",
        "Functions and Methods",
        "Lists, Tuples, and Dictionaries",
        "File Handling and Exceptions"
      ],
      examples: {
        "Basic Function": `def calculate_area(radius):
    return 3.14 * radius ** 2

result = calculate_area(5)
print(f"Area: {result}")`,
        "List Operations": `numbers = [1, 2, 3, 4, 5]
doubled = [x * 2 for x in numbers]
print(doubled)`
      }
    },
    intermediate: {
      title: "Intermediate Python",
      content: [
        "Object-Oriented Programming",
        "Modules and Packages",
        "List Comprehensions",
        "Lambda Functions",
        "Decorators and Generators"
      ],
      examples: {
        "Class Example": `class Rectangle:
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height

rect = Rectangle(5, 3)
print(f"Area: {rect.area()}")`,
        "Decorator": `def uppercase_decorator(function):
    def wrapper():
        result = function()
        return result.upper()
    return wrapper

@uppercase_decorator
def greet():
    return "hello world"

print(greet())`
      }
    },
    advanced: {
      title: "Advanced Python",
      content: [
        "Multithreading and Multiprocessing",
        "Network Programming",
        "Database Integration",
        "Web Scraping",
        "Testing and Debugging"
      ],
      examples: {
        "Threading": `import threading

def print_numbers():
    for i in range(5):
        print(f"Number {i}")

thread = threading.Thread(target=print_numbers)
thread.start()`,
        "API Request": `import requests

response = requests.get('https://api.example.com/data')
data = response.json()
print(data)`
      }
    }
  };

  useEffect(() => {
    localStorage.setItem('pythonPrograms', JSON.stringify(programs));
  }, [programs]);

  const handleCodeChange = (id, newCode) => {
    setPrograms(programs.map(prog => 
      prog.id === id ? { ...prog, code: newCode } : prog
    ));
  };

  const runCode = (id) => {
    const program = programs.find(p => p.id === id);
    try {
      // In a real implementation, this would send the code to a Python backend
      // For now, we'll simulate output based on code analysis
      let output = [];
      
      if (program.code.includes('print(')) {
        // Extract print statements and simulate their output
        const printMatches = program.code.match(/print\((.*?)\)/g);
        if (printMatches) {
          output = printMatches.map(match => {
            const content = match.match(/print\((.*?)\)/)[1];
            // Basic evaluation of simple expressions
            try {
              return eval(content.replace(/f".*?{(.*?)}.*?"/, '$1'));
            } catch {
              return content.replace(/["']/g, '');
            }
          });
        }
      }

      if (program.code.includes('class ')) {
        output.push("Class defined successfully");
      }

      if (program.code.includes('def ')) {
        output.push("Function defined successfully");
      }

      if (program.code.includes('import ')) {
        const imports = program.code.match(/import .*$/gm);
        output.push(`Imported modules: ${imports.join(', ')}`);
      }

      setPrograms(programs.map(prog =>
        prog.id === id ? { ...prog, output: output.join('\n') } : prog
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
      code: '# Write your Python code here\n', 
      output: '', 
      name: `Program ${newId}` 
    }]);
  };

  const removeProgram = (id) => {
    setPrograms(programs.filter(prog => prog.id !== id));
  };

  const saveProgram = (id) => {
    localStorage.setItem(`python_program_${id}`, JSON.stringify(programs.find(p => p.id === id)));
  };

  const loadExample = (example) => {
    const newId = Math.max(...programs.map(p => p.id)) + 1;
    setPrograms([...programs, {
      id: newId,
      code: topics[selectedTopic].examples[example],
      output: '',
      name: example
    }]);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-8">Python Programming Course</h1>
      
      {/* Course Navigation */}
      <div className="mb-8">
        <div className="flex space-x-4 mb-4">
          {Object.keys(topics).map((topic) => (
            <button
              key={topic}
              onClick={() => setSelectedTopic(topic)}
              className={`px-4 py-2 rounded-lg ${
                selectedTopic === topic 
                  ? 'bg-yellow-500 text-white' 
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
          
          <div className="mt-6">
            <h4 className="font-semibold mb-2">Example Programs:</h4>
            <div className="flex gap-2">
              {Object.keys(topics[selectedTopic].examples).map((example) => (
                <button
                  key={example}
                  onClick={() => loadExample(example)}
                  className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg hover:bg-yellow-200"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
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
                  className="bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-yellow-600"
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
              extensions={[python()]}
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
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600"
        >
          Add New Program
        </button>
      </div>
    </div>
  );
};

export default PythonCourse;