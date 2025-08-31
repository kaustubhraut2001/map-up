import React, { useState, useMemo } from "react";
import { ArrowUpDown, TrendingUp, Zap, DollarSign } from "lucide-react";

const TopModelsTable = ({ data }) => {
  const [sortConfig, setSortConfig] = useState({
    key: "count",
    direction: "desc",
  });

  const topModels = useMemo(() => {
    if (!data.length) return [];

    // Group by make and model, calculate aggregated metrics
    const modelGroups = data.reduce((acc, item) => {
      const key = `${item.Make}-${item.Model}`;
      if (!acc[key]) {
        acc[key] = {
          make: item.Make,
          model: item.Model,
          count: 0,
          avgRange: 0,
          avgPrice: 0,
          totalRange: 0,
          totalPrice: 0,
          evType: item["Electric Vehicle Type"],
        };
      }

      acc[key].count += 1;
      acc[key].totalRange += item["Electric Range"] || 0;
      acc[key].totalPrice += item["Base MSRP"] || 0;

      return acc;
    }, {});

    // Calculate averages and convert to array
    const modelsArray = Object.values(modelGroups).map((model) => ({
      ...model,
      avgRange: Math.round(model.totalRange / model.count),
      avgPrice: Math.round(model.totalPrice / model.count),
    }));

    // Sort by the current sort configuration
    return modelsArray
      .sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === "make" || sortConfig.key === "model") {
          aValue = aValue?.toLowerCase() || "";
          bValue = bValue?.toLowerCase() || "";
        }

        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      })
      .slice(0, 20); // Top 20 models
  }, [data, sortConfig]);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="w-4 h-4 text-gray-400" />;
    }
    return sortConfig.direction === "asc" ? (
      <ArrowUpDown className="w-4 h-4 text-blue-600 rotate-180" />
    ) : (
      <ArrowUpDown className="w-4 h-4 text-blue-600" />
    );
  };

  if (!data.length) {
    return (
      <div className="text-center py-8 text-gray-500">
        No data available to display
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              <button
                onClick={() => handleSort("make")}
                className="flex items-center space-x-1 transition-colors sort-button"
              >
                <span>Make & Model</span>
                {getSortIcon("make")}
              </button>
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              <button
                onClick={() => handleSort("count")}
                className="flex items-center space-x-1 transition-colors sort-button"
              >
                <span>Count</span>
                {getSortIcon("count")}
              </button>
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              <button
                onClick={() => handleSort("avgRange")}
                className="flex items-center space-x-1 transition-colors sort-button"
              >
                <span>Avg Range</span>
                {getSortIcon("avgRange")}
              </button>
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              <button
                onClick={() => handleSort("avgPrice")}
                className="flex items-center space-x-1 transition-colors sort-button"
              >
                <span>Avg Price</span>
                {getSortIcon("avgPrice")}
              </button>
            </th>
            <th className="text-left py-3 px-4 font-semibold text-gray-700">
              EV Type
            </th>
          </tr>
        </thead>
        <tbody>
          {topModels.map((model, index) => (
            <tr
              key={`${model.make}-${model.model}`}
              className="border-b border-gray-100 transition-colors table-row"
            >
              <td className="py-4 px-4">
                <div>
                  <div className="font-medium text-gray-900">{model.make}</div>
                  <div className="text-sm text-gray-500">{model.model}</div>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-blue-700">
                      {model.count}
                    </span>
                  </div>
                  {index < 3 && (
                    <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold text-yellow-700">
                        {index + 1}
                      </span>
                    </div>
                  )}
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-gray-900">
                    {model.avgRange} mi
                  </span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="font-medium text-gray-900">
                    ${model.avgPrice.toLocaleString()}
                  </span>
                </div>
              </td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  {model.evType}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {topModels.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No models found matching the current filters
        </div>
      )}
    </div>
  );
};

export default TopModelsTable;
