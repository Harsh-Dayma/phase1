import React, { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import type { RankedCampus } from '../../shared/ranking'
import { createGreatCircleArc, GLOBE_RADIUS } from '../../utils/geo'
import arcVert from '../../shaders/arc.vert.glsl'
import arcFrag from '../../shaders/arc.frag.glsl'

interface LightArcsProps {
  campuses: RankedCampus[]
  selectedCampusId?: string | null
  boostTrigger?: number
}

export const LightArcs: React.FC<LightArcsProps> = ({
  campuses,
  selectedCampusId,
  boostTrigger = 0
}) => {
  // Take top 5 campuses
  const topCampuses = useMemo(() => {
    return [...campuses]
      .sort((a, b) => a.allTimeRank - b.allTimeRank)
      .slice(0, 5)
  }, [campuses])

  // Pairs between top campuses
  const arcPairs = useMemo(() => {
    if (topCampuses.length < 2) return []
    const pairs: [RankedCampus, RankedCampus][] = []

    const c1 = topCampuses[0]
    const c2 = topCampuses[1]
    const c3 = topCampuses[2]
    const c4 = topCampuses[3]
    const c5 = topCampuses[4]

    if (c1 && c2) pairs.push([c1, c2])
    if (c1 && c4) pairs.push([c1, c4])
    if (c2 && c3) pairs.push([c2, c3])
    if (c3 && c5) pairs.push([c3, c5])
    if (c4 && c5) pairs.push([c4, c5])

    // If selected campus is outside top 5, add an active circularity arc to #1 campus
    if (selectedCampusId && c1) {
      const selected = campuses.find((c) => c.id === selectedCampusId)
      if (selected && !topCampuses.some((tc) => tc.id === selected.id)) {
        pairs.push([selected, c1])
      }
    }

    return pairs
  }, [topCampuses, selectedCampusId, campuses])

  return (
    <group>
      {arcPairs.map(([from, to], i) => {
        const isHighlighted =
          selectedCampusId === from.id || selectedCampusId === to.id

        return (
          <SingleArc
            key={`${from.id}-${to.id}-${i}`}
            from={from}
            to={to}
            index={i}
            isHighlighted={isHighlighted}
            boostTrigger={boostTrigger}
          />
        )
      })}
    </group>
  )
}

interface SingleArcProps {
  from: RankedCampus
  to: RankedCampus
  index: number
  isHighlighted?: boolean
  boostTrigger?: number
}

const SingleArc: React.FC<SingleArcProps> = ({
  from,
  to,
  index,
  isHighlighted = false,
  boostTrigger = 0
}) => {
  const drawProgress = useRef(0)
  const boostSurge = useRef(0)
  const lastBoostTrigger = useRef(boostTrigger)
  const simulatedTime = useRef(0)

  // Listen for boost triggers on connected campuses
  useMemo(() => {
    if (isHighlighted && boostTrigger !== lastBoostTrigger.current && boostTrigger > 0) {
      boostSurge.current = 1.0
      lastBoostTrigger.current = boostTrigger
    }
  }, [boostTrigger, isHighlighted])

  // Pre-generate curve points along great circle
  const { geometry } = useMemo(() => {
    const { points } = createGreatCircleArc(
      { lat: from.lat, lng: from.lng },
      { lat: to.lat, lng: to.lng },
      GLOBE_RADIUS,
      64
    )

    const geom = new THREE.BufferGeometry().setFromPoints(points)
    const progressArr = new Float32Array(points.length)
    for (let i = 0; i < points.length; i++) {
      progressArr[i] = i / (points.length - 1)
    }
    geom.setAttribute('aProgress', new THREE.BufferAttribute(progressArr, 1))
    return { geometry: geom }
  }, [from, to])

  // Arc Shader Material
  const arcMaterial = useMemo(() => {
    const color = isHighlighted
      ? new THREE.Color('#30D158')
      : index % 2 === 0
      ? new THREE.Color('#10B981')
      : new THREE.Color('#38BDF8')

    return new THREE.ShaderMaterial({
      vertexShader: arcVert,
      fragmentShader: arcFrag,
      uniforms: {
        uColor: { value: color },
        uTime: { value: 0 },
        uDrawRange: { value: 0.0 }
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })
  }, [index, isHighlighted])

  // Three.js Line object wrapped in primitive
  const lineObject = useMemo(() => {
    return new THREE.Line(geometry, arcMaterial)
  }, [geometry, arcMaterial])

  useFrame((_, delta) => {
    if (arcMaterial) {
      if (boostSurge.current > 0) {
        boostSurge.current = Math.max(0, boostSurge.current - delta * 0.7)
      }

      // Accelerate photon speed when highlighted or boosted
      const speedMultiplier = 1.0 + (isHighlighted ? 0.8 : 0) + boostSurge.current * 4.0
      simulatedTime.current += delta * speedMultiplier
      arcMaterial.uniforms.uTime.value = simulatedTime.current

      // Draw range progressive reveal on entrance
      if (drawProgress.current < 1.0) {
        drawProgress.current = Math.min(1.0, drawProgress.current + delta * 0.8)
        arcMaterial.uniforms.uDrawRange.value = drawProgress.current
      }
    }
  })

  return <primitive object={lineObject} />
}
