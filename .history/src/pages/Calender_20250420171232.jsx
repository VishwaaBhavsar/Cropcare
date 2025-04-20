import React from 'react';

const IndiaVegetableGrowingChart = () => {
 
  // Get season name
  const getSeasonName = (month) => {
    return seasonInfo[month].season;
  };

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 p-6 rounded-xl shadow-lg border border-green-200">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-emerald-500 mb-2">
          Rhythms of Growth
        </h1>
        <h2 className="text-xl text-gray-600">Vegetable Growing Calendar of India</h2>
      </div>
      
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
            {vegetables.map((veg, index) => (
              <tr key={index} className={`transition-all hover:shadow-md ${index % 2 === 0 ? 'bg-white/70' : 'bg-green-50/70'} backdrop-blur-sm`}>
                <td className="p-3 border-b border-green-200 sticky left-0 z-10 bg-inherit">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{veg.icon}</span>
                    <span className="font-medium">{veg.name}</span>
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
              Growing seasons may vary based on your local climate, soil conditions, and specific varieties. 
              This chart provides general guidance for the Indian subcontinent. Adjust your planting and 
              harvesting schedule based on your specific region (North, South, East, West, Central).
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 text-center text-xs text-gray-500">
        <p>Based on traditional farming knowledge and agricultural practices of India</p>
      </div>
    </div>
  );
};

export default IndiaVegetableGrowingChart;