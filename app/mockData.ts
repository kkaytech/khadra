// app/mockData.ts

// List of buildings
export const buildings = [
  { id: 1, name: "Marina Tower" },
  { id: 2, name: "Skyline Heights" },
  { id: 3, name: "Sunset Residences" }
];

// Enhanced apartment data with household factors
export const apartments = [
  {
    number: "1001",
    buildingId: 1,
    resident: "Omar",
    householdSize: 5,
    apartmentSqft: 1200,
    hasElderly: false,
    hasChildren: true,
    lastReading: { electricity: 10250, water: 850 },
    previousMonths: [
      { electricity: 798, water: 1581 },
      { electricity: 711, water: 1614 },
      { electricity: 795, water: 1401 }
    ]
  },
  {
    number: "1002",
    buildingId: 1,
    resident: "Maha",
    householdSize: 1,
    apartmentSqft: 2000,
    hasElderly: false,
    hasChildren: false,
    lastReading: { electricity: 10170, water: 900 },
    previousMonths: [
      { electricity: 652, water: 703 },
      { electricity: 522, water: 685 },
      { electricity: 498, water: 636 }
    ]
  },
  {
    number: "1003",
    buildingId: 1,
    resident: "Fahad",
    householdSize: 2,
    apartmentSqft: 2000,
    hasElderly: false,
    hasChildren: false,
    lastReading: { electricity: 10015, water: 760 },
    previousMonths: [
      { electricity: 752, water: 979 },
      { electricity: 653, water: 911 },
      { electricity: 565, water: 879 }
    ]
  },
  {
    number: "1004",
    buildingId: 1,
    resident: "Sara",
    householdSize: 2,
    apartmentSqft: 1200,
    hasElderly: false,
    hasChildren: false,
    lastReading: { electricity: 9850, water: 720 },
    previousMonths: [
      { electricity: 555, water: 945 },
      { electricity: 528, water: 886 },
      { electricity: 480, water: 847 }
    ]
  },
  {
    number: "1005",
    buildingId: 1,
    resident: "Layla",
    householdSize: 4,
    apartmentSqft: 1500,
    hasElderly: false,
    hasChildren: false,
    lastReading: { electricity: 9850, water: 720 },
    previousMonths: [
      { electricity: 555, water: 945 },
      { electricity: 528, water: 886 },
      { electricity: 480, water: 847 }
    ]
  }]