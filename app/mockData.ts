// app/mockData.ts

// List of buildings
export const buildings = [
  { id: 1, name: "Marina Tower" },
  { id: 2, name: "Skyline Heights" },
  { id: 3, name: "Sunset Residences" }
];

export const apartments = [
  {
    number: "1001",
    buildingId: 1,
    resident: "Omar",
    householdSize: 3,
    apartmentSqft: 1200,
    hasElderly: false,
    hasChildren: true,
    lastReading: { electricity: 920, water: 800 },
    previousMonths: [
      { electricity: 980, water: 850 },
      { electricity: 1050, water: 900 },
      { electricity: 1120, water: 950 }
    ]
  },
  {
    number: "1002",
    buildingId: 1,
    resident: "Maha",
    householdSize: 2,
    apartmentSqft: 1000,
    hasElderly: false,
    hasChildren: false,
    lastReading: { electricity: 740, water: 610 },
    previousMonths: [
      { electricity: 790, water: 650 },
      { electricity: 840, water: 690 },
      { electricity: 880, water: 710 }
    ]
  },
  {
    number: "1003",
    buildingId: 1,
    resident: "Fahad",
    householdSize: 4,
    apartmentSqft: 1800,
    hasElderly: true,
    hasChildren: true,
    lastReading: { electricity: 1120, water: 980 },
    previousMonths: [
      { electricity: 1170, water: 1040 },
      { electricity: 1220, water: 1080 },
      { electricity: 1280, water: 1150 }
    ]
  },
  {
    number: "1004",
    buildingId: 1,
    resident: "Sara",
    householdSize: 1,
    apartmentSqft: 900,
    hasElderly: false,
    hasChildren: false,
    lastReading: { electricity: 520, water: 405 },
    previousMonths: [
      { electricity: 556, water: 455 },
      { electricity: 590, water: 500 },
      { electricity: 637, water: 539 }
    ]
  },
  {
    number: "1005",
    buildingId: 1,
    resident: "Layla",
    householdSize: 5,
    apartmentSqft: 2000,
    hasElderly: true,
    hasChildren: true,
    lastReading: { electricity: 1500, water: 1200 },
    previousMonths: [
      { electricity: 1580, water: 1270 },
      { electricity: 1640, water: 1320 },
      { electricity: 1720, water: 1410 }
    ]
  },
  {
  number: "2001",
  buildingId: 2,
  resident: "Amal",
  householdSize: 2,
  apartmentSqft: 1100,
  hasElderly: false,
  hasChildren: true,
  lastReading: { electricity: 930, water: 810 },
  previousMonths: [
    { electricity: 990, water: 850 },
    { electricity: 1050, water: 900 },
    { electricity: 1110, water: 950 }
  ]
},
{
  number: "2002",
  buildingId: 2,
  resident: "Khalid",
  householdSize: 3,
  apartmentSqft: 1000,
  hasElderly: true,
  hasChildren: false,
  lastReading: { electricity: 710, water: 650 },
  previousMonths: [
    { electricity: 770, water: 700 },
    { electricity: 820, water: 730 },
    { electricity: 875, water: 765 }
  ]
},
{
  number: "2003",
  buildingId: 2,
  resident: "Lina",
  householdSize: 1,
  apartmentSqft: 900,
  hasElderly: false,
  hasChildren: false,
  lastReading: { electricity: 600, water: 510 },
  previousMonths: [
    { electricity: 640, water: 545 },
    { electricity: 695, water: 593 },
    { electricity: 750, water: 636 }
  ]
},
{
  number: "2004",
  buildingId: 2,
  resident: "Nasser",
  householdSize: 4,
  apartmentSqft: 1600,
  hasElderly: true,
  hasChildren: true,
  lastReading: { electricity: 1500, water: 1200 },
  previousMonths: [
    { electricity: 1550, water: 1270 },
    { electricity: 1620, water: 1320 },
    { electricity: 1700, water: 1390 }
  ]
},
{
  number: "2005",
  buildingId: 2,
  resident: "Sami",
  householdSize: 2,
  apartmentSqft: 1200,
  hasElderly: false,
  hasChildren: false,
  lastReading: { electricity: 820, water: 730 },
  previousMonths: [
    { electricity: 875, water: 770 },
    { electricity: 940, water: 830 },
    { electricity: 1000, water: 890 }
  ]
},

// Building 3 ("Sunset Residences")
{
  number: "3001",
  buildingId: 3,
  resident: "Huda",
  householdSize: 3,
  apartmentSqft: 1200,
  hasElderly: true,
  hasChildren: false,
  lastReading: { electricity: 960, water: 830 },
  previousMonths: [
    { electricity: 1020, water: 890 },
    { electricity: 1080, water: 930 },
    { electricity: 1120, water: 980 }
  ]
},
{
  number: "3002",
  buildingId: 3,
  resident: "Yasmine",
  householdSize: 1,
  apartmentSqft: 800,
  hasElderly: false,
  hasChildren: false,
  lastReading: { electricity: 520, water: 410 },
  previousMonths: [
    { electricity: 565, water: 452 },
    { electricity: 610, water: 492 },
    { electricity: 670, water: 545 }
  ]
},
{
  number: "3003",
  buildingId: 3,
  resident: "Ibrahim",
  householdSize: 5,
  apartmentSqft: 2000,
  hasElderly: true,
  hasChildren: true,
  lastReading: { electricity: 1570, water: 1280 },
  previousMonths: [
    { electricity: 1630, water: 1350 },
    { electricity: 1700, water: 1400 },
    { electricity: 1770, water: 1480 }
  ]
},
{
  number: "3004",
  buildingId: 3,
  resident: "Salma",
  householdSize: 2,
  apartmentSqft: 1100,
  hasElderly: false,
  hasChildren: true,
  lastReading: { electricity: 780, water: 670 },
  previousMonths: [
    { electricity: 830, water: 710 },
    { electricity: 895, water: 765 },
    { electricity: 950, water: 809 }
  ]
},
{
  number: "3005",
  buildingId: 3,
  resident: "Majed",
  householdSize: 4,
  apartmentSqft: 1800,
  hasElderly: false,
  hasChildren: true,
  lastReading: { electricity: 1250, water: 980 },
  previousMonths: [
    { electricity: 1320, water: 1040 },
    { electricity: 1370, water: 1070 },
    { electricity: 1430, water: 1130 }
  ]
}
];

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
