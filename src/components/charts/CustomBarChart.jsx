import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data.length) return [];

    // Group by make and count vehicles
    const makeCounts = data.reduce((acc, item) => {
      const make = item.Make;
      if (make && make.trim()) {
        const cleanMake = make.trim();
        acc[cleanMake] = (acc[cleanMake] || 0) + 1;
      }
      return acc;
    }, {});

    // Convert to array and sort by count, take top 10
    return Object.entries(makeCounts)
      .map(([make, count]) => ({ make, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [data]);

  const colors = [
    "#3B82F6",
    "#10B981",
    "#8B5CF6",
    "#F59E0B",
    "#EF4444",
    "#06B6D4",
    "#84CC16",
    "#F97316",
    "#EC4899",
    "#6366F1",
  ];

  if (!chartData.length) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p>No data available for chart</p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-blue-600">
            Vehicles:{" "}
            <span className="font-bold">
              {payload[0].value.toLocaleString()}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 60, bottom: 80 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="make"
            angle={-45}
            textAnchor="end"
            height={80}
            tick={{ fontSize: 11, fill: "#374151" }}
            interval={0}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#374151" }}
            axisLine={false}
            tickLine={false}
            label={{
              value: "Number of Vehicles",
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
          <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={40}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Chart Legend */}
      <div className="mt-6 text-center">
        <p className="text-sm font-medium text-gray-700 mb-1">
          Top {chartData.length} vehicle makes by population count
        </p>
        <p className="text-xs text-gray-500">
          Total vehicles shown:{" "}
          <span className="font-medium">
            {chartData
              .reduce((sum, item) => sum + item.count, 0)
              .toLocaleString()}
          </span>
        </p>
      </div>
    </div>
  );
};

export default CustomBarChart;
