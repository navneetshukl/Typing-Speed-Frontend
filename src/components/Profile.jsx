import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const apiUrl = import.meta.env.VITE_API_BASE_URL;
import {
  formatDate,
  calculateAccuracy,
  calculateCompletion,
} from "../helpers/helper";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export default function Profile() {
  const [selectedPeriod, setSelectedPeriod] = useState("1month");
  const [selectedMetrics, setSelectedMetrics] = useState(["wpm", "accuracy"]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [testHistory, setTestHistory] = useState([]);

  const fetchRecentTest = async () => {
    const url = `${apiUrl}/dashboard/recentTest`;

    try {
      const response = await axios.get(url, {
        withCredentials: true,
      });

      setTestHistory(response.data.data);
    } catch (error) {
      console.error(
        "GetRecentTest error:",
        error.response?.data || error.message
      );
      alert(error.response?.data?.message || "Recent test failed");
    }
  };

  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      toast.error("User not authorised", { toastId: "unauthorized" });
      navigate("/login", { replace: true });
    }
    fetchRecentTest();
  }, []);

  //   useEffect(() => {
  //   console.log("testHistory updated:", testHistory);
  // }, [testHistory]);

  const user = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=JohnDoe",
    speed: 92,
    accuracy: 96,
    testsTaken: 128,
    bestSpeed: 118,
    joinDate: "March 2023",
    improvement: "+12%",
  };

  // Data for different time periods
  const chartData = {
    "1month": [
      { date: "Oct 29", wpm: 75, accuracy: 89, mistakes: 6, consistency: 78 },
      { date: "Oct 30", wpm: 82, accuracy: 92, mistakes: 4, consistency: 85 },
      { date: "Oct 31", wpm: 88, accuracy: 94, mistakes: 3, consistency: 90 },
      { date: "Nov 1", wpm: 90, accuracy: 95, mistakes: 2, consistency: 92 },
      { date: "Nov 2", wpm: 85, accuracy: 91, mistakes: 4, consistency: 88 },
      { date: "Nov 3", wpm: 92, accuracy: 96, mistakes: 2, consistency: 95 },
      { date: "Nov 4", wpm: 96, accuracy: 97, mistakes: 1, consistency: 98 },
    ],
    "6months": [
      { date: "May 1", wpm: 65, accuracy: 82, mistakes: 8, consistency: 70 },
      { date: "Jun 1", wpm: 72, accuracy: 85, mistakes: 7, consistency: 75 },
      { date: "Jul 1", wpm: 78, accuracy: 88, mistakes: 5, consistency: 82 },
      { date: "Aug 1", wpm: 82, accuracy: 90, mistakes: 4, consistency: 86 },
      { date: "Sep 1", wpm: 87, accuracy: 93, mistakes: 3, consistency: 91 },
      { date: "Oct 1", wpm: 92, accuracy: 95, mistakes: 2, consistency: 94 },
      { date: "Nov 4", wpm: 96, accuracy: 97, mistakes: 1, consistency: 98 },
    ],
    "1year": [
      { date: "Nov 23", wpm: 45, accuracy: 75, mistakes: 12, consistency: 60 },
      { date: "Feb 24", wpm: 55, accuracy: 80, mistakes: 10, consistency: 68 },
      { date: "May 24", wpm: 68, accuracy: 85, mistakes: 7, consistency: 78 },
      { date: "Aug 24", wpm: 80, accuracy: 90, mistakes: 5, consistency: 87 },
      { date: "Oct 24", wpm: 90, accuracy: 95, mistakes: 2, consistency: 94 },
      { date: "Nov 24", wpm: 96, accuracy: 97, mistakes: 1, consistency: 98 },
    ],
  };

  const topPerformers = [
    { name: "Alice", score: 145 },
    { name: "Bob", score: 138 },
    { name: "John Doe", score: 132 },
    { name: "Sarah", score: 128 },
    { name: "Michael", score: 125 },
    { name: "Ravi", score: 122 },
    { name: "Linda", score: 119 },
    { name: "James", score: 116 },
  ];

  const StatCard = ({ icon, label, value, sublabel, color, trend }) => (
    <div
      className={`relative overflow-hidden rounded-2xl p-6 text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 group ${color}`}
    >
      <div className="absolute -right-8 -top-8 text-6xl opacity-15 group-hover:opacity-25 transition-opacity font-bold">
        {icon}
      </div>
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">{icon}</span>
          <p className="text-sm font-medium opacity-90">{label}</p>
        </div>
        <h3 className="text-4xl font-bold mb-1">{value}</h3>
        {sublabel && <p className="text-xs opacity-80">{sublabel}</p>}
        {trend && (
          <p className="text-xs font-semibold mt-2 text-green-300">
            ↑ {trend} this month
          </p>
        )}
      </div>
    </div>
  );

  const toggleMetric = (metric) => {
    setSelectedMetrics((prev) =>
      prev.includes(metric)
        ? prev.filter((m) => m !== metric)
        : [...prev, metric]
    );
  };

  const currentData = chartData[selectedPeriod];

  const metricConfig = {
    wpm: { stroke: "#7C3AED", name: "WPM", color: "purple" },
    accuracy: { stroke: "#10B981", name: "Accuracy %", color: "green" },
    mistakes: { stroke: "#EF4444", name: "Mistakes", color: "red" },
    consistency: { stroke: "#F59E0B", name: "Consistency %", color: "amber" },
  };

  const handleTableScroll = (e) => {
    setScrollPosition(e.target.scrollLeft);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/30 border-b border-purple-500/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-lg opacity-75 animate-pulse"></div>
                <img
                  src={user.avatar}
                  alt="Profile"
                  className="relative w-16 h-16 rounded-full border-3 border-purple-400 shadow-xl"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
                  {user.name}
                </h1>
                <p className="flex items-center gap-1 text-gray-400 text-xs sm:text-sm mt-2">
                  ✉️ {user.email}
                </p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xs text-gray-500">Since {user.joinDate}</p>
              <p className="text-base sm:text-lg font-semibold text-green-400">
                {user.testsTaken} tests ✓
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon="⚡"
            label="Current Speed"
            value={`${user.speed}`}
            sublabel="WPM"
            color="bg-gradient-to-br from-blue-600 to-blue-800"
            trend={user.improvement}
          />
          <StatCard
            icon="🎯"
            label="Accuracy"
            value={`${user.accuracy}%`}
            sublabel="Precision typing"
            color="bg-gradient-to-br from-green-600 to-emerald-800"
          />
          <StatCard
            icon="🏆"
            label="Best Speed"
            value={`${user.bestSpeed}`}
            sublabel="Personal record"
            color="bg-gradient-to-br from-purple-600 to-purple-800"
          />
          <StatCard
            icon="📈"
            label="Consistency"
            value="94%"
            sublabel="Avg performance"
            color="bg-gradient-to-br from-orange-600 to-red-800"
          />
        </div>

        {/* Test History - NOW ON TOP */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-purple-500/20 shadow-2xl overflow-hidden">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-2xl">⏱️</span>
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Recent Tests
            </h2>
            <span className="ml-auto text-xs text-gray-400">
              ({testHistory.length} tests)
            </span>
          </div>

          {/* Scrollable Table Container */}
          <div className="relative">
            <div
              className="overflow-x-auto rounded-xl"
              onScroll={handleTableScroll}
            >
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-purple-500/30 sticky top-0 bg-white/5">
                    <th className="text-left py-4 px-4 font-bold text-purple-300 text-xs sm:text-sm whitespace-nowrap">
                      Date
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-purple-300 text-xs sm:text-sm whitespace-nowrap">
                      Speed
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-purple-300 text-xs sm:text-sm whitespace-nowrap">
                      Accuracy
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-purple-300 text-xs sm:text-sm whitespace-nowrap">
                      Duration
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-purple-300 text-xs sm:text-sm whitespace-nowrap">
                      Errors
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-purple-300 text-xs sm:text-sm whitespace-nowrap">
                      Completion
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {testHistory.map((test, index) => (
                    <tr
                      key={index}
                      className="border-b border-purple-500/10 hover:bg-white/5 transition-colors duration-150"
                    >
                      <td className="py-4 px-4 text-gray-300 text-xs sm:text-sm font-medium whitespace-nowrap">
                        {formatDate(test.createdAt)}
                      </td>
                      <td className="py-4 px-4 font-bold text-blue-400 text-xs sm:text-sm whitespace-nowrap">
                        {test.wpm} WPM
                      </td>
                      <td className="py-4 px-4 font-bold text-green-400 text-xs sm:text-sm whitespace-nowrap">
                        {/* {test.typedWords}% */}
                        {calculateAccuracy(test.typedWords, test.totalErrors)}%
                      </td>
                      <td className="py-4 px-4 text-gray-400 text-xs sm:text-sm whitespace-nowrap">
                        {test.timeTakenByUser} sec
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <span
                          className={`inline-block px-3 py-1.5 rounded-full text-xs font-bold ${
                            test.totalErrors <= 2
                              ? "bg-green-600/40 text-green-300 border border-green-500/30"
                              : test.totalErrors <= 4
                              ? "bg-yellow-600/40 text-yellow-300 border border-yellow-500/30"
                              : "bg-red-600/40 text-red-300 border border-red-500/30"
                          }`}
                        >
                          {test.totalErrors}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs sm:text-sm whitespace-nowrap w-40">
                        <div className="w-full bg-gray-600/30 rounded-full h-2 mb-1">
                          <div
                            className="bg-purple-500 h-2 rounded-full"
                            style={{
                              width: `${calculateCompletion(
                                test.typedWords,
                                test.totalWords
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-gray-300 text-xs">
                          {calculateCompletion(
                            test.typedWords,
                            test.totalWords
                          )}
                          %
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Scroll Indicator */}
            {scrollPosition === 0 && testHistory.length > 3 && (
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <div className="text-right pr-4">
                  <div className="text-xs text-purple-400 font-semibold animate-pulse">
                    → Scroll for more
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Charts Section - MOVED BELOW */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Performance Chart */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-purple-500/20 shadow-2xl">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">📊</span>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Performance Analytics
                </h2>
              </div>

              {/* Time Period Selection */}
              <div className="flex gap-2 mb-6 flex-wrap">
                {[
                  { value: "1month", label: "1 Month" },
                  { value: "6months", label: "6 Months" },
                  { value: "1year", label: "1 Year" },
                ].map((period) => (
                  <button
                    key={period.value}
                    onClick={() => setSelectedPeriod(period.value)}
                    className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                      selectedPeriod === period.value
                        ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white shadow-lg"
                        : "bg-white/10 text-gray-300 hover:bg-white/20 border border-purple-500/20"
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>

              {/* Metric Selection */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-400 uppercase">
                  Select Metrics
                </p>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(metricConfig).map(([key, config]) => (
                    <button
                      key={key}
                      onClick={() => toggleMetric(key)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all border-2 ${
                        selectedMetrics.includes(key)
                          ? `bg-${config.color}-600/30 border-${config.color}-500 text-${config.color}-300`
                          : "bg-white/5 border-transparent text-gray-500 hover:bg-white/10"
                      }`}
                    >
                      {config.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={currentData}
                  margin={{ top: 5, right: 30, left: -20, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorWpm" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorAccuracy"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorMistakes"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorConsistency"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(168, 85, 247, 0.1)"
                  />
                  <XAxis
                    dataKey="date"
                    stroke="#9CA3AF"
                    style={{ fontSize: "12px" }}
                  />
                  <YAxis stroke="#9CA3AF" style={{ fontSize: "12px" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(0, 0, 0, 0.9)",
                      border: "1px solid rgba(168, 85, 247, 0.5)",
                      borderRadius: "8px",
                      color: "#fff",
                    }}
                  />
                  <Legend wrapperStyle={{ paddingTop: "20px" }} />
                  {selectedMetrics.includes("wpm") && (
                    <Line
                      type="monotone"
                      dataKey="wpm"
                      stroke="#7C3AED"
                      strokeWidth={3}
                      dot={{ fill: "#7C3AED", r: 5 }}
                      activeDot={{ r: 7 }}
                      name="WPM"
                      isAnimationActive={true}
                    />
                  )}
                  {selectedMetrics.includes("accuracy") && (
                    <Line
                      type="monotone"
                      dataKey="accuracy"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ fill: "#10B981", r: 5 }}
                      activeDot={{ r: 7 }}
                      name="Accuracy %"
                      isAnimationActive={true}
                    />
                  )}
                  {selectedMetrics.includes("mistakes") && (
                    <Line
                      type="monotone"
                      dataKey="mistakes"
                      stroke="#EF4444"
                      strokeWidth={3}
                      dot={{ fill: "#EF4444", r: 5 }}
                      activeDot={{ r: 7 }}
                      name="Mistakes"
                      isAnimationActive={true}
                    />
                  )}
                  {selectedMetrics.includes("consistency") && (
                    <Line
                      type="monotone"
                      dataKey="consistency"
                      stroke="#F59E0B"
                      strokeWidth={3}
                      dot={{ fill: "#F59E0B", r: 5 }}
                      activeDot={{ r: 7 }}
                      name="Consistency %"
                      isAnimationActive={true}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-purple-500/20 shadow-2xl flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🥇</span>
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Top Performers
              </h2>
            </div>
            <div className="space-y-2 overflow-y-auto pr-2 flex-1">
              {topPerformers.map((player, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 rounded-xl px-4 py-2.5 transition-all duration-200 ${
                    index === 2
                      ? "bg-gradient-to-r from-purple-600/50 to-pink-600/50 border-2 border-purple-400/60 shadow-lg"
                      : "bg-white/5 hover:bg-white/10 border border-purple-500/10"
                  }`}
                >
                  <div
                    className={`w-8 h-8 flex items-center justify-center font-bold rounded-full text-sm flex-shrink-0 ${
                      index === 0
                        ? "bg-yellow-400 text-yellow-900 shadow-lg"
                        : index === 1
                        ? "bg-gray-400 text-gray-900"
                        : index === 2
                        ? "bg-amber-600 text-white shadow-lg"
                        : "bg-purple-600/50 text-purple-200"
                    }`}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      {player.name}
                    </p>
                  </div>
                  <span className="text-xs text-purple-300 font-bold flex-shrink-0">
                    {player.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
