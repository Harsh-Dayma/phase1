import type { Campus } from '../data/campuses'
import type { Sponsor } from '../data/sponsors'

export interface RankedCampus extends Campus {
  allTimeRank: number
  weeklyRank: number
  towerHeight: number // computed scaled height for 3D world
  tier: 'emerald' | 'amber' | 'slate'
}

export interface RankedSponsor extends Sponsor {
  rank: number
  totalKg: number
  campusCount: number
  towerHeight: number
}

// Tower Height Formula:
// height = minH + k * Math.pow(kg, 0.5), clamped
// So #1 is clearly tallest, but smallest campuses stay visible.
const MIN_TOWER_HEIGHT = 0.35
const MAX_TOWER_HEIGHT = 2.4
const TOWER_SCALE_K = 0.0135

export function computeTowerHeight(kg: number): number {
  const h = MIN_TOWER_HEIGHT + TOWER_SCALE_K * Math.pow(Math.max(0, kg), 0.5)
  return Math.min(MAX_TOWER_HEIGHT, Math.max(MIN_TOWER_HEIGHT, h))
}

export function computeSponsorTowerHeight(totalKg: number): number {
  const minH = 0.5
  const maxH = 4.0
  const k = 0.018
  const h = minH + k * Math.pow(Math.max(0, totalKg), 0.5)
  return Math.min(maxH, Math.max(minH, h))
}

/**
 * Pure function to compute all-time and weekly ranks.
 * Ranks are ALWAYS 1-indexed and strictly sorted descending by raw kg.
 */
export function computeCampusRankings(campuses: Campus[]): RankedCampus[] {
  // Sort by allTimeKg descending
  const sortedByAllTime = [...campuses].sort((a, b) => b.allTimeKg - a.allTimeKg)
  const allTimeRankMap = new Map<string, number>()
  sortedByAllTime.forEach((c, index) => {
    allTimeRankMap.set(c.id, index + 1)
  })

  // Sort by weeklyKg descending
  const sortedByWeekly = [...campuses].sort((a, b) => b.weeklyKg - a.weeklyKg)
  const weeklyRankMap = new Map<string, number>()
  sortedByWeekly.forEach((c, index) => {
    weeklyRankMap.set(c.id, index + 1)
  })

  return sortedByAllTime.map((c) => {
    const allTimeRank = allTimeRankMap.get(c.id) ?? 1
    const weeklyRank = weeklyRankMap.get(c.id) ?? 1
    const towerHeight = computeTowerHeight(c.allTimeKg)

    // Tiering: top 3 emerald/cyan, mid 4-10 amber, small 11+ slate-blue
    let tier: 'emerald' | 'amber' | 'slate' = 'slate'
    if (allTimeRank <= 3) tier = 'emerald'
    else if (allTimeRank <= 10) tier = 'amber'

    return {
      ...c,
      allTimeRank,
      weeklyRank,
      towerHeight,
      tier
    }
  })
}

/**
 * Pure function to compute sponsor totals and rankings.
 * Sponsor total = sum of linked campus allTimeKg.
 */
export function computeSponsorRankings(
  sponsors: Sponsor[],
  campuses: Campus[]
): RankedSponsor[] {
  const totals = new Map<string, { totalKg: number; count: number }>()
  
  campuses.forEach((c) => {
    const existing = totals.get(c.sponsorId) ?? { totalKg: 0, count: 0 }
    totals.set(c.sponsorId, {
      totalKg: existing.totalKg + c.allTimeKg,
      count: existing.count + 1
    })
  })

  const withTotals = sponsors.map((s) => {
    const data = totals.get(s.id) ?? { totalKg: 0, count: 0 }
    return {
      ...s,
      totalKg: parseFloat(data.totalKg.toFixed(1)),
      campusCount: data.count,
      towerHeight: computeSponsorTowerHeight(data.totalKg)
    }
  })

  withTotals.sort((a, b) => b.totalKg - a.totalKg)

  return withTotals.map((s, index) => ({
    ...s,
    rank: index + 1
  }))
}
