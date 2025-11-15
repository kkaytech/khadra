"use client";

import { apartments, buildingGoals, rewards } from "./mockData";
import {
  calculatePersonalSavingsRate,
  calculateNormalizedUsage,
  calculateBuildingComparisonScore,
  calculateDiscountPercentage
} from "./lib/aiEngine";

interface LeaderboardProps {
  buildingId: number;
  apartment: string;
  userSubmission?: { electricity: number; water: number };
  onBack: () => void;
}

export default function Leaderboard({
  buildingId,
  apartment,
  userSubmission,
  onBack,
}: LeaderboardProps) {
  const buildingApartments = apartments.filter(
    (entry: any) => entry.buildingId === buildingId
  );

  // Build leaderboard with savings calculations
  const leaderboardData = buildingApartments.map((apt: any) => {
    const isCurrentUser = apt.number === apartment;

    // If user just submitted, use their new data
    let currentUsage, currentWater;
    if (isCurrentUser && userSubmission) {
      currentUsage = userSubmission.electricity - apt.lastReading.electricity;
      currentWater = userSubmission.water - apt.lastReading.water;
    } else {
      currentUsage = apt.previousMonths[0]?.electricity || 0;
      currentWater = apt.previousMonths[0]?.water || 0;
    }

    // Previous period usage
    const previousUsage = isCurrentUser && userSubmission
      ? apt.previousMonths[0]?.electricity || currentUsage
      : apt.previousMonths[1]?.electricity || currentUsage;
    
    const previousWater = isCurrentUser && userSubmission
      ? apt.previousMonths[0]?.water || currentWater
      : apt.previousMonths[1]?.water || currentWater;

    // Calculate savings %
    const elecSaved = previousUsage > 0 
      ? ((previousUsage - currentUsage) / previousUsage) * 100 
      : 0;
    const waterSaved = previousWater > 0 
      ? ((previousWater - currentWater) / previousWater) * 100 
      : 0;

    // AI discount calculation
    const userData = {
      householdSize: apt.householdSize,
      apartmentSqft: apt.apartmentSqft,
      hasElderly: apt.hasElderly,
      hasChildren: apt.hasChildren,
      prevMonth1ElecKwh: previousUsage,
      prevMonth2ElecKwh: apt.previousMonths[2]?.electricity || previousUsage,
      prevMonth3ElecKwh: apt.previousMonths[2]?.electricity || previousUsage,
      currentMonthUsage: currentUsage
    };

    const personalSavingsRate = calculatePersonalSavingsRate(userData);
    const userNormalized = calculateNormalizedUsage(
      currentUsage,
      userData.householdSize,
      userData.apartmentSqft,
      userData.hasElderly,
      userData.hasChildren
    );

    // Calculate building average (for percentile comparison)
    const buildingAvgNormalized = buildingApartments.reduce((sum, a: any) => {
      const usage = a.previousMonths[0]?.electricity || 0;
      return sum + usage;
    }, 0) / buildingApartments.length;

    const buildingPercentile = calculateBuildingComparisonScore(
      userNormalized,
      buildingAvgNormalized
    );
    const discount = calculateDiscountPercentage(personalSavingsRate, buildingPercentile);

    return {
      ...apt,
      currentUsage,
      currentWater,
      elecSaved: Math.max(0, Math.round(elecSaved * 100) / 100),
      waterSaved: Math.max(0, Math.round(waterSaved * 100) / 100),
      discount,
    };
  });

  // Sort by energy savings % (highest first)
  const sortedLeaderboard = leaderboardData
    .slice()
    .sort((a: any, b: any) => b.elecSaved - a.elecSaved);

  // Assign ranks
  const leaderboardWithRank = sortedLeaderboard.map((apt: any, idx: number) => ({
    ...apt,
    rank: idx + 1,
  }));

  const userEntry = leaderboardWithRank.find((e: any) => e.number === apartment);
  const userRank = userEntry ? userEntry.rank : leaderboardWithRank.length + 1;

  const goal = buildingGoals.find((g: any) => g.buildingId === buildingId);
  const progressPercentage = goal
    ? (goal.currentReduction / goal.targetReduction) * 100
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 p-4 py-8">
      <div className="max-w-6xl mx-auto">
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

          <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-xl mb-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-700 mb-1">Your Rank</p>
                <div className="flex items-center gap-3">
                  <span className="text-4xl font-bold text-green-700">#{userRank}</span>
                  <span className="text-lg text-gray-600">
                    out of {leaderboardWithRank.length}
                  </span>
                </div>
                {userEntry && (
                  <p className="mt-3 text-sm text-gray-700">
                    You used <span className="font-bold">{userEntry.currentUsage} kWh</span> &amp;{" "}
                    <span className="font-bold">{userEntry.currentWater} L</span> this month<br />
                    Saved: <span className="font-bold text-green-700">{userEntry.elecSaved}%</span> energy &amp;{" "}
                    <span className="font-bold text-blue-700">{userEntry.waterSaved}%</span> water<br />
                    AI Discount: <span className="text-green-700 font-bold">{userEntry.discount.toFixed(2)}%</span>
                  </p>
                )}
              </div>
              <div className="text-5xl">🏆</div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Building Reduction Goal</h3>
              <span className="text-sm text-gray-600">
                {goal?.currentReduction?.toFixed(1)}% / {goal?.targetReduction}%
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
                : `Keep going! ${((goal?.targetReduction || 8) - (goal?.currentReduction || 0)).toFixed(1)}% more to unlock rewards`}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
            <h2 className="text-xl font-bold text-white">Top Performers (By Savings %)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Rank</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Apt</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Resident</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Usage (kWh)</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Water (L)</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Energy Saved</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Water Saved</th>
                  <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 uppercase">Discount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboardWithRank.map((entry: any, index: number) => {
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
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-gray-900">{entry.rank}</span>
                          {rankEmoji && <span className="text-xl">{rankEmoji}</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`font-medium ${isUser ? "text-yellow-700" : "text-gray-900"}`}>
                          {entry.number}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`${isUser ? "text-yellow-700 font-semibold" : "text-gray-700"}`}>
                          {entry.resident}{isUser && " (You)"}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <span className="font-mono text-sm font-semibold text-gray-900">{entry.currentUsage}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <span className="font-mono text-sm font-semibold text-blue-700">{entry.currentWater}</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <span className="font-semibold text-green-700">{entry.elecSaved}%</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <span className="font-semibold text-blue-700">{entry.waterSaved}%</span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-right">
                        <span className="text-green-700 font-semibold">{entry.discount.toFixed(2)}%</span>
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
            {rewards.map((reward: any, index: number) => (
              <div
                key={index}
                className={`p-6 rounded-xl border-2 ${
                  progressPercentage >= reward.unlockAt * 10
                    ? "bg-green-50 border-green-300"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-2xl mb-2">{reward.icon}</div>
                    <h3 className="font-semibold text-gray-900">{reward.title}</h3>
                  </div>
                  {progressPercentage >= reward.unlockAt * 10 ? (
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

        <div className="text-center mt-8 text-sm text-gray-600">
          <p>Keep up the great work! Every kWh saved helps our community. 🌿</p>
        </div>
      </div>
    </div>
  );
}
