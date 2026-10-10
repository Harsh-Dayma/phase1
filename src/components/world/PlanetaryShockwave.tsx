import React, { useRef, useEffect, useMemo } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useWorldStore } from '../../store/useWorldStore'
import { geoToVector3, geoOrientation, GLOBE_RADIUS } from '../../utils/geo'
import { SPONSOR_MAP } from '../../data/sponsors'

export const PlanetaryShockwave: React.FC = () => {
  const { boostEffectTrigger, selectedCampusId, campuses } = useWorldStore()
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const progressRef = useRef(1.0) // 1.0 = inactive, 0.0 = start
  const lastTriggerRef = useRef(boostEffectTrigger)

  const activeCampus = campuses.find((c) => c.id === selectedCampusId)
  const sponsor = activeCampus ? SPONSOR_MAP.get(activeCampus.sponsorId) : null
  const pulseColor = sponsor?.color || '#30D158'

  useEffect(() => {
    if (boostEffectTrigger !== lastTriggerRef.current && activeCampus) {
      lastTriggerRef.current = boostEffectTrigger
      progressRef.current = 0.0 // trigger expanding shockwave
    }
  }, [boostEffectTrigger, activeCampus])

  const transform = useMemo(() => {
    if (!activeCampus) return null
    const pos = geoToVector3(activeCampus.lat, activeCampus.lng, GLOBE_RADIUS * 1.002)
    const quat = geoOrientation(activeCampus.lat, activeCampus.lng)
    return { pos, quat }
  }, [activeCampus])

  useFrame((_, delta) => {
    if (progressRef.current < 1.0) {
      progressRef.current = Math.min(1.0, progressRef.current + delta * 0.65)
      const p = progressRef.current
      // Apple cubic-bezier ease out
      const ease1 = 1 - Math.pow(1 - p, 3)

      if (ring1Ref.current) {
        const s1 = 0.2 + ease1 * 3.4
        ring1Ref.current.scale.set(s1, s1, s1)
        const mat = ring1Ref.current.material as THREE.MeshBasicMaterial
        mat.opacity = Math.max(0, (1 - p) * 0.9)
      }

      if (ring2Ref.current) {
        const p2 = Math.max(0, p - 0.12) / 0.88
        const ease2 = 1 - Math.pow(1 - p2, 3)
        const s2 = 0.15 + ease2 * 2.6
        ring2Ref.current.scale.set(s2, s2, s2)
        const mat2 = ring2Ref.current.material as THREE.MeshBasicMaterial
        mat2.opacity = Math.max(0, (1 - p2) * 0.65)
      }
    } else {
      if (ring1Ref.current) {
        ;(ring1Ref.current.material as THREE.MeshBasicMaterial).opacity = 0
      }
      if (ring2Ref.current) {
        ;(ring2Ref.current.material as THREE.MeshBasicMaterial).opacity = 0
      }
    }
  })

  if (!transform) return null

  return (
    <group position={transform.pos} quaternion={transform.quat}>
      {/* Primary Expanding Shockwave Ring */}
      <mesh ref={ring1Ref} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.08, 0.15, 48]} />
        <meshBasicMaterial
          color={pulseColor}
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Secondary Lagging Ripple */}
      <mesh ref={ring2Ref} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.05, 0.10, 48]} />
        <meshBasicMaterial
          color="#FFFFFF"
          transparent
          opacity={0}
          side={THREE.DoubleSide}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
