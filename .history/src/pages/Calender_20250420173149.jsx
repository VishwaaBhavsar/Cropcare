'use client';
import React, { useState, useEffect } from 'react';

const IndiaVegetableGrowingChart = () => {
  const [location, setLocation] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [vegetables, setVegetables] = useState([]);
  const [error, setError] = useState('');

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  
  // Season colors and names
  const seasonInfo = {
    "Dec": { season: "Winter", color: "bg-blue-100" },
    "Jan": { season: "Winter", color: "bg-blue-100" },
    "Feb": { season: "Winter", color: "bg-blue-100" },
    "Mar": { season: "Spring", color: "bg-green-100" },
    "Apr": { season: "Spring", color: "bg-green-100" },
    "May": { season: "Spring", color: "bg-green-100" },
    "Jun": { season: "Summer", color: "bg-yellow-100" },
    "Jul": { season: "Summer", color: "bg-yellow-100" },
    "Aug": { season: "Summer", color: "bg-yellow-100" },
    "Sep": { season: "Autumn", color: "bg-orange-100" },
    "Oct": { season: "Autumn", color: "bg-orange-100" },
    "Nov": { season: "Autumn", color: "bg-orange-100" },
  };

  // Get season color class
  const getSeasonColor = (month) => {
    return seasonInfo[month].color;
  };
  
  // Get season name
  const getSeasonName = (month) => {
    return seasonInfo[month].season;
  };

  // Get vegetable recommendations for the specified location
  // Replace the fetchRegionalVegetables function in your IndiaVegetableGrowingChart component
const fetchRegionalVegetables = async () => {
  if (!location) return;
  
  setIsLoading(true);
  setError('');
  
  try {
    // Call the new crops API route
    const response = await fetch('/api/cal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location,
      }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch recommendations');
    }
    
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error);
    }
    
    if (!data.vegetables || !Array.isArray(data.vegetables)) {
      throw new Error('Invalid data format');
    }
    
    // Set the vegetables data
    setVegetables(data.vegetables);
  } catch (err) {
    console.error('Error fetching vegetables:', err);
    setError('Failed to get regional crop information. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
  // Sample default vegetables to show before location is selected
  const defaultVegetables = [
    {
      name: "Tomatoes",
      icon: "🍅",
      plantMonths: ["Feb", "Mar", "Apr", "Aug", "Sep"],
      harvestMonths: ["Jun", "Jul", "Aug", "Sep", "Nov", "Dec"],
      note: "Search for your location to get region-specific recommendations."
    },
    {
      name: "Brinjal (Eggplant)",
      icon: "🍆",
      plantMonths: ["Jan", "Feb", "Jun", "Jul", "Oct", "Nov"],
      harvestMonths: ["Mar", "Apr", "Aug", "Sep", "Dec"],
      note: "Search for your location to get region-specific recommendations."
    },
    {
      name: "Okra (Bhindi)",
      icon: "🌿",
      plantMonths: ["Feb", "Mar", "Jun", "Jul"],
      harvestMonths: ["Apr", "May", "Aug", "Sep"],
      note: "Search for your location to get region-specific recommendations."
    }
  ];

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setLocation(searchInput);
    }
  };

  // Fetch recommendations when location changes
  useEffect(() => {
    if (location) {
      fetchRegionalVegetables();
    }
  }, [location]);

  // Determine which vegetables to display
  const displayVegetables = vegetables.length > 0 ? vegetables : defaultVegetables;

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl shadow-lg border border-green-200">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500 mb-2">
          Rhythms of Growth
        </h1>
        <h2 className="text-xl text-gray-600">Regional Vegetable Growing Guide for India</h2>
      </div>
      
      {/* Location search input */}
      <div className="mb-8">
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 0a4 4 0 0 0 0 8m0 0H2m6 0h10" />
                </svg>
              </div>
              <input 
                type="text" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full p-3 pl-10 text-sm text-gray-900 border border-green-300 rounded-lg bg-white/80 focus:ring-green-500 focus:border-green-500" 
                placeholder="Enter your location in India (e.g., Mumbai, Kerala, Punjab)" 
                required 
              />
            </div>
            <button 
              type="submit" 
              className="bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white font-medium rounded-lg text-sm px-5 py-3 focus:outline-none focus:ring-2 focus:ring-green-300"
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Get Local Crops'}
            </button>
          </div>
        </form>
      </div>

      {/* Location-specific header */}
      {location && (
        <div className="mb-6 text-center">
          <div className="inline-block bg-white/80 px-4 py-2 rounded-full shadow-sm border border-green-200">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 0v4m0-10V4m8 8h-4m-8 0H4" />
              </svg>
              <span className="font-medium text-gray-800">
                Regional Growing Guide for <span className="text-green-700">{location}</span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 text-red-700 bg-red-100 rounded-lg">
          <div className="flex items-start">
            <svg className="w-5 h-5 mr-2 mt-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      )}

      {/* Loading state */}
      {isLoading && (
        <div className="flex justify-center items-center mb-6 p-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}
      
      {/* Vegetable growing table */}
      <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="p-3 bg-gradient-to-r from-green-700 to-green-600 text-white text-left rounded-tl-lg sticky left-0 z-20 min-w-40">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🌱</span>
                  <span>Vegetable</span>
                </div>
              </th>
              {months.map((month, index) => (
                <th key={month} className={`p-3 text-center w-16 ${getSeasonColor(month)} border-b-2 border-green-300 ${index === months.length - 1 ? 'rounded-tr-lg' : ''}`}>
                  <div className="flex flex-col">
                    <span className="font-bold">{month}</span>
                    <span className="text-xs text-gray-600">{getSeasonName(month)}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayVegetables.map((veg, index) => (
              <tr key={index} className={`transition-all hover:shadow-md ${index % 2 === 0 ? 'bg-white/70' : 'bg-green-50/70'} backdrop-blur-sm`}>
                <td className="p-3 border-b border-green-200 sticky left-0 z-10 bg-inherit">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{veg.icon}</span>
                    <div>
                      <div className="font-medium">{veg.name}</div>
                      {veg.note && <div className="text-xs text-gray-600 mt-1">{veg.note}</div>}
                    </div>
                  </div>
                </td>
                {months.map((month) => {
                  const isPlanting = veg.plantMonths.includes(month);
                  const isHarvesting = veg.harvestMonths.includes(month);
                  
                  return (
                    <td key={month} className={`p-2 border-b border-green-200 text-center ${getSeasonColor(month)}/30`}>
                      <div className="flex flex-col items-center gap-1">
                        {isPlanting && (
                          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-full shadow-sm transform transition-transform hover:scale-110">
                            <span className="text-white text-sm">🌱</span>
                          </div>
                        )}
                        {isHarvesting && (
                          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-full shadow-sm transform transition-transform hover:scale-110">
                            <span className="text-white text-sm">🧺</span>
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr className="bg-gradient-to-r from-green-700 to-green-600 text-white rounded-b-lg">
              <td colSpan={13} className="p-1 rounded-b-lg"></td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-8">
        <div className="flex items-center gap-3 bg-white/70 p-3 px-5 rounded-full shadow-md">
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-2 rounded-full">
            <span className="text-white text-lg">🌱</span>
          </div>
          <span className="font-medium">Planting Time</span>
        </div>
        <div className="flex items-center gap-3 bg-white/70 p-3 px-5 rounded-full shadow-md">
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2 rounded-full">
            <span className="text-white text-lg">🧺</span>
          </div>
          <span className="font-medium">Harvesting Time</span>
        </div>
      </div>
      
      <div className="mt-8 flex justify-center">
        <div className="p-4 bg-amber-50/80 rounded-lg border border-amber-200 text-sm text-gray-700 max-w-2xl shadow-sm">
          <div className="flex items-start">
            <span className="text-amber-600 text-xl mr-3 mt-0.5">💡</span>
            <p>
              {location ? 
                `These vegetables are specifically recommended for ${location} based on local climate, soil conditions, and traditional farming practices. Growing times may vary slightly based on local weather patterns and microclimate conditions.` :
                `Enter your location to get personalized vegetable recommendations based on your region's climate, soil type, and optimal growing seasons. This will help you plan your garden more effectively.`
              }
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-xs text-gray-500">
        <p>Powered by AI and based on traditional farming knowledge of India</p>
      </div>
    </div>
  );
};

export default IndiaVegetableGrowingChart;