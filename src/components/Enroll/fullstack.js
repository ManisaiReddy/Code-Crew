import CodeMirror from "@uiw/react-codemirror";
import React, { useEffect, useState } from "react";
import { css } from "@codemirror/lang-css";
import { html } from "@codemirror/lang-html";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";
import { FaCode, FaDatabase, FaGlobe, FaPlay, FaSave, FaServer, FaTrash } from "react-icons/fa";

// import { sql } from "@codemirror/lang-sql";
 const FullstackCourse = () => {
  const [programs, setPrograms] = useState(() => {
    const saved = localStorage.getItem('fullstackPrograms');
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        frontend: {
          html: `<!-- Frontend Example -->
<div id="app">
  <h1>{{ title }}</h1>
  <form @submit.prevent="handleSubmit">
    <input v-model="newItem" placeholder="Add item...">
    <button type="submit">Add</button>
  </form>
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.text }}
    </li>
  </ul>
</div>`,
          css: `/* Styles */
#app {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}`,
          js: `// Vue.js Frontend Logic
new Vue({
  el: '#app',
  data: {
    title: 'Todo List App',
    newItem: '',
    items: []
  },
  methods: {
    async handleSubmit() {
      if (!this.newItem) return;
      
      try {
        const response = await axios.post('/api/items', {
          text: this.newItem
        });
        this.items.push(response.data);
        this.newItem = '';
      } catch (error) {
        console.error('Error:', error);
      }
    }
  },
  async mounted() {
    const response = await axios.get('/api/items');
    this.items = response.data;
  }
})`
        },
        backend: {
          code: `# Flask Backend Example
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///todos.db'
db = SQLAlchemy(app)

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(200), nullable=False)

@app.route('/api/items', methods=['GET'])
def get_items():
    todos = Todo.query.all()
    return jsonify([{'id': t.id, 'text': t.text} for t in todos])

@app.route('/api/items', methods=['POST'])
def add_item():
    data = request.get_json()
    new_todo = Todo(text=data['text'])
    db.session.add(new_todo)
    db.session.commit()
    return jsonify({'id': new_todo.id, 'text': new_todo.text})

if __name__ == '__main__':
    db.create_all()
    app.run(debug=True)`,
          database: `-- Database Schema
CREATE TABLE todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes
CREATE INDEX idx_todos_created_at ON todos(created_at);`
        },
        name: 'Full Stack Todo App'
      }
    ];
  });

  const [selectedTopic, setSelectedTopic] = useState('frontend');
  const [activeTab, setActiveTab] = useState('html');

  const topics = {
    frontend: {
      title: "Frontend Development",
      content: [
        "HTML5 & Semantic Markup",
        "CSS3 & Modern Layouts",
        "JavaScript & ES6+",
        "React/Vue/Angular",
        "State Management",
        "REST API Integration"
      ]
    },
    backend: {
      title: "Backend Development",
      content: [
        "Server Architecture",
        "RESTful API Design",
        "Database Design",
        "Authentication & Security",
        "Server-side Frameworks",
        "API Documentation"
      ]
    },
    database: {
      title: "Database Management",
      content: [
        "SQL Fundamentals",
        "Database Design",
        "Indexing & Optimization",
        "NoSQL Databases",
        "ORM Tools",
        "Data Migration"
      ]
    },
    deployment: {
      title: "DevOps & Deployment",
      content: [
        "Git Version Control",
        "CI/CD Pipelines",
        "Docker Containers",
        "Cloud Services (AWS/GCP)",
        "Monitoring & Logging",
        "Security Best Practices"
      ]
    }
  };
  const addProgram = () => {
    const newId = Math.max(...programs.map(p => p.id)) + 1;
    setPrograms([...programs, { 
      id: newId, 
      frontend: {
        html: '<!-- Write your HTML here -->',
        css: '/* Write your CSS here */',
        js: '// Write your JavaScript here'
      },
      backend: {
        code: '# Write your backend code here',
        database: '-- Write your SQL here'
      },
      output: '', 
      name: `Full Stack Project ${newId}` 
    }]);
  };

  const removeProgram = (id) => {
    setPrograms(programs.filter(prog => prog.id !== id));
  };

  const saveProgram = (id) => {
    localStorage.setItem(`fullstack_program_${id}`, JSON.stringify(programs.find(p => p.id === id)));
  };

  useEffect(() => {
    localStorage.setItem('fullstackPrograms', JSON.stringify(programs));
  }, [programs]);

  const handleCodeChange = (id, section, subsection, newCode) => {
    setPrograms(programs.map(prog => {
      if (prog.id === id) {
        if (section === 'frontend') {
          return {
            ...prog,
            frontend: { ...prog.frontend, [subsection]: newCode }
          };
        } else if (section === 'backend') {
          return {
            ...prog,
            backend: { ...prog.backend, [subsection]: newCode }
          };
        }
      }
      return prog;
    }));
  };

  const runCode = (id) => {
    const program = programs.find(p => p.id === id);
    try {
      // Simulate full-stack application execution
      let output = [];
      
      output.push("=== Frontend Build ===");
      output.push("Compiling Vue.js application...");
      output.push("Bundling assets...");
      output.push("Frontend build successful!");
      
      output.push("\n=== Backend Server ===");
      output.push("Starting Flask server...");
      output.push("Database connected!");
      output.push("Server running on http://localhost:5000");
      
      output.push("\n=== API Endpoints ===");
      output.push("GET  /api/items  - Fetch all items");
      output.push("POST /api/items  - Create new item");
      
      setPrograms(programs.map(prog =>
        prog.id === id ? { ...prog, output: output.join('\n') } : prog
      ));
    } catch (error) {
      setPrograms(programs.map(prog =>
        prog.id === id ? { ...prog, output: `Error: ${error.message}` } : prog
      ));
    }
  };
  const COURSE_PDF_URL='https://drive.google.com/file/d/1Uv7uFRBuDddyi8psmnJFIzJgBdEoQKQH/view?usp=sharing'

  // ... (addProgram, removeProgram, and saveProgram functions remain the same)

  return (
    <div className="max-w-7xl mx-auto py-12 px-4">
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold">FullStack Web Development Course</h1>
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
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                selectedTopic === topic 
                  ? 'bg-teal-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {topic === 'frontend' && <FaGlobe />}
              {topic === 'backend' && <FaServer />}
              {topic === 'database' && <FaDatabase />}
              {topic === 'deployment' && <FaCode />}
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
                  className="bg-teal-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-teal-600"
                >
                  <FaPlay /> Run Full Stack
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

            {/* Frontend Section */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <FaGlobe /> Frontend
              </h4>
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => setActiveTab('html')}
                  className={`px-3 py-1 rounded ${
                    activeTab === 'html' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100'
                  }`}
                >
                  HTML
                </button>
                <button
                  onClick={() => setActiveTab('css')}
                  className={`px-3 py-1 rounded ${
                    activeTab === 'css' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100'
                  }`}
                >
                  CSS
                </button>
                <button
                  onClick={() => setActiveTab('js')}
                  className={`px-3 py-1 rounded ${
                    activeTab === 'js' ? 'bg-teal-100 text-teal-700' : 'bg-gray-100'
                  }`}
                >
                  JavaScript
                </button>
              </div>
              <CodeMirror
                value={program.frontend[activeTab]}
                height="200px"
                extensions={[
                  activeTab === 'html' ? html() :
                  activeTab === 'css' ? css() :
                  javascript()
                ]}
                onChange={(value) => handleCodeChange(program.id, 'frontend', activeTab, value)}
                className="border rounded-lg"
                theme="dark"
              />
            </div>

            {/* Backend Section */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <FaServer /> Backend
              </h4>
              <CodeMirror
                value={program.backend.code}
                height="200px"
                extensions={[python()]}
                onChange={(value) => handleCodeChange(program.id, 'backend', 'code', value)}
                className="border rounded-lg"
                theme="dark"
              />
            </div>

            {/* Database Section */}
            <div className="mb-6">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <FaDatabase /> Database
              </h4>
              <CodeMirror
  value={program.backend.database}
  height="200px"
  extensions={[javascript()]}  // Use javascript instead of sql
  onChange={(value) => handleCodeChange(program.id, 'backend', 'database', value)}
  className="border rounded-lg"
  theme="dark"
/>
            </div>

            {program.output && (
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Application Output:</h4>
                <pre className="whitespace-pre-wrap font-mono bg-gray-800 text-white p-4 rounded-lg">
                  {program.output}
                </pre>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addProgram}
          className="bg-teal-500 text-white px-6 py-3 rounded-lg hover:bg-teal-600"
        >
          Add New Full Stack Project
        </button>
      </div>
    </div>
  );
};

export default FullstackCourse;