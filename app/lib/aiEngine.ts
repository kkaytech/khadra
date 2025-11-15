// app/lib/aiEngine.ts

export interface UserData {
  householdSize: number;
  apartmentSqft: number;
  hasElderly: boolean;
  hasChildren: boolean;
  prevMonth1ElecKwh: number;
  prevMonth2ElecKwh: number;
  prevMonth3ElecKwh: number;
  currentMonthUsage: number;
}

export function calculateNormalizedUsage(
  currentUsage: number,
  householdSize: number,
  apartmentSqft: number,
  hasElderly: boolean,
  hasChildren: boolean
): number {
  const perCapitaUsage = currentUsage / Math.max(householdSize, 1);
  const sqftFactor = 1000; // baseline sqft
  const sizeAdjustment = perCapitaUsage * (sqftFactor / apartmentSqft);
  const elderlyAdjustment = hasElderly ? 1.1 : 1.0;
  const childrenAdjustment = hasChildren ? 1.05 : 1.0;
  const normalizedUsage = sizeAdjustment * elderlyAdjustment * childrenAdjustment;
  return normalizedUsage;
}

export function calculatePersonalSavingsRate(userData: UserData): number {
  const historicalAvg =
    (userData.prevMonth1ElecKwh +
      userData.prevMonth2ElecKwh +
      userData.prevMonth3ElecKwh) /
    3;
  const currentUsage = userData.currentMonthUsage;
  if (historicalAvg > 0) {
    const savingsRate = ((historicalAvg - currentUsage) / historicalAvg) * 100;
    return Math.max(savingsRate, 0);
  }
  return 0;
}

export function calculateBuildingComparisonScore(
  userNormalized: number,
  buildingAvgNormalized: number
): number {
  if (buildingAvgNormalized > 0) {
    const relativePerformance =
      ((buildingAvgNormalized - userNormalized) / buildingAvgNormalized) * 100;
    const percentile = 50 + relativePerformance / 2;
    return Math.max(0, Math.min(100, percentile));
  }
  return 50;
}

export function calculateDiscountPercentage(
  personalSavingsRate: number,
  buildingPercentile: number,
  participationBonus: number = 0
): number {
  const personalComponent = Math.min(personalSavingsRate * 0.3, 6);
  const comparisonComponent = Math.min(
    Math.max((buildingPercentile - 50) * 0.12, 0),
    6
  );
  const participationComponent = Math.min(participationBonus, 3);
  const totalDiscount = personalComponent + comparisonComponent + participationComponent;
  return Math.round(Math.min(totalDiscount, 15) * 100) / 100;
}

export function generateAIInsights(
  userData: UserData,
  discountPct: number,
  buildingPercentile: number
): string[] {
  const insights: string[] = [];
  if (buildingPercentile >= 75) {
    insights.push("🌟 Outstanding! You're in the top 25% of your building.");
  } else if (buildingPercentile >= 50) {
    insights.push("✅ Great job! You're saving more than half your neighbors.");
  } else {
    insights.push("📊 You have room to improve. Small changes can make a big difference!");
  }
  if (discountPct >= 10) {
    insights.push(`💰 You've earned a ${discountPct}% discount on your next bill!`);
  } else if (discountPct >= 5) {
    insights.push(`🎯 You're earning a ${discountPct}% discount. Keep it up!`);
  } else {
    insights.push(`📈 Current discount: ${discountPct}%. Try reducing usage by 10% next month!`);
  }
  if (userData.householdSize > 3) {
    insights.push("💡 Tip: With a larger household, focus on efficient appliances and turning off lights.");
  }
  if (userData.apartmentSqft > 1200) {
    insights.push("🏠 Tip: Larger spaces benefit most from smart thermostats and LED lighting.");
  }
  return insights;
}

export interface RewardPoolAllocation {
  totalPool: number;
  allocation: {
    communityRewards: number;
    topPerformerRewards: number;
    randomDrawRewards: number;
  };
  unlockedRewards: string[];
  avgSavingsRate: number;
  participationRate: number;
}

export function dynamicRewardPoolAllocation(
  totalParticipants: number,
  avgSavingsRate: number
): RewardPoolAllocation {
  const basePool = 5000;
  const participationRate = totalParticipants / 50;
  const participationMultiplier = 1 + participationRate * 0.5;
  const savingsMultiplier = 1 + avgSavingsRate / 100;
  const totalPool = basePool * participationMultiplier * savingsMultiplier;
  const allocation = {
    communityRewards: totalPool * 0.6,
    topPerformerRewards: totalPool * 0.3,
    randomDrawRewards: totalPool * 0.1,
  };
  const unlockedRewards: string[] = [];
  if (avgSavingsRate >= 5) {
    unlockedRewards.push("20% off at Community Café");
  }
  if (avgSavingsRate >= 8) {
    unlockedRewards.push("Free Valet Parking Month");
  }
  if (totalParticipants >= 30) {
    unlockedRewards.push("Building-wide Event Sponsorship");
  }
  return {
    totalPool: Math.round(totalPool * 100) / 100,
    allocation,
    unlockedRewards,
    avgSavingsRate: Math.round(avgSavingsRate * 100) / 100,
    participationRate: Math.round(participationRate * 10000) / 100,
  };
}
