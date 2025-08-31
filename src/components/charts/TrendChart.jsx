import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const TrendChart = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data.length) return [];

    // Group by year and calculate average electric range
    const yearData = data.reduce((acc, item) => {
      const year = item["Model Year"];
      const range = item["Electric Range"];

      if (year && range && range > 0) {
        if (!acc[year]) {
          acc[year] = { year, totalRange: 0, count: 0, vehicles: [] };
        }
        acc[year].totalRange += range;
        acc[year].count += 1;
        acc[year].vehicles.push(range);
      }
      return acc;
    }, {});

    // Convert to array, calculate averages, and sort by year
    return Object.values(yearData)
      .map((item) => ({
        year: item.year,
        avgRange: Math.round(item.totalRange / item.count),
        count: item.count,
        minRange: Math.min(...item.vehicles),
        maxRange: Math.max(...item.vehicles),
      }))
      .sort((a, b) => a.year - b.year);
  }, [data]);

  if (!chartData.length) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-2">📈</div>
          <p>No data available for chart</p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">Year: {label}</p>
          <p className="text-blue-600">
            Avg Range: <span className="font-bold">{data.avgRange} mi</span>
          </p>
          <p className="text-gray-600">
            Vehicles:{" "}
            <span className="font-bold">{data.count.toLocaleString()}</span>
          </p>
          <p className="text-gray-500">
            Range: {data.minRange} - {data.maxRange} mi
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 60, bottom: 40 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 11, fill: "#374151" }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Model Year",
              position: "insideBottom",
              offset: -10,
              style: {
                textAnchor: "middle",
                fontSize: 12,
                fontWeight: 500,
                fill: "#374151",
              },
            }}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#374151" }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Average Electric Range (miles)",
              angle: -90,
              position: "insideLeft",
              style: {
                textAnchor: "middle",
                fontSize: 12,
                fontWeight: 500,
                fill: "#374151",
              },
              offset: 0,
            }}
          />
          <Tooltip content={<CustomTooltip />} />

          {/* Area fill for better visualization */}
          <Area
            type="monotone"
            dataKey="avgRange"
            stroke="#3B82F6"
            strokeWidth={3}
            fill="url(#colorGradient)"
            fillOpacity={0.3}
          />

          {/* Line for better data point visibility */}
          <Line
            type="monotone"
            dataKey="avgRange"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Chart Legend */}
      <div className="mt-6 text-center">
        <p className="text-sm font-medium text-gray-700 mb-2">
          Electric range trends from {chartData[0]?.year} to{" "}
          {chartData[chartData.length - 1]?.year}
        </p>
        <div className="flex items-center justify-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full opacity-30"></div>
            <span className="text-xs text-gray-500">Area Fill</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs text-gray-500">Average Range</span>
          </div>
        </div>
      </div>

      {/* SVG Definitions for gradient */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1} />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

export default TrendChart;
