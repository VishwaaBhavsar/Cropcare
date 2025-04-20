'use client'
import React, { useState } from 'react';
const Cure = () => {
  const [preview, setPreview] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  
  // Common plant diseases with descriptions and treatments
  const plantDiseases = [
    {
      name: "Leaf Spot",
      description: "Brown or black spots on leaves that may have yellow halos.",
      treatment: "Remove infected leaves, avoid overhead watering, apply fungicide if severe.",
      crops: ["Tomato", "Chilli", "Eggplant", "Cucumber"]
    },
    {
      name: "Powdery Mildew",
      description: "White powdery substance on leaves, stems, and sometimes fruit.",
      treatment: "Improve air circulation, apply neem oil or sulfur-based fungicide.",
      crops: ["Okra", "Pumpkin", "Bitter Gourd", "Peas"]
    },
    {
      name: "Early Blight",
      description: "Dark brown spots with concentric rings on lower leaves.",
      treatment: "Remove infected leaves, mulch around plants, apply copper-based fungicide.",
      crops: ["Tomato", "Potato"]
    }
  ];

  // Sample diagnosis function
  const analyzePlant = () => {
    setAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * plantDiseases.length);
      const diagnosis = plantDiseases[randomIndex];
      
      setResult(diagnosis);
      setAnalyzing(false);
    }, 2000);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setResult(null);
      // For demo, just use placeholder
      setPreview("/api/placeholder/400/320");
    }
  };

  const resetForm = () => {
    setPreview(null);
    setResult(null);
  };

  return (
    <div className="bg-green-100 p-4 rounded-lg">
      <h1 className="text-2xl font-bold text-green-800 mb-2">Plant-Cure</h1>
      <p className="text-gray-700 mb-4">Identify plant diseases with photo analysis. Get diagnosis and treatment recommendations.</p>
      
      <div className="bg-white p-4 rounded-lg">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-green-700 mb-2">Upload a photo of your plant</h2>
          <div className="flex flex-col items-center border-2 border-dashed border-gray-300 rounded-lg p-4 bg-gray-50">
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageChange}
              className="hidden" 
              id="plant-image" 
            />
            {!preview ? (
              <label 
                htmlFor="plant-image"
                className="cursor-pointer text-center"
              >
                <span className="text-5xl mb-2">📷</span>
                <p className="text-gray-500 font-medium">Click to upload plant image</p>
                <p className="text-gray-400 text-sm">JPG, PNG files accepted</p>
              </label>
            ) : (
              <div className="w-full">
                <img 
                  src={preview} 
                  alt="Plant preview" 
                  className="rounded-lg w-full object-cover mx-auto"
                />
                <button
                  onClick={resetForm}
                  className="mt-2 bg-red-100 text-red-700 px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>
        
        {preview && !analyzing && !result && (
          <div className="text-center">
            <button
              onClick={analyzePlant}
              className="bg-green-600 text-white font-medium py-2 px-4 rounded"
            >
              Analyze Plant
            </button>
          </div>
        )}
        
        {analyzing && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-green-500 border-t-transparent"></div>
            <p className="mt-2 text-gray-600">Analyzing your plant...</p>
          </div>
        )}
        
        {result && (
          <div className="mt-4 bg-green-50 p-4 rounded-lg">
            <h3 className="text-xl font-bold text-red-600 mb-2">
              Diagnosis: {result.name}
            </h3>
            
            <div className="mb-2">
              <p className="font-semibold text-gray-700">Symptoms:</p>
              <p className="text-gray-600">{result.description}</p>
            </div>
            
            <div className="mb-2">
              <p className="font-semibold text-gray-700">Common in:</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {result.crops.map((crop, index) => (
                  <span key={index} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                    {crop}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <p className="font-semibold text-gray-700">Recommended Treatment:</p>
              <p className="text-gray-600">{result.treatment}</p>
            </div>
            
            <div className="mt-4 pt-2 border-t border-green-200">
              <button
                onClick={resetForm}
                className="bg-green-600 text-white font-medium py-2 px-4 rounded"
              >
                Analyze Another Plant
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 text-sm text-gray-500">
        <p>
          <span className="text-amber-600 mr-1">ⓘ</span>
          <span>For accurate diagnosis, take clear, well-lit photos of affected plant parts.</span>
        </p>
      </div>
    </div>
  );
};

export default Cure;