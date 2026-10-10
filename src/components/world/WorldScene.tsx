import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Earth } from './Earth'
import { CampusTowers } from './CampusTowers'
import { LightArcs } from './LightArcs'
import { PlanetaryShockwave } from './PlanetaryShockwave'
import { SponsorSkyline } from './SponsorSkyline'
import { CameraController } from './CameraController'
import { useWorldStore } from '../../store/useWorldStore'

export const WorldScene: React.FC = () => {
  const {
    viewMode,
    campuses,
    sponsors,
    selectedCampusId,
    selectedSponsorId,
    selectCampus,
    selectSponsor,
    openModal,
    quality,
    boostEffectTrigger
  } = useWorldStore()

  return (
    <div className="fixed inset-0 w-full h-full bg-transparent overflow-hidden pointer-events-auto z-0">
      <Canvas
        camera={{ fov: 42, near: 0.1, far: 500 }}
        dpr={quality === 'high' ? Math.min(2, window.devicePixelRatio) : 1}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true
        }}
      >
        {/* Soft atmospheric depth lighting calibrated to silicon & reclaimed copper */}
        <ambientLight intensity={0.65} color="#38434F" />
        <directionalLight position={[7, 4, 5]} intensity={1.9} color="#FFF8EB" castShadow />
        <directionalLight position={[-6, -3, -5]} intensity={0.45} color="#0D9488" />

        <Suspense fallback={null}>
          <CameraController />

          {viewMode === 'globe' ? (
            <group>
              <Earth autoRotate={false} />
              <CampusTowers
                campuses={campuses}
                selectedCampusId={selectedCampusId}
                onSelectCampus={selectCampus}
                boostTrigger={boostEffectTrigger}
              />
              <LightArcs
                campuses={campuses}
                selectedCampusId={selectedCampusId}
                boostTrigger={boostEffectTrigger}
              />
              <PlanetaryShockwave />
            </group>
          ) : (
            <SponsorSkyline
              sponsors={sponsors}
              selectedSponsorId={selectedSponsorId}
              onSelectSponsor={selectSponsor}
              onOpenPitch={() => openModal('sponsor_pitch')}
            />
          )}

          {/* Postprocessing Bloom for Glowing Towers and Atmosphere */}
          {quality === 'high' && (
            <EffectComposer enableNormalPass={false}>
              <Bloom
                luminanceThreshold={0.65}
                luminanceSmoothing={0.3}
                intensity={1.25}
                mipmapBlur
              />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  )
}
