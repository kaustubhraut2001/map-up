import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const CustomPieChart = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data.length) return [];

    // Group by EV type and count vehicles
    const typeCounts = data.reduce((acc, item) => {
      const evType = item["Electric Vehicle Type"];
      if (evType && evType.trim()) {
        const cleanType = evType.trim();
        acc[cleanType] = (acc[cleanType] || 0) + 1;
      }
      return acc;
    }, {});

    // Convert to array and sort by count
    return Object.entries(typeCounts)
      .map(([type, count]) => ({
        name: type,
        value: count,
        percentage: ((count / data.length) * 100).toFixed(1),
      }))
      .sort((a, b) => b.value - a.value);
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
          <div className="text-4xl mb-2">🥧</div>
          <p>No data available for chart</p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-blue-600">
            Count:{" "}
            <span className="font-bold">{data.value.toLocaleString()}</span>
          </p>
          <p className="text-gray-600">
            Percentage: <span className="font-bold">{data.percentage}%</span>
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="flex flex-col items-center gap-3 mt-6">
        {payload.map((entry, index) => (
          <div key={entry.value} className="flex items-center space-x-3">
            <div
              className="w-4 h-4 rounded-full shadow-sm"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm font-medium text-gray-700">
              {entry.value}
            </span>
            <span className="text-sm text-gray-500">
              ({chartData[index]?.percentage}%)
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            paddingAngle={2}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Custom Legend */}
      <CustomLegend
        payload={chartData.map((entry, index) => ({
          value: entry.name,
          color: colors[index % colors.length],
        }))}
      />
    </div>
  );
};

export default CustomPieChart;
