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
  export const buildingGoals = [
    {
      buildingId: 1,
      currentReduction: 4.2,
      targetReduction: 5.0,
      participationRate: 72,
      totalParticipants: 18,
      rewardPool: 6200
    },
    {
      buildingId: 2,
      currentReduction: 2.8,
      targetReduction: 5.0,
      participationRate: 65,
      totalParticipants: 15,
      rewardPool: 5400
    },
    {
      buildingId: 3,
      currentReduction: 3.5,
      targetReduction: 5.0,
      participationRate: 80,
      totalParticipants: 20,
      rewardPool: 6800
    }
  ];

  export const rewards = [
    {
      type: "Community",
      title: "Utility Bill Discount",
      description: "5% discount on next month's DEWA bill",
      unlockAt: 5,
      category: "utility",
      icon: "💰"
    },
    {
      type: "Community",
      title: "Noon Shopping Voucher",
      description: "AED 25 off on orders above AED 150",
      unlockAt: 5,
      category: "shopping",
      icon: "🛍️"
    },
    {
      type: "Community",
      title: "Free Laundry Service",
      description: "One free laundry load (AED 20 value)",
      unlockAt: 6,
      category: "service",
      icon: "🧺"
    },
    {
      type: "Community",
      title: "Café Discount",
      description: "Free coffee or snack at building café",
      unlockAt: 4,
      category: "food",
      icon: "☕"
    },
    {
      type: "Top Performer",
      title: "Premium Parking",
      description: "Free valet parking for one month",
      unlockAt: 1,
      category: "parking",
      icon: "🚗"
    },
    {
      type: "Community",
      title: "Grocery Delivery Coupon",
      description: "AED 30 off on Carrefour or Talabat grocery delivery",
      unlockAt: 7,
      category: "grocery",
      icon: "🛒"
    },
    {
      type: "Top Performer",
      title: "Free Car Wash",
      description: "Complimentary car wash service",
      unlockAt: 2,
      category: "service",
      icon: "🚿"
    },
    {
      type: "Community",
      title: "Gym & Pool Access",
      description: "Early bird access to community pool or gym",
      unlockAt: 8,
      category: "wellness",
      icon: "🏊"
    },
    {
      type: "Community",
      title: "Smart Home Raffle",
      description: "Entry into monthly raffle for smart plugs, bulbs, or meters",
      unlockAt: 3,
      category: "tech",
      icon: "💡"
    },
    {
      type: "Achievement",
      title: "Green Neighbor Badge",
      description: "Digital badge + recognition in building newsletter",
      unlockAt: 1,
      category: "recognition",
      icon: "🏆"
    }
  ];
