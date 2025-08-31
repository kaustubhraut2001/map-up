import React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";

const StatCard = ({ title, value, icon, trend, trendUp, color }) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    green: "from-green-500 to-green-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
    red: "from-red-500 to-red-600",
    indigo: "from-indigo-500 to-indigo-600",
  };

  const bgColorClasses = {
    blue: "bg-blue-50",
    green: "bg-green-50",
    purple: "bg-purple-50",
    orange: "bg-orange-50",
    red: "bg-red-50",
    indigo: "bg-indigo-50",
  };

  // Ensure value is properly formatted
  const formatValue = (val) => {
    if (val === null || val === undefined) return "0";
    if (typeof val === "number") {
      if (val >= 1000000) return (val / 1000000).toFixed(1) + "M";
      if (val >= 1000) return val.toLocaleString();
      return val.toString();
    }
    return val.toString();
  };

  return (
    <div
      className={`${bgColorClasses[color]} rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 stat-card`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl">{icon}</span>
            <div
              className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorClasses[color]}`}
            ></div>
          </div>
          <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
          <p className="text-2xl font-bold text-gray-900">
            {formatValue(value)}
          </p>
        </div>

        {trend && (
          <div
            className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
              trendUp
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {trendUp ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            <span className="text-xs font-medium">{trend}</span>
          </div>
        )}
      </div>

      {/* Decorative gradient line */}
      <div
        className={`mt-4 h-1 bg-gradient-to-r ${colorClasses[color]} rounded-full opacity-20`}
      ></div>
    </div>
  );
};

export default StatCard;
