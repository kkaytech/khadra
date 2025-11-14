// app/mockData.ts

// List of buildings
export const buildings = [
  { id: 1, name: "Marina Tower" },
  { id: 2, name: "Skyline Heights" },
  { id: 3, name: "Sunset Residences" }
];

// Apartments with initial readings
export const apartments = [
  {
    number: "1001",
    buildingId: 1,
    resident: "You",
    lastReading: { electricity: 10250, water: 850 }
  },
  {
    number: "1002",
    buildingId: 1,
    resident: "Sam",
    lastReading: { electricity: 10170, water: 900 }
  },
  {
    number: "1003",
    buildingId: 1,
    resident: "Maha",
    lastReading: { electricity: 10015, water: 760 }
  },
  {
    number: "1501",
    buildingId: 2,
    resident: "Sara",
    lastReading: { electricity: 9000, water: 1000 }
  },
  {
    number: "210",
    buildingId: 3,
    resident: "Fahad",
    lastReading: { electricity: 7500, water: 450 }
  }
  // Add more apartments as needed for realistic competition!
];

// Pre-generated leaderboard entries for the demo
export const leaderboard = [
  // For Marina Tower (buildingId 1)
  { number: "1002", resident: "Sam", consumption: 120, rank: 1, buildingId: 1 },
  { number: "1003", resident: "Maha", consumption: 150, rank: 2, buildingId: 1 },
  { number: "1001", resident: "You", consumption: 170, rank: 3, buildingId: 1 },
  // Add more fake competitors to fill the leaderboard if needed
  { number: "1004", resident: "Amit", consumption: 185, rank: 4, buildingId: 1 },
  { number: "1005", resident: "Laila", consumption: 190, rank: 5, buildingId: 1 }
];

// Building-wide monthly reduction goals (for the progress bar/rewards)
export const buildingGoals = [
  {
    buildingId: 1,
    currentReduction: 4.2,  // Percentage reduction so far this month
    targetReduction: 5.0    // Target percentage for reward
  },
  {
    buildingId: 2,
    currentReduction: 2.8,
    targetReduction: 5.0
  },
  {
    buildingId: 3,
    currentReduction: 3.5,
    targetReduction: 5.0
  }
];

// Rewards (community and top performer)
export const rewards = [
  {
    type: "Community",
    description: "20% off at the Lobby Cafe",
    unlockAt: 5, // Building must hit 5% reduction
    unlocked: false
  },
  {
    type: "Top Performer",
    description: "Free Month of Valet Parking",
    unlockAt: 1, // 1st place in leaderboard
    unlocked: false
  }
];
