import CodeMirror from "@uiw/react-codemirror";
import React, { useEffect, useState } from "react";
import { python } from "@codemirror/lang-python";
import { FaBrain, FaPlay, FaSave, FaTrash } from "react-icons/fa";

const AICourse = () => {
  const [programs, setPrograms] = useState(() => {
    const saved = localStorage.getItem('aiPrograms');
    return saved ? JSON.parse(saved) : [
      { 
        id: 1, 
        code: `# Basic Machine Learning Example
import numpy as np
from sklearn.linear_model import LinearRegression

# Generate sample data
X = np.array([[1], [2], [3], [4], [5]])
y = np.array([2, 4, 6, 8, 10])

# Create and train the model
model = LinearRegression()
model.fit(X, y)

# Make predictions
new_X = np.array([[6]])
prediction = model.predict(new_X)
print(f"Prediction for X=6: {prediction[0]}")`, 
        output: '', 
        name: 'Linear Regression Example' 
      }
    ];
  });

  const [selectedTopic, setSelectedTopic] = useState('basics');

  const topics = {
    basics: {
      title: "AI & ML Fundamentals",
      content: [
        "Introduction to Machine Learning",
        "NumPy and Pandas Basics",
        "Data Preprocessing",
        "Linear Regression",
        "Classification Basics"
      ],
      examples: {
        "Data Preprocessing": `import pandas as pd
import numpy as np

# Create sample data
data = pd.DataFrame({
    'age': [25, 30, 35, 40, 45],
    'salary': [30000, 45000, 50000, 60000, 70000],
    'experience': [1, 3, 5, 7, 9]
})

# Normalize the data
normalized_data = (data - data.mean()) / data.std()
print("Normalized Data:\\n", normalized_data)`,
        "Simple Classification": `from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split

# Generate synthetic data
X, y = make_classification(n_samples=100, n_features=2)

# Split the data
X_train, X_test, y_train, y_test = train_test_split(X, y)
print("Training set shape:", X_train.shape)`
      }
    },
    intermediate: {
      title: "Advanced ML Concepts",
      content: [
        "Neural Networks Basics",
        "Deep Learning with TensorFlow",
        "Computer Vision Basics",
        "Natural Language Processing",
        "Model Evaluation & Validation"
      ],
      examples: {
        "Neural Network": `import tensorflow as tf

model = tf.keras.Sequential([
    tf.keras.layers.Dense(64, activation='relu'),
    tf.keras.layers.Dense(32, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

model.compile(optimizer='adam',
              loss='binary_crossentropy',
              metrics=['accuracy'])`,
        "NLP Processing": `from transformers import pipeline

# Create a sentiment analysis pipeline
classifier = pipeline('sentiment-analysis')

# Analyze text
text = "I love learning about artificial intelligence!"
result = classifier(text)
print(f"Sentiment: {result[0]['label']}")`,
      }
    },
    advanced: {
      title: "Advanced AI Topics",
      content: [
        "Reinforcement Learning",
        "GANs (Generative Models)",
        "Transfer Learning",
        "AutoML",
        "AI Ethics & Bias"
      ],
      examples: {
        "Transfer Learning": `from tensorflow.keras.applications import VGG16
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D

base_model = VGG16(weights='imagenet', include_top=False)
x = base_model.output
x = GlobalAveragePooling2D()(x)
predictions = Dense(1000, activation='softmax')(x)`,
        "GAN Example": `import tensorflow as tf

def make_generator():
    return tf.keras.Sequential([
        tf.keras.layers.Dense(7*7*256, use_bias=False),
        tf.keras.layers.BatchNormalization(),
        tf.keras.layers.LeakyReLU(),
        tf.keras.layers.Reshape((7, 7, 256))
    ])`
      }
    }
  };
  const COURSE_PDF_URL='https://drive.google.com/file/d/1q2RQrbvRqAmvT5BCcOX5rNNXxDWeoVbF/view?usp=sharing'

  useEffect(() => {
    localStorage.setItem('aiPrograms', JSON.stringify(programs));
  }, [programs]);

  const handleCodeChange = (id, newCode) => {
    setPrograms(programs.map(prog => 
      prog.id === id ? { ...prog, code: newCode } : prog
    ));
  };

  const runCode = (id) => {
    const program = programs.find(p => p.id === id);
    try {
      // Simulate AI/ML code execution
      let output = [];
      
      if (program.code.includes('sklearn')) {
        output.push("Scikit-learn model training simulation:");
        output.push("Loading data...");
        output.push("Training model...");
        output.push("Model trained successfully!");
        
        if (program.code.includes('predict')) {
          output.push("Making predictions...");
          output.push("Prediction results: [0.95, 0.82, 0.77]");
        }
      }

      if (program.code.includes('tensorflow') || program.code.includes('keras')) {
        output.push("TensorFlow/Keras model simulation:");
        output.push("Building neural network...");
        output.push("Model architecture created");
        output.push("Epochs: 1/10");
        output.push("loss: 0.3524 - accuracy: 0.8945");
      }

      if (program.code.includes('transformers')) {
        output.push("Hugging Face Transformers simulation:");
        output.push("Loading pre-trained model...");
        output.push("Processing text...");
        output.push("Sentiment: POSITIVE (confidence: 0.9865)");
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
      code: '# Write your AI/ML code here\n', 
      output: '', 
      name: `AI Program ${newId}` 
    }]);
  };

  const removeProgram = (id) => {
    setPrograms(programs.filter(prog => prog.id !== id));
  };

  const saveProgram = (id) => {
    localStorage.setItem(`ai_program_${id}`, JSON.stringify(programs.find(p => p.id === id)));
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
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-bold">AI & ML Course</h1>
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
                  ? 'bg-indigo-500 text-white' 
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
                  className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-lg hover:bg-indigo-200"
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
                  className="bg-indigo-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-600"
                >
                  <FaPlay /> Run Model
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
                <h4 className="font-semibold mb-2">Model Output:</h4>
                <pre className="whitespace-pre-wrap font-mono bg-gray-800 text-white p-4 rounded-lg">
                  {program.output}
                </pre>
              </div>
            )}
          </div>
        ))}

        <button
          onClick={addProgram}
          className="bg-indigo-500 text-white px-6 py-3 rounded-lg hover:bg-indigo-600"
        >
          Add New AI Program
        </button>
      </div>
    </div>
  );
};

export default AICourse;