import * as THREE from 'three'

/**
 * Geographic Coordinate Conversion Utilities
 * Adapted from shehzadres/Webgl-Data-Globe (MIT)
 */

export const GLOBE_RADIUS = 3.0
const DEG2RAD = Math.PI / 180

/**
 * Convert lat/lng to 3D Cartesian coordinates on the globe surface.
 * Standard geographic mapping:
 *   phi   = (90 - lat) * DEG2RAD   (polar angle from Y-up)
 *   theta = (lng + 180) * DEG2RAD (azimuth angle)
 */
export function geoToVector3(
  lat: number,
  lng: number,
  radius: number = GLOBE_RADIUS,
  elevation = 0,
  out?: THREE.Vector3
): THREE.Vector3 {
  const r = radius + elevation
  const phi = (90 - lat) * DEG2RAD
  const theta = (lng + 180) * DEG2RAD

  const result = out ?? new THREE.Vector3()
  // Three.js spherical coords: radius, phi (polar from +Y), theta (azimuth from +Z)
  result.x = -r * Math.sin(phi) * Math.cos(theta)
  result.y = r * Math.cos(phi)
  result.z = r * Math.sin(phi) * Math.sin(theta)

  return result
}

/**
 * Surface normal unit vector pointing outwards from Earth center
 */
export function geoNormal(lat: number, lng: number, out?: THREE.Vector3): THREE.Vector3 {
  const v = geoToVector3(lat, lng, 1.0, 0, out)
  return v.normalize()
}

/**
 * Quaternion orienting an object whose default axis is +Y outward along the surface normal
 */
export function geoOrientation(lat: number, lng: number, out?: THREE.Quaternion): THREE.Quaternion {
  const normal = geoNormal(lat, lng)
  const up = new THREE.Vector3(0, 1, 0)
  const q = out ?? new THREE.Quaternion()
  q.setFromUnitVectors(up, normal)
  return q
}

/**
 * Generate a 3D curved arc between two points along the great circle,
 * lofting above the surface based on the distance between the two points.
 */
export function createGreatCircleArc(
  p1: { lat: number; lng: number },
  p2: { lat: number; lng: number },
  globeRadius: number = GLOBE_RADIUS,
  numPoints: number = 60
): { points: THREE.Vector3[]; distance: number } {
  const v1 = geoToVector3(p1.lat, p1.lng, globeRadius)
  const v2 = geoToVector3(p2.lat, p2.lng, globeRadius)

  const distance = v1.distanceTo(v2)
  const midPoint = v1.clone().add(v2).multiplyScalar(0.5)

  // Loft altitude proportional to chord distance
  const maxAltitude = Math.min(1.8, distance * 0.35)
  const midNormal = midPoint.clone().normalize()
  const apex = midNormal.multiplyScalar(globeRadius + maxAltitude)

  // Quadratic bezier interpolation: (1-t)^2 * v1 + 2(1-t)t * apex + t^2 * v2
  const points: THREE.Vector3[] = []
  for (let i = 0; i <= numPoints; i++) {
    const t = i / numPoints
    const invT = 1 - t
    const p = new THREE.Vector3()
      .addScaledVector(v1, invT * invT)
      .addScaledVector(apex, 2 * invT * t)
      .addScaledVector(v2, t * t)
    points.push(p)
  }

  return { points, distance }
}
