export interface Region {
  id: string
  name: string
  lat: number
  lng: number
  zoomRadius: number
  campusCount: number
}

export const REGIONS: Region[] = [
  {
    id: 'asia',
    name: 'Asia',
    lat: 24.5,
    lng: 82.0,
    zoomRadius: 5.5,
    campusCount: 8
  },
  {
    id: 'europe',
    name: 'Europe',
    lat: 49.5,
    lng: 8.5,
    zoomRadius: 5.2,
    campusCount: 3
  },
  {
    id: 'north-america',
    name: 'North America',
    lat: 39.0,
    lng: -98.0,
    zoomRadius: 5.4,
    campusCount: 3
  },
  {
    id: 'oceania',
    name: 'Oceania',
    lat: -30.0,
    lng: 140.0,
    zoomRadius: 5.8,
    campusCount: 1
  },
  {
    id: 'south-america',
    name: 'South America',
    lat: -20.0,
    lng: -55.0,
    zoomRadius: 5.6,
    campusCount: 1
  },
  {
    id: 'africa',
    name: 'Africa',
    lat: -15.0,
    lng: 25.0,
    zoomRadius: 5.8,
    campusCount: 1
  }
]
