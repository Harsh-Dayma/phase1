import { SPONSORS, type Sponsor } from './sponsors'

export interface CollectionDataPoint {
  period: string       // e.g. 'Oct W1', 'Oct W2', 'Nov W1'
  kg: number           // e.g. 145.2 kg
  cumulativeKg: number // e.g. 1820.5 kg
  devicesCount: number // e.g. 48 units
  co2OffsetKg: number  // e.g. 312.4 kg
  milestone?: string   // e.g. 'CSR Tier 1 Met'
}

export interface SponsorVisualTheme {
  primaryColor: string
  accentColor: string
  secondaryColor: string
  badgeBg: string
  patternType: 'circuit' | 'carbon-weave' | 'silicon-die' | 'solar-mesh' | 'clean-grid' | 'hex-matrix'
  tagline: string
  esgPledge: string
  svgMotif: 'chip' | 'leaf-orbit' | 'processor' | 'grid-arrow' | 'infinity-loop' | 'clean-stack'
}

export const SPONSOR_THEMES: Record<string, SponsorVisualTheme> = {
  google: {
    primaryColor: '#06B6D4',
    accentColor: '#38BDF8',
    secondaryColor: '#4ADE80',
    badgeBg: 'rgba(6, 182, 212, 0.15)',
    patternType: 'clean-grid',
    tagline: 'Circular Electronics & Net-Zero Cloud Infrastructure',
    esgPledge: '100% Carbon-Free Energy 24/7 By 2030',
    svgMotif: 'infinity-loop'
  },
  apple: {
    primaryColor: '#F8FAFC',
    accentColor: '#94A3B8',
    secondaryColor: '#30D158',
    badgeBg: 'rgba(248, 250, 252, 0.15)',
    patternType: 'carbon-weave',
    tagline: 'Apple 2030: 100% Recycled Rare-Earth Magnets & Aluminum',
    esgPledge: 'Net-Zero Product Carbon Footprint by 2030',
    svgMotif: 'leaf-orbit'
  },
  intel: {
    primaryColor: '#0284C7',
    accentColor: '#38BDF8',
    secondaryColor: '#818CF8',
    badgeBg: 'rgba(2, 132, 199, 0.15)',
    patternType: 'silicon-die',
    tagline: 'RISE 2030: Closed-Loop Semiconductor Fabrication Recovery',
    esgPledge: 'Zero Waste to Landfill Globally',
    svgMotif: 'chip'
  },
  tcs: {
    primaryColor: '#10B981',
    accentColor: '#34D399',
    secondaryColor: '#06B6D4',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    patternType: 'circuit',
    tagline: 'Zero-Waste Campus Drive & Sustainable Enterprise Infrastructure',
    esgPledge: '70% Scope 1 & 2 Decarbonization Target',
    svgMotif: 'processor'
  },
  tata: {
    primaryColor: '#3B82F6',
    accentColor: '#60A5FA',
    secondaryColor: '#10B981',
    badgeBg: 'rgba(59, 130, 246, 0.15)',
    patternType: 'hex-matrix',
    tagline: 'Project Aalingana — Circular Economy Ecosystem Across Bharat',
    esgPledge: 'Net-Zero GHG Emissions by 2045',
    svgMotif: 'clean-stack'
  },
  infosys: {
    primaryColor: '#F59E0B',
    accentColor: '#FBBF24',
    secondaryColor: '#F97316',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    patternType: 'solar-mesh',
    tagline: 'Carbon Neutral Campus Operations & E-Waste Stewardship',
    esgPledge: '100% Renewable Sourcing for Facilities',
    svgMotif: 'grid-arrow'
  },
  dell: {
    primaryColor: '#0EA5E9',
    accentColor: '#7DD3FC',
    secondaryColor: '#38BDF8',
    badgeBg: 'rgba(14, 165, 233, 0.15)',
    patternType: 'clean-grid',
    tagline: 'Moonshot 2030: Recycle an Equivalent Product for Every Purchase',
    esgPledge: 'Over 50% Product Content from Recycled Materials',
    svgMotif: 'chip'
  },
  tesla: {
    primaryColor: '#EF4444',
    accentColor: '#F87171',
    secondaryColor: '#F59E0B',
    badgeBg: 'rgba(239, 68, 68, 0.15)',
    patternType: 'carbon-weave',
    tagline: 'Closed-Loop Battery Material Recovery & Raw Nickel Extraction',
    esgPledge: 'Zero Cell Raw Materials Discarded to Landfills',
    svgMotif: 'infinity-loop'
  }
}

// Generate realistic deterministic 6-period e-waste collection trajectory for each campus
export function generateCampusCollectionHistory(
  allTimeKg: number,
  weeklyKg: number
): CollectionDataPoint[] {
  const periods = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct (Live)']
  // Progressive growth weights over 6 months
  const factors = [0.11, 0.14, 0.16, 0.18, 0.20, 0.21]
  
  let runningTotal = Math.max(200, allTimeKg * 0.45)
  const data: CollectionDataPoint[] = []

  for (let i = 0; i < periods.length; i++) {
    const isCurrent = i === periods.length - 1
    const periodWeight = isCurrent ? weeklyKg * 4.2 : allTimeKg * factors[i]
    runningTotal += periodWeight

    data.push({
      period: periods[i],
      kg: parseFloat(periodWeight.toFixed(1)),
      cumulativeKg: parseFloat(runningTotal.toFixed(1)),
      devicesCount: Math.round(periodWeight / 3.8),
      co2OffsetKg: parseFloat((periodWeight * 2.14).toFixed(1)),
      milestone: i === 2 ? 'Kiosk Expansion' : i === 4 ? 'Regional Derby Peak' : undefined
    })
  }

  return data
}
