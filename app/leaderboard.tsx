"use client";

import { leaderboard, buildingGoals, rewards } from "./mockData";

interface LeaderboardProps {
  buildingId: number;
  apartment: string;
  onBack: () => void;
}

export default function Leaderboard({
  buildingId,
  apartment,
  onBack,
}: LeaderboardProps) {
  // Filter leaderboard for selected building
  const buildingLeaderboard = leaderboard.filter(
    (entry) => entry.buildingId === buildingId
  );

  // Find user's entry
  const userEntry = buildingLeaderboard.find((e) => e.number === apartment);
  const userRank = userEntry?.rank || buildingLeaderboard.length + 1;

  // Get building goal
  const goal = buildingGoals.find((g) => g.buildingId === buildingId);
  const progressPercentage = goal
    ? (goal.currentReduction / goal.targetReduction) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Building Leaderboard</h1>
            <button
              onClick={onBack}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-gray-700 font-medium transition-colors"
            >
              ← Back
            </button>
          </div>

          {/* User's Rank Card */}
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700 mb-1">Your Rank</p>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold text-green-700">#{userRank}</span>
                  <span className="text-lg text-gray-600">out of {buildingLeaderboard.length}</span>
                </div>
              </div>
              <div className="text-5xl">🏆</div>
            </div>
            {userEntry && (
              <p className="mt-3 text-sm text-gray-700">
                You used <span className="font-bold">{userEntry.consumption} kWh</span> this month
              </p>
            )}
          </div>

          {/* Building Goal Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Building Reduction Goal</h3>
              <span className="text-sm text-gray-600">
                {goal?.currentReduction.toFixed(1)}% / {goal?.targetReduction}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div
                className="bg-gradient-to-r from-green-500 to-emerald-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              />
            </div>
            <p className="text-xs text-gray-600 mt-2">
            {progressPercentage >= 100
            ? "🎉 Goal achieved! Community rewards unlocked!"
            : `Keep going! ${((goal?.targetReduction || 5) - (goal?.currentReduction || 0)).toFixed(1)}% more to unlock rewards`}
            </p>

          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
            <h2 className="text-xl font-bold text-white">Top Performers</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Apartment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Resident
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium text-gray-600 uppercase tracking-wider">
                    Usage (kWh)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {buildingLeaderboard.map((entry, index) => {
                  const isUser = entry.number === apartment;
                  const rankEmoji = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "";
                  
                  return (
                    <tr
                      key={entry.number}
                      className={`${
                        isUser
                          ? "bg-yellow-50 border-l-4 border-yellow-400"
                          : "hover:bg-gray-50"
                      } transition-colors`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">
                            {entry.rank}
                          </span>
                          {rankEmoji && <span className="text-xl">{rankEmoji}</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`font-medium ${isUser ? "text-yellow-700" : "text-gray-900"}`}>
                          {entry.number}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`${isUser ? "text-yellow-700 font-semibold" : "text-gray-700"}`}>
                          {entry.resident}
                          {isUser && " (You)"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <span className="font-mono font-semibold text-gray-900">
                          {entry.consumption}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Rewards Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Available Rewards</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {rewards.map((reward, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border-2 ${
                  progressPercentage >= reward.unlockAt * 20
                    ? "bg-green-50 border-green-300"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{reward.type}</h3>
                  {progressPercentage >= reward.unlockAt * 20 ? (
                    <span className="px-3 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                      Unlocked
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-gray-300 text-gray-700 text-xs font-medium rounded-full">
                      Locked
                    </span>
                  )}
                </div>
                <p className="text-gray-700 text-sm">{reward.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-sm text-gray-600">
          <p>Keep up the great work! Every kWh saved helps our community. 🌿</p>
        </div>
      </div>
    </div>
  );
}
