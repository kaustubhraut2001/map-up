import React from "react";
import { Filter, X, Search } from "lucide-react";

const FilterPanel = ({ filters, onFilterChange, onClearFilters, data }) => {
  // Extract unique values for filter options
  const uniqueMakes = [
    ...new Set(data.map((item) => item.Make).filter(Boolean)),
  ].sort();
  const uniqueYears = [
    ...new Set(data.map((item) => item["Model Year"]).filter(Boolean)),
  ].sort((a, b) => b - a);
  const uniqueEVTypes = [
    ...new Set(
      data.map((item) => item["Electric Vehicle Type"]).filter(Boolean)
    ),
  ].sort();
  const uniqueStates = [
    ...new Set(data.map((item) => item.State).filter(Boolean)),
  ].sort();
  const uniqueCounties = [
    ...new Set(data.map((item) => item.County).filter(Boolean)),
  ].sort();

  const rangeOptions = [
    { label: "0-100 miles", value: "0-100" },
    { label: "101-200 miles", value: "101-200" },
    { label: "201-300 miles", value: "201-300" },
    { label: "301+ miles", value: "301-500" },
  ];

  const hasActiveFilters = Object.values(filters).some((value) => value !== "");

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
          {hasActiveFilters && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
              {Object.values(filters).filter((v) => v !== "").length} active
            </span>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-sm text-gray-500 transition-colors filter-button"
          >
            <X className="w-4 h-4" />
            <span>Clear all</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {/* Make Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Make
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search makes..."
              value={filters.make}
              onChange={(e) => onFilterChange({ make: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            />
          </div>
          {filters.make && (
            <div className="mt-2 text-xs text-gray-500">
              {
                uniqueMakes.filter((make) =>
                  make.toLowerCase().includes(filters.make.toLowerCase())
                ).length
              }{" "}
              matches
            </div>
          )}
        </div>

        {/* Year Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model Year
          </label>
          <select
            value={filters.year}
            onChange={(e) => onFilterChange({ year: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">All Years</option>
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* EV Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            EV Type
          </label>
          <select
            value={filters.evType}
            onChange={(e) => onFilterChange({ evType: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">All Types</option>
            {uniqueEVTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* State Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            State
          </label>
          <select
            value={filters.state}
            onChange={(e) => onFilterChange({ state: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">All States</option>
            {uniqueStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/* Range Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Electric Range
          </label>
          <select
            value={filters.range}
            onChange={(e) => onFilterChange({ range: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            <option value="">All Ranges</option>
            {rangeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(([key, value]) => {
              if (!value) return null;

              let displayValue = value;
              if (key === "range") {
                const rangeOption = rangeOptions.find(
                  (opt) => opt.value === value
                );
                displayValue = rangeOption ? rangeOption.label : value;
              }

              return (
                <div
                  key={key}
                  className="flex items-center space-x-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                >
                  <span className="font-medium">
                    {key === "make"
                      ? "Make"
                      : key === "year"
                      ? "Year"
                      : key === "evType"
                      ? "Type"
                      : key === "state"
                      ? "State"
                      : key === "range"
                      ? "Range"
                      : key}
                  </span>
                  <span>{displayValue}</span>
                  <button
                    onClick={() => onFilterChange({ [key]: "" })}
                    className="transition-colors filter-remove"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
