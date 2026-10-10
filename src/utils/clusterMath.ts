import * as THREE from 'three'
import type { RankedCampus } from '../shared/ranking'
import { geoToVector3, GLOBE_RADIUS } from './geo'

export interface CampusCluster {
  id: string
  centerLat: number
  centerLng: number
  centerPosition: THREE.Vector3
  campuses: RankedCampus[]
  totalAllTimeKg: number
  totalWeeklyKg: number
  dominantSponsorId: string
  topCampus: RankedCampus
}

export interface ClusteredCampusView {
  clusters: CampusCluster[]
  soloCampuses: RankedCampus[]
}

/**
 * Computes geographic clusters using spherical angular distance (haversine / chord distance).
 * @param campuses Array of ranked campuses
 * @param angularThresholdDeg Max angular distance (degrees) to merge into a cluster
 */
export function clusterCampusesByProximity(
  campuses: RankedCampus[],
  angularThresholdDeg: number
): ClusteredCampusView {
  if (campuses.length === 0) {
    return { clusters: [], soloCampuses: [] }
  }

  // Convert angular threshold into 3D chord distance on sphere of radius GLOBE_RADIUS
  // chord = 2 * R * sin(theta / 2)
  const thetaRad = (angularThresholdDeg * Math.PI) / 180
  const maxChordDist = 2 * GLOBE_RADIUS * Math.sin(thetaRad / 2)

  const unassigned = [...campuses]
  const clusters: CampusCluster[] = []
  const soloCampuses: RankedCampus[] = []

  while (unassigned.length > 0) {
    const seed = unassigned.shift()!
    const seedPos = geoToVector3(seed.lat, seed.lng, GLOBE_RADIUS)

    const group: RankedCampus[] = [seed]

    // Find all unassigned campuses within chord threshold
    for (let i = unassigned.length - 1; i >= 0; i--) {
      const candidate = unassigned[i]
      const candPos = geoToVector3(candidate.lat, candidate.lng, GLOBE_RADIUS)

      if (seedPos.distanceTo(candPos) <= maxChordDist) {
        group.push(candidate)
        unassigned.splice(i, 1)
      }
    }

    if (group.length > 1) {
      // Multiple campuses: create cluster
      // Sort group by all-time rank
      group.sort((a, b) => a.allTimeRank - b.allTimeRank)

      // Compute centroid in lat/lng
      let sumLat = 0
      let sumLng = 0
      let totalAllTime = 0
      let totalWeekly = 0

      group.forEach((c) => {
        sumLat += c.lat
        sumLng += c.lng
        totalAllTime += c.allTimeKg
        totalWeekly += c.weeklyKg
      })

      const centerLat = sumLat / group.length
      const centerLng = sumLng / group.length
      const centerPosition = geoToVector3(centerLat, centerLng, GLOBE_RADIUS)

      clusters.push({
        id: `cluster-${group.map((c) => c.id).join('-')}`,
        centerLat,
        centerLng,
        centerPosition,
        campuses: group,
        totalAllTimeKg: totalAllTime,
        totalWeeklyKg: totalWeekly,
        dominantSponsorId: group[0].sponsorId,
        topCampus: group[0]
      })
    } else {
      soloCampuses.push(seed)
    }
  }

  return { clusters, soloCampuses }
}

/**
 * Calculates radial separation offsets for an exploded view of campuses in a cluster.
 * Arranges them in a circular fan-out pattern around the cluster centroid.
 */
export function getExplodedOffsets(
  campuses: RankedCampus[],
  separationRadius: number = 0.22
): Map<string, THREE.Vector3> {
  const map = new Map<string, THREE.Vector3>()
  const n = campuses.length
  if (n <= 1) return map

  const angleStep = (Math.PI * 2) / n

  campuses.forEach((campus, index) => {
    const angle = index * angleStep
    // Tangential offset vector
    const offset = new THREE.Vector3(
      Math.cos(angle) * separationRadius,
      0,
      Math.sin(angle) * separationRadius
    )
    map.set(campus.id, offset)
  })

  return map
}
