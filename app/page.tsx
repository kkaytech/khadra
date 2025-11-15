"use client";
import { useState } from "react";
import { buildings, apartments } from "./mockData";
import Leaderboard from "./leaderboard";
import Link from "next/link";

export default function Home() {
  const [buildingId, setBuildingId] = useState(buildings[0].id);
  const [apartment, setApartment] = useState("");
  const [step, setStep] = useState<"onboarding" | "meter" | "results" | "leaderboard">("onboarding");
  const [meterData, setMeterData] = useState({ electricity: "", water: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentBuilding = buildings.find(b => b.id === buildingId);
  const userApartment = apartments.find(
    (a) => a.number === apartment && a.buildingId === buildingId
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("meter");
  };

  const handleMeterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setStep("results");
  };

  const calculateSavings = () => {
    if (!userApartment) return { energy: 0, water: 0, rank: 0, totalApartments: 0 };

    // User's NEW reading from form input
    const newElecReading = parseInt(meterData.electricity);
    const newWaterReading = parseInt(meterData.water);

    // User's PREVIOUS reading (stored in lastReading)
    const prevElecReading = userApartment.lastReading.electricity;
    const prevWaterReading = userApartment.lastReading.water;

    // Calculate USAGE for this period (difference between readings)
    const elecUsedThisPeriod = newElecReading - prevElecReading;
    const waterUsedThisPeriod = newWaterReading - prevWaterReading;

    // Get the PREVIOUS period's usage from previousMonths[0]
    const prevPeriodElec = userApartment.previousMonths[0]?.electricity || elecUsedThisPeriod;
    const prevPeriodWater = userApartment.previousMonths[0]?.water || waterUsedThisPeriod;

    // Calculate SAVINGS % (current usage vs previous period usage)
    const energySavings = prevPeriodElec > 0 
      ? ((prevPeriodElec - elecUsedThisPeriod) / prevPeriodElec) * 100 
      : 0;
    const waterSavings = prevPeriodWater > 0 
      ? ((prevPeriodWater - waterUsedThisPeriod) / prevPeriodWater) * 100 
      : 0;

    // Build leaderboard for ALL apartments in this building
    const buildingApartments = apartments.filter(
      (apt: any) => apt.buildingId === userApartment.buildingId
    );

    const leaderboardData = buildingApartments.map((apt: any) => {
      // For other apartments, use their stored data
      // For current user, use their new submission
      const isCurrentUser = apt.number === userApartment.number;
      
      const currentUsage = isCurrentUser 
        ? elecUsedThisPeriod 
        : apt.previousMonths[0]?.electricity || 0;
      
      const previousUsage = isCurrentUser
        ? prevPeriodElec
        : apt.previousMonths[1]?.electricity || currentUsage;

      const savingsPct = previousUsage > 0 
        ? ((previousUsage - currentUsage) / previousUsage) * 100 
        : 0;

      return {
        ...apt,
        currentUsage,
        savingsPct: Math.max(0, savingsPct)
      };
    });

    // Sort by savings percentage (highest savings = rank 1)
    const sortedLeaderboard = leaderboardData
      .slice()
      .sort((a: any, b: any) => b.savingsPct - a.savingsPct);

    // Find user's rank
    const userRank = sortedLeaderboard.findIndex(
      (entry: any) => entry.number === userApartment.number
    ) + 1;

    return {
      energy: Math.max(0, Math.round(energySavings * 100) / 100),
      water: Math.max(0, Math.round(waterSavings * 100) / 100),
      rank: userRank,
      totalApartments: sortedLeaderboard.length,
    };
  };

  const savings = calculateSavings();

  if (step === "leaderboard") {
    return (
      <Leaderboard
        buildingId={buildingId}
        apartment={apartment}
        userSubmission={meterData.electricity && meterData.water ? {
          electricity: parseInt(meterData.electricity),
          water: parseInt(meterData.water)
        } : undefined}
        onBack={() => setStep("results")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {["onboarding", "meter", "results"].map((s, index) => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === s ? 'bg-green-600 text-white' : 
                  index < ["onboarding", "meter", "results"].indexOf(step) ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
                }`}>
                  {index + 1}
                </div>
                {index < 2 && (
                  <div className={`w-12 h-1 ${index < ["onboarding", "meter", "results"].indexOf(step) ? 'bg-green-500' : 'bg-gray-300'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {step === "onboarding" && (
            <form onSubmit={handleSubmit} className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🌿</span>
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Khadra</h1>
                <p className="text-gray-700">Join your building's sustainability challenge</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Select Your Building
                  </label>
                  <select
                    value={buildingId}
                    onChange={(e) => setBuildingId(Number(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-500"
                  >
                    {buildings.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    Apartment Number
                  </label>
                  <input
                    type="text"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    placeholder="e.g., 1001"
                    required
                    className="w-full px-4 py-3 border border-gray-500 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-800"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  Continue to Meter Reading
                </button>
              </div>
            </form>
          )}

          {step === "meter" && (
            <form onSubmit={handleMeterSubmit} className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Submit Meter Reading</h1>
                <p className="text-gray-700">Help your building climb the leaderboard</p>
              </div>

              <div className="space-y-6">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="font-medium text-green-800 mb-2">Your Previous Reading</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-700">Electricity:</span>
                      <div className="font-mono text-lg font-bold text-green-700">
                        {userApartment?.lastReading.electricity.toLocaleString()} kWh
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-700">Water:</span>
                      <div className="font-mono text-lg font-bold text-blue-700">
                        {userApartment?.lastReading.water.toLocaleString()} L
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Current Electricity (kWh)
                    </label>
                    <input
                      type="number"
                      value={meterData.electricity}
                      onChange={(e) => setMeterData(d => ({ ...d, electricity: e.target.value }))}
                      placeholder="Enter current reading"
                      required
                      min={userApartment?.lastReading.electricity}
                      className="w-full px-4 py-3 border border-gray-800 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all font-mono text-gray-800"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-800 mb-2">
                      Current Water (Liters)
                    </label>
                    <input
                      type="number"
                      value={meterData.water}
                      onChange={(e) => setMeterData(d => ({ ...d, water: e.target.value }))}
                      placeholder="Enter current reading"
                      required
                      min={userApartment?.lastReading.water}
                      className="w-full px-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all font-mono text-gray-800"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Calculating Savings...
                    </>
                  ) : (
                    'Submit Reading & See Ranking'
                  )}
                </button>
              </div>
            </form>
          )}

          {step === "results" && (
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🏆</span>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Great Job!</h1>
                <p className="text-gray-700">You're helping {currentBuilding?.name} save energy</p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-green-700">{savings.energy}%</div>
                    <div className="text-sm text-gray-700">Energy Saved</div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold text-blue-700">{savings.water}%</div>
                    <div className="text-sm text-gray-700">Water Saved</div>
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-2xl font-bold text-purple-700">#{savings.rank}</div>
                  <div className="text-sm text-gray-700">
                    Rank in {currentBuilding?.name} (of {savings.totalApartments})
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h3 className="font-medium text-yellow-800 mb-1">Community Reward Unlocked! 🎉</h3>
                  <p className="text-sm text-yellow-700">
                    Your building is 80% to unlocking 20% off at the community cafe
                  </p>
                </div>

                <button
                  onClick={() => setStep("leaderboard")}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
                >
                  View Full Leaderboard
                </button>
                <Link
                  href="/rewards"
                  className="w-full block mt-3 bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-center"
                >
                  View Community Rewards
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-6 text-sm text-gray-600">
          <p>Khadra - Building Sustainability Platform</p>
        </div>
      </div>
    </div>
  );
}
