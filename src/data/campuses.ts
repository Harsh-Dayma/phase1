export interface Campus {
  id: string
  name: string
  shortName: string
  city: string
  country: string
  regionId: string
  lat: number
  lng: number
  allTimeKg: number
  weeklyKg: number
  sponsorId: string
  topRecycledItem: string
  activeKiosks: number
}

export const INITIAL_CAMPUSES: Campus[] = [
  {
    id: 'mit',
    name: 'Massachusetts Institute of Technology',
    shortName: 'MIT',
    city: 'Cambridge',
    country: 'United States',
    regionId: 'north-america',
    lat: 42.3601,
    lng: -71.0942,
    allTimeKg: 21450.4,
    weeklyKg: 420.8,
    sponsorId: 'google',
    topRecycledItem: 'Lab Compute Blades & GPUs',
    activeKiosks: 8
  },
  {
    id: 'stanford',
    name: 'Stanford University',
    shortName: 'Stanford',
    city: 'Stanford',
    country: 'United States',
    regionId: 'north-america',
    lat: 37.4275,
    lng: -122.1697,
    allTimeKg: 18920.8,
    weeklyKg: 385.2,
    sponsorId: 'apple',
    topRecycledItem: 'Apple Silicon MacBooks',
    activeKiosks: 7
  },
  {
    id: 'iit-bombay',
    name: 'IIT Bombay',
    shortName: 'IIT Bombay',
    city: 'Mumbai',
    country: 'India',
    regionId: 'asia',
    lat: 19.1334,
    lng: 72.9133,
    allTimeKg: 14800.0,
    weeklyKg: 310.4,
    sponsorId: 'tata',
    topRecycledItem: 'Robotics Microcontrollers & Wire Harnesses',
    activeKiosks: 6
  },
  {
    id: 'oxford',
    name: 'University of Oxford',
    shortName: 'Oxford',
    city: 'Oxford',
    country: 'United Kingdom',
    regionId: 'europe',
    lat: 51.7548,
    lng: -1.2544,
    allTimeKg: 9650.5,
    weeklyKg: 240.1,
    sponsorId: 'intel',
    topRecycledItem: 'High-Field Sensor Peripherals',
    activeKiosks: 5
  },
  {
    id: 'dtu',
    name: 'Delhi Technological University',
    shortName: 'DTU',
    city: 'Delhi',
    country: 'India',
    regionId: 'asia',
    lat: 28.7501,
    lng: 77.1177,
    allTimeKg: 7180.5,
    weeklyKg: 147.1, // Trails NSUT (148.6) by exactly 1.5 kg
    sponsorId: 'tcs',
    topRecycledItem: 'Hostel Power Banks & Li-ion Cells',
    activeKiosks: 4
  },
  {
    id: 'iit-delhi',
    name: 'IIT Delhi',
    shortName: 'IIT Delhi',
    city: 'Delhi',
    country: 'India',
    regionId: 'asia',
    lat: 28.5450,
    lng: 77.1926,
    allTimeKg: 6540.2,
    weeklyKg: 192.5,
    sponsorId: 'infosys',
    topRecycledItem: 'FPGA Boards & Power Bricks',
    activeKiosks: 4
  },
  {
    id: 'tsinghua',
    name: 'Tsinghua University',
    shortName: 'Tsinghua',
    city: 'Beijing',
    country: 'China',
    regionId: 'asia',
    lat: 40.0000,
    lng: 116.3267,
    allTimeKg: 5890.0,
    weeklyKg: 180.3,
    sponsorId: 'intel',
    topRecycledItem: 'Printed Circuit Boards (PCBs)',
    activeKiosks: 5
  },
  {
    id: 'eth-zurich',
    name: 'ETH Zurich',
    shortName: 'ETH Zurich',
    city: 'Zurich',
    country: 'Switzerland',
    regionId: 'europe',
    lat: 47.3763,
    lng: 8.5480,
    allTimeKg: 4920.6,
    weeklyKg: 165.8,
    sponsorId: 'google',
    topRecycledItem: 'Optoelectronic Sensors',
    activeKiosks: 4
  },
  {
    id: 'nus',
    name: 'National University of Singapore',
    shortName: 'NUS',
    city: 'Singapore',
    country: 'Singapore',
    regionId: 'asia',
    lat: 1.2966,
    lng: 103.7764,
    allTimeKg: 4150.0,
    weeklyKg: 130.2,
    sponsorId: 'dell',
    topRecycledItem: 'Ultrabook Batteries & Hubs',
    activeKiosks: 3
  },
  {
    id: 'tokyo',
    name: 'University of Tokyo',
    shortName: 'Univ. of Tokyo',
    city: 'Tokyo',
    country: 'Japan',
    regionId: 'asia',
    lat: 35.7128,
    lng: 139.7620,
    allTimeKg: 3780.4,
    weeklyKg: 115.6,
    sponsorId: 'tesla',
    topRecycledItem: 'Precision Lithium-Polymer Cells',
    activeKiosks: 4
  },
  {
    id: 'tu-delft',
    name: 'TU Delft',
    shortName: 'TU Delft',
    city: 'Delft',
    country: 'Netherlands',
    regionId: 'europe',
    lat: 52.0022,
    lng: 4.3736,
    allTimeKg: 3240.2,
    weeklyKg: 98.4,
    sponsorId: 'dell',
    topRecycledItem: 'Aeronautic Harnesses & Cables',
    activeKiosks: 3
  },
  {
    id: 'kiit',
    name: 'KIIT University',
    shortName: 'KIIT',
    city: 'Bhubaneswar',
    country: 'India',
    regionId: 'asia',
    lat: 20.3533,
    lng: 85.8194,
    allTimeKg: 2850.7,
    weeklyKg: 142.8,
    sponsorId: 'tcs',
    topRecycledItem: 'Mechanical Keyboards & Adapters',
    activeKiosks: 5
  },
  {
    id: 'nsut',
    name: 'Netaji Subhas University of Technology',
    shortName: 'NSUT',
    city: 'Delhi',
    country: 'India',
    regionId: 'asia',
    lat: 28.6091,
    lng: 77.0351,
    allTimeKg: 2410.0,
    weeklyKg: 148.6, // Holds weekly lead over DTU by 1.5 kg
    sponsorId: 'infosys',
    topRecycledItem: 'Dorm Chargers & Obsolete Androids',
    activeKiosks: 3
  },
  {
    id: 'vit',
    name: 'Vellore Institute of Technology',
    shortName: 'VIT',
    city: 'Vellore',
    country: 'India',
    regionId: 'asia',
    lat: 12.9692,
    lng: 79.1559,
    allTimeKg: 1920.5,
    weeklyKg: 139.4,
    sponsorId: 'tata',
    topRecycledItem: 'Old External Hard Drives & Cables',
    activeKiosks: 4
  },
  {
    id: 'sydney',
    name: 'University of Sydney',
    shortName: 'Univ. of Sydney',
    city: 'Sydney',
    country: 'Australia',
    regionId: 'oceania',
    lat: -33.8886,
    lng: 151.1873,
    allTimeKg: 1540.3,
    weeklyKg: 78.5,
    sponsorId: 'apple',
    topRecycledItem: 'Tablet Screens & Smartwatches',
    activeKiosks: 3
  },
  {
    id: 'mcgill',
    name: 'McGill University',
    shortName: 'McGill',
    city: 'Montreal',
    country: 'Canada',
    regionId: 'north-america',
    lat: 45.5048,
    lng: -73.5772,
    allTimeKg: 1230.8,
    weeklyKg: 62.0,
    sponsorId: 'dell',
    topRecycledItem: 'Audio Equipment & DACs',
    activeKiosks: 2
  },
  {
    id: 'cape-town',
    name: 'University of Cape Town',
    shortName: 'Univ. of Cape Town',
    city: 'Cape Town',
    country: 'South Africa',
    regionId: 'africa',
    lat: -33.9576,
    lng: 18.4610,
    allTimeKg: 840.4,
    weeklyKg: 45.0,
    sponsorId: 'tesla',
    topRecycledItem: 'Solar Charge Controllers & Inverters',
    activeKiosks: 2
  },
  {
    id: 'usp',
    name: 'Universidade de São Paulo',
    shortName: 'USP Brazil',
    city: 'São Paulo',
    country: 'Brazil',
    regionId: 'south-america',
    lat: -23.5558,
    lng: -46.7297,
    allTimeKg: 620.0,
    weeklyKg: 38.2,
    sponsorId: 'google',
    topRecycledItem: 'Mobile Phones & Network Switches',
    activeKiosks: 2
  }
]
