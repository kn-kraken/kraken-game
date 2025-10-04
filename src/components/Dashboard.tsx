import React from "react";
import {
  usePlayerStats,
  useHealthStatus,
  useWealthStatus,
} from "../hooks/useGame";

export const Dashboard: React.FC = () => {
  const playerStats = usePlayerStats();
  const healthStatus = useHealthStatus();
  const wealthStatus = useWealthStatus();

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-8 rounded-2xl my-4 shadow-2xl">
      <h2 className="text-center mb-8 text-3xl font-bold drop-shadow-lg">
        Life Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Age Display */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
          <div className="text-sm opacity-80 mb-2 uppercase tracking-wide">
            Age
          </div>
          <div className="text-3xl font-bold mb-2 text-amber-300">
            {playerStats.age}
          </div>
          <div className="text-xs opacity-70">Turn {playerStats.age - 17}</div>
        </div>

        {/* Health Display */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
          <div className="text-sm opacity-80 mb-2 uppercase tracking-wide">
            Health
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${playerStats.health}%`,
                  backgroundColor: healthStatus.color,
                }}
              />
            </div>
            <div className="text-3xl font-bold">{playerStats.health}/100</div>
          </div>
          <div
            className="text-xs opacity-70"
            style={{ color: healthStatus.color }}
          >
            {healthStatus.label}
          </div>
        </div>

        {/* Money Display */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
          <div className="text-sm opacity-80 mb-2 uppercase tracking-wide">
            Current Money
          </div>
          <div className="text-3xl font-bold mb-2 text-emerald-400">
            ${playerStats.money.toLocaleString()}
          </div>
          <div className="text-xs opacity-70">Available funds</div>
        </div>

        {/* Savings Display */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
          <div className="text-sm opacity-80 mb-2 uppercase tracking-wide">
            Savings
          </div>
          <div className="text-3xl font-bold mb-2 text-blue-400">
            ${playerStats.savings.toLocaleString()}
          </div>
          <div className="text-xs opacity-70">Long-term security</div>
        </div>

        {/* Total Wealth Display */}
        <div className="bg-gradient-to-br from-yellow-400/20 to-orange-400/20 border border-yellow-400/30 backdrop-blur-sm rounded-xl p-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
          <div className="text-sm opacity-80 mb-2 uppercase tracking-wide">
            Total Wealth
          </div>
          <div className="text-3xl font-bold mb-2 text-pink-400">
            ${wealthStatus.totalWealth.toLocaleString()}
          </div>
          <div
            className="text-xs opacity-70"
            style={{ color: wealthStatus.color }}
          >
            {wealthStatus.label}
          </div>
        </div>

        {/* Life Progress */}
        <div className="md:col-span-2 lg:col-span-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 text-center transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl">
          <div className="text-sm opacity-80 mb-2 uppercase tracking-wide">
            Life Progress
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 transition-all duration-300 rounded-full"
                style={{
                  width: `${((playerStats.age - 18) / (65 - 18)) * 100}%`,
                }}
              />
            </div>
            <div className="text-xl font-semibold">
              {playerStats.age}/65 years
            </div>
          </div>
          <div className="text-xs opacity-70">
            {65 - playerStats.age} years until retirement
          </div>
        </div>
      </div>
    </div>
  );
};
