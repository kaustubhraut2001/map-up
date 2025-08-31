import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import StatCard from "./StatCard";
import FilterPanel from "./FilterPanel";
import TopModelsTable from "./TopModelsTable";
import CustomBarChart from "../charts/CustomBarChart";
import CustomPieChart from "../charts/CustomPieChart";
import TrendChart from "../charts/TrendChart";
import useEVData from "../../hooks/useEVData";

const Dashboard = () => {
  const { data, loading, error, dataSource } = useEVData();
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    make: "",
    year: "",
    evType: "",
    state: "",
    range: "",
  });

  useEffect(() => {
    if (data.length > 0) {
      applyFilters(data, filters);
    }
  }, [data, filters]);

  const applyFilters = (dataToFilter, currentFilters) => {
    let filtered = [...dataToFilter];

    if (currentFilters.make) {
      filtered = filtered.filter((item) =>
        item.Make?.toLowerCase().includes(currentFilters.make.toLowerCase())
      );
    }

    if (currentFilters.year) {
      filtered = filtered.filter(
        (item) => item["Model Year"] === parseInt(currentFilters.year)
      );
    }

    if (currentFilters.evType) {
      filtered = filtered.filter(
        (item) => item["Electric Vehicle Type"] === currentFilters.evType
      );
    }

    if (currentFilters.state) {
      filtered = filtered.filter((item) => item.State === currentFilters.state);
    }

    if (currentFilters.range) {
      const [min, max] = currentFilters.range.split("-").map(Number);
      filtered = filtered.filter(
        (item) => item["Electric Range"] >= min && item["Electric Range"] <= max
      );
    }

    setFilteredData(filtered);
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      make: "",
      year: "",
      evType: "",
      state: "",
      range: "",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading EV Data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Error Loading Data
          </h2>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Calculate key metrics
  const totalVehicles = filteredData.length;
  const uniqueMakes = new Set(filteredData.map((item) => item.Make)).size;
  const uniqueStates = new Set(filteredData.map((item) => item.State)).size;
  const avgRange =
    filteredData.length > 0
      ? Math.round(
          filteredData.reduce(
            (sum, item) => sum + (item["Electric Range"] || 0),
            0
          ) / filteredData.length
        )
      : 0;
  const avgPrice =
    filteredData.length > 0
      ? Math.round(
          filteredData.reduce(
            (sum, item) => sum + (item["Base MSRP"] || 0),
            0
          ) / filteredData.length
        )
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <Header />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Electric Vehicle Analytics Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive insights into the electric vehicle population data
          </p>
          {dataSource === "csv" && data.length > 0 && (
            <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              <span className="mr-2">✅</span>
              Loaded {data.length.toLocaleString()} EV records from CSV data
            </div>
          )}
        </div>

        {/* Filter Panel */}
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
          data={data}
        />

        {/* Key Metrics */}
        <div
          id="dashboard"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
        >
          <StatCard
            title="Total Vehicles"
            value={totalVehicles.toLocaleString()}
            icon="🚗"
            trend="+12%"
            trendUp={true}
            color="blue"
          />
          <StatCard
            title="Unique Makes"
            value={uniqueMakes}
            icon="🏭"
            trend="+5%"
            trendUp={true}
            color="green"
          />
          <StatCard
            title="States Covered"
            value={uniqueStates}
            icon="🗺️"
            trend="+2%"
            trendUp={true}
            color="indigo"
          />
          <StatCard
            title="Avg Range (mi)"
            value={avgRange}
            icon="🔋"
            trend="+8%"
            trendUp={true}
            color="purple"
          />
          <StatCard
            title="Avg Price ($)"
            value={`$${avgPrice.toLocaleString()}`}
            icon="💰"
            trend="-3%"
            trendUp={false}
            color="orange"
          />
        </div>

        {/* Charts Section */}
        <div id="analytics" className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              Vehicle Distribution by Make
            </h3>
            <CustomBarChart data={filteredData} />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              EV Type Distribution
            </h3>
            <CustomPieChart data={filteredData} />
          </div>
        </div>

        {/* Trend Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Electric Range Trends Over Years
          </h3>
          <TrendChart data={filteredData} />
        </div>

        {/* Top Models Table */}
        <div
          id="insights"
          className="bg-white rounded-xl shadow-lg p-6 border border-gray-100"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Top Electric Vehicle Models
          </h3>
          <TopModelsTable data={filteredData} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
