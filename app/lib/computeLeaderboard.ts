// /app/lib/computeLeaderboard.ts

import { apartments } from "../mockData";

// Utility to get most recent month's usage (last complete month, not "current")
export function getLatestConsumption(apt: any) {
  return apt.previousMonths && apt.previousMonths.length > 0
    ? apt.previousMonths[0].electricity
    : 0;
}
export function getLatestWater(apt: any) {
  return apt.previousMonths && apt.previousMonths.length > 0
    ? apt.previousMonths[0].water
    : 0;
}

// Used on submission or leaderboard load
export function computeLeaderboard(buildingId: number, userNumber?: string, userCurrent?: { electricity?: number, water?: number }) {
  const buildingApartments = apartments.filter((apt: any) => apt.buildingId === buildingId);

  // If userCurrent is set, use that for user in the leaderboard array
  const leaderboardRaw = buildingApartments.map((apt: any) => ({
    ...apt,
    // Use new value if this is current user
    consumption: (userNumber && userCurrent && apt.number === userNumber && typeof userCurrent.electricity === "number")
      ? userCurrent.electricity
      : getLatestConsumption(apt),
    waterUsed: (userNumber && userCurrent && apt.number === userNumber && typeof userCurrent.water === "number")
      ? userCurrent.water
      : getLatestWater(apt),
  }));

  // Sort ascending by electricity
  const sorted = leaderboardRaw.slice().sort((a: any, b: any) => a.consumption - b.consumption);

  // Attach ranks, calculate savings compared to previous month for both electricity and water
  return sorted.map((apt: any, idx: number) => {
    // Use previousMonths[1] as "previous" for savings calculation
    const prevElec = apt.previousMonths?.[1]?.electricity ?? apt.consumption;
    const currElec = apt.consumption;
    const prevWater = apt.previousMonths?.[1]?.water ?? apt.waterUsed;
    const currWater = apt.waterUsed;

    const elecSaved = prevElec > 0 ? ((prevElec - currElec) / prevElec) * 100 : 0;
    const waterSaved = prevWater > 0 ? ((prevWater - currWater) / prevWater) * 100 : 0;

    return {
      ...apt,
      rank: idx + 1,
      elecSaved: Math.round(elecSaved * 100) / 100,
      waterSaved: Math.round(waterSaved * 100) / 100,
    };
  });
}
