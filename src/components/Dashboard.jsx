import React, { useState } from "react";

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("speed");
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(10);

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=John",
      speed: 82,
      accuracy: 94,
      testsTaken: 18,
      rank: 5,
      totalTests: 1200,
      avgSpeed: 79,
      streak: 7,
      joinDate: "Jan 15, 2024",
      level: "Advanced",
      lastTest: "2h ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Jane",
      speed: 95,
      accuracy: 96,
      testsTaken: 42,
      rank: 1,
      totalTests: 2840,
      avgSpeed: 91,
      streak: 12,
      joinDate: "Dec 01, 2023",
      level: "Expert",
      lastTest: "30m ago",
    },
    {
      id: 3,
      name: "Alex Johnson",
      email: "alex@example.com",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Alex",
      speed: 68,
      accuracy: 87,
      testsTaken: 15,
      rank: 12,
      totalTests: 890,
      avgSpeed: 65,
      streak: 3,
      joinDate: "Feb 20, 2024",
      level: "Intermediate",
      lastTest: "1d ago",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah",
      speed: 88,
      accuracy: 92,
      testsTaken: 28,
      rank: 3,
      totalTests: 2100,
      avgSpeed: 85,
      streak: 5,
      joinDate: "Jan 08, 2024",
      level: "Advanced",
      lastTest: "5h ago",
    },
    {
      id: 5,
      name: "Mike Brown",
      email: "mike@example.com",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Mike",
      speed: 72,
      accuracy: 89,
      testsTaken: 31,
      rank: 8,
      totalTests: 1550,
      avgSpeed: 70,
      streak: 0,
      joinDate: "Mar 10, 2024",
      level: "Intermediate",
      lastTest: "3d ago",
    },
    {
      id: 6,
      name: "Emma Davis",
      email: "emma@example.com",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Emma",
      speed: 91,
      accuracy: 95,
      testsTaken: 35,
      rank: 2,
      totalTests: 2300,
      avgSpeed: 88,
      streak: 10,
      joinDate: "Dec 15, 2023",
      level: "Expert",
      lastTest: "45m ago",
    },
    {
      id: 7,
      name: "Tom Harris",
      email: "tom@example.com",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Tom",
      speed: 76,
      accuracy: 90,
      testsTaken: 22,
      rank: 9,
      totalTests: 1320,
      avgSpeed: 74,
      streak: 4,
      joinDate: "Feb 05, 2024",
      level: "Intermediate",
      lastTest: "12h ago",
    },
    {
      id: 8,
      name: "Lisa Martin",
      email: "lisa@example.com",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Lisa",
      speed: 85,
      accuracy: 93,
      testsTaken: 26,
      rank: 4,
      totalTests: 1780,
      avgSpeed: 82,
      streak: 8,
      joinDate: "Jan 22, 2024",
      level: "Advanced",
      lastTest: "1h ago",
    },
    {
      id: 9,
      name: "Chris Lee",
      email: "chris@example.com",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Chris",
      speed: 79,
      accuracy: 91,
      testsTaken: 24,
      rank: 6,
      totalTests: 1450,
      avgSpeed: 77,
      streak: 6,
      joinDate: "Jan 28, 2024",
      level: "Advanced",
      lastTest: "4h ago",
    },
    {
      id: 10,
      name: "Rachel Green",
      email: "rachel@example.com",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Rachel",
      speed: 74,
      accuracy: 88,
      testsTaken: 20,
      rank: 10,
      totalTests: 1100,
      avgSpeed: 71,
      streak: 2,
      joinDate: "Mar 05, 2024",
      level: "Intermediate",
      lastTest: "6h ago",
    },
    {
      id: 11,
      name: "David White",
      email: "david@example.com",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=David",
      speed: 93,
      accuracy: 94,
      testsTaken: 38,
      rank: 3,
      totalTests: 2250,
      avgSpeed: 90,
      streak: 9,
      joinDate: "Dec 20, 2023",
      level: "Expert",
      lastTest: "2h ago",
    },
    {
      id: 12,
      name: "Sophie Anderson",
      email: "sophie@example.com",
      avatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sophie",
      speed: 86,
      accuracy: 92,
      testsTaken: 29,
      rank: 7,
      totalTests: 1900,
      avgSpeed: 83,
      streak: 7,
      joinDate: "Jan 12, 2024",
      level: "Advanced",
      lastTest: "3h ago",
    },
  ];

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "speed") return b.speed - a.speed;
      if (sortBy === "accuracy") return b.accuracy - a.accuracy;
      if (sortBy === "tests") return b.testsTaken - a.testsTaken;
      if (sortBy === "rank") return a.rank - b.rank;
      return 0;
    });

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleUsersPerPageChange = (e) => {
    setUsersPerPage(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const avgSpeedAll = Math.round(users.reduce((sum, user) => sum + user.avgSpeed, 0) / users.length);
  const avgAccuracyAll = Math.round(users.reduce((sum, user) => sum + user.accuracy, 0) / users.length);
  const totalTestsAll = users.reduce((sum, user) => sum + user.testsTaken, 0);

  const StatCard = ({ label, value, icon, color }) => (
    <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-purple-500/20 ${color}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{label}</p>
          <h3 className="text-3xl font-bold text-white">{value}</h3>
        </div>
        <span className="text-4xl opacity-20">{icon}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/30 border-b border-purple-500/20 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <p className="text-gray-400 text-sm mt-1">User Performance Overview</p>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/10 border border-purple-500/30 rounded-lg px-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white w-64"
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">🔍</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          <StatCard
            label="Total Users"
            value={users.length}
            icon="👥"
            color="hover:shadow-lg hover:shadow-blue-500/20 transition-all"
          />
          <StatCard
            label="Avg Speed"
            value={`${avgSpeedAll} WPM`}
            icon="⚡"
            color="hover:shadow-lg hover:shadow-yellow-500/20 transition-all"
          />
          <StatCard
            label="Total Tests"
            value={totalTestsAll}
            icon="✓"
            color="hover:shadow-lg hover:shadow-purple-500/20 transition-all"
          />
          <StatCard
            label="Avg Accuracy"
            value={`${avgAccuracyAll}%`}
            icon="🎯"
            color="hover:shadow-lg hover:shadow-orange-500/20 transition-all"
          />
        </div>

        {/* Controls */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-purple-500/20 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="text-gray-400 text-sm">
              Showing {filteredUsers.length} users
            </div>
            <div className="flex gap-4 items-center">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-white/10 border border-purple-500/30 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="speed" className="text-gray-800">
                  Sort by Speed ⚡
                </option>
                <option value="accuracy" className="text-gray-800">
                  Sort by Accuracy 🎯
                </option>
                <option value="tests" className="text-gray-800">
                  Sort by Tests ✓
                </option>
                <option value="rank" className="text-gray-800">
                  Sort by Rank 🏆
                </option>
              </select>
              <select
                value={usersPerPage}
                onChange={handleUsersPerPageChange}
                className="bg-white/10 border border-purple-500/30 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="10" className="text-gray-800">
                  10 per page
                </option>
                <option value="20" className="text-gray-800">
                  20 per page
                </option>
                <option value="30" className="text-gray-800">
                  30 per page
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-purple-500/20 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-purple-500/20 bg-white/5">
                  <th className="text-left py-4 px-4 font-bold text-purple-300 whitespace-nowrap">Rank</th>
                  <th className="text-left py-4 px-4 font-bold text-purple-300 whitespace-nowrap">User</th>
                  <th className="text-left py-4 px-4 font-bold text-purple-300 whitespace-nowrap">Email</th>
                  <th className="text-center py-4 px-4 font-bold text-purple-300 whitespace-nowrap">Current Speed</th>
                  <th className="text-center py-4 px-4 font-bold text-purple-300 whitespace-nowrap">Avg Speed</th>
                  <th className="text-center py-4 px-4 font-bold text-purple-300 whitespace-nowrap">Accuracy</th>
                  <th className="text-center py-4 px-4 font-bold text-purple-300 whitespace-nowrap">Tests</th>
                  <th className="text-center py-4 px-4 font-bold text-purple-300 whitespace-nowrap">Streak</th>
                  <th className="text-left py-4 px-4 font-bold text-purple-300 whitespace-nowrap">Level</th>
                  <th className="text-left py-4 px-4 font-bold text-purple-300 whitespace-nowrap">Last Test</th>
                  <th className="text-left py-4 px-4 font-bold text-purple-300 whitespace-nowrap">Join Date</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-purple-500/10 hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="py-4 px-4">
                      <div className="inline-block">
                        {user.rank <= 3 ? (
                          <span
                            className={`text-xl font-bold ${
                              user.rank === 1
                                ? "text-yellow-400"
                                : user.rank === 2
                                ? "text-gray-300"
                                : "text-orange-400"
                            }`}
                          >
                            {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : "🥉"}
                          </span>
                        ) : (
                          <span className="text-purple-400 font-bold">#{user.rank}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full border border-purple-500/50"
                        />
                        <span className="font-medium text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-400 text-xs">{user.email}</td>
                    <td className="py-4 px-4">
                      <span className="block text-center font-bold text-blue-400">{user.speed} WPM</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="block text-center font-medium text-purple-300">{user.avgSpeed} WPM</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 bg-white/10 rounded-full h-1.5 border border-green-500/30">
                          <div
                            className="bg-gradient-to-r from-green-500 to-green-400 h-full rounded-full"
                            style={{ width: `${user.accuracy}%` }}
                          ></div>
                        </div>
                        <span className="text-green-400 font-bold text-sm">{user.accuracy}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="block text-center font-medium text-purple-300">{user.testsTaken}</span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-center gap-1">
                        {user.streak > 0 ? (
                          <>
                            <span className="text-orange-400">🔥</span>
                            <span className="font-bold text-orange-300">{user.streak}</span>
                          </>
                        ) : (
                          <span className="text-gray-500 text-xs">—</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                          user.level === "Expert"
                            ? "bg-red-500/20 text-red-300 border border-red-500/30"
                            : user.level === "Advanced"
                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                            : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                        }`}
                      >
                        {user.level}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-400 text-sm whitespace-nowrap">{user.lastTest}</td>
                    <td className="py-4 px-4 text-gray-400 text-sm whitespace-nowrap">{user.joinDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {currentUsers.length === 0 && (
            <div className="p-12 text-center">
              <p className="text-gray-400 text-lg">No users found</p>
            </div>
          )}
        </div>

        {/* Pagination Controls */}
        {filteredUsers.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-gray-400 text-sm">
              Showing {indexOfFirstUser + 1}-{Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-white/10 border border-purple-500/30 rounded-lg px-4 py-2 text-sm text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                ← Previous
              </button>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      currentPage === pageNum
                        ? "bg-purple-500 text-white"
                        : "bg-white/10 border border-purple-500/30 text-white hover:bg-white/20"
                    }`}
                  >
                    {pageNum}
                  </button>
                ))}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-white/10 border border-purple-500/30 rounded-lg px-4 py-2 text-sm text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Next →
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}