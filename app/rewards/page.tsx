"use client";

import { rewards, buildingGoals } from "../mockData";
import { useState } from "react";

// Optional: Accept buildingId and userRank as props or context for a multi-building app
const buildingId = 1; // Hardcode or take from user state/context

export default function RewardsPage() {
  // Simulate progress for current building
  const goal = buildingGoals.find(g => g.buildingId === buildingId);
  const progress = goal ? goal.currentReduction : 0;

  // Example: reward "unlocks" if building progress meets the unlockAt percentage
  function isUnlocked(reward: typeof rewards[number]) {
    if (reward.type === "Community") {
      return progress >= reward.unlockAt; // unlockAt is a percent, e.g. 5
    }
    if (reward.type === "Top Performer") {
      // You can replace this with userRank === 1 for real logic
      return false;
    }
    return false;
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-green-50 to-emerald-100 p-6">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Community Rewards</h1>
        <p className="mb-8 text-gray-700">
          As your building saves more energy, exclusive rewards become available to everyone!
        </p>

        <div className="grid gap-6">
          {rewards.map((reward: any, idx: number) => (

            <div
              key={idx}
              className={`p-6 rounded-xl border-2 ${
                isUnlocked(reward)
                  ? "bg-green-50 border-green-400"
                  : "bg-gray-50 border-gray-200"
              } transition-colors`}
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-xl font-semibold text-green-900">{reward.type} Reward</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    isUnlocked(reward)
                      ? "bg-green-600 text-white"
                      : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {isUnlocked(reward) ? "Unlocked!" : "Locked"}
                </span>
              </div>
              <p className="text-gray-700">{reward.description}</p>
              <div className="mt-4">
                {reward.type === "Community" && (
                  <div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-1">
                      <div
                        className="h-2 bg-green-500 rounded-full transition-all"
                        style={{
                          width: `${Math.min(
                            (progress / reward.unlockAt) * 100,
                            100
                          )}%`
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-600 mb-1">
                      {progress < reward.unlockAt
                        ? `Building needs ${(
                            reward.unlockAt - progress
                          ).toFixed(1)}% more reduction to unlock`
                        : "Goal reached! Enjoy your reward!"}
                    </div>
                  </div>
                )}
                {reward.type === "Top Performer" && (
                  <div className="text-xs text-gray-600">
                    Awarded to the apartment with the highest savings!
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          Keep submitting your readings and encourage neighbors to unlock more rewards!
        </div>
      </div>
    </div>
  );
}
