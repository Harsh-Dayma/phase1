import React, { useEffect } from 'react'
import { SiliconSchematicBackground } from './components/ui/SiliconSchematicBackground'
import { WorldScene } from './components/world/WorldScene'
import { TopNav } from './components/ui/TopNav'
import { TopTenDrawer } from './components/ui/TopTenDrawer'
import { WeeklyDerbyTicker } from './components/ui/WeeklyDerbyTicker'
import { CampusInspectionCard } from './components/ui/CampusInspectionCard'
import { Modals } from './components/ui/Modals'
import { ClusterSelectionPopover } from './components/ui/ClusterSelectionPopover'
import { ScrollStorySections } from './components/ui/ScrollStorySections'
import { ScrollProgressHUD } from './components/ui/ScrollProgressHUD'
import { useWorldStore } from './store/useWorldStore'
import { useLenis } from './hooks/useLenis'

export const App: React.FC = () => {
  const { loadData } = useWorldStore()

  // Initialize Lenis smooth scroll engine
  useLenis()

  useEffect(() => {
    loadData()
  }, [loadData])

  return (
    <div className="relative min-h-screen bg-background select-none overflow-x-hidden">
      {/* 0. Sub-Silicon Schematic Void & Reclaimed Material Core (Pinned) */}
      <SiliconSchematicBackground />

      {/* 1. 3D WebGL World Canvas (Pinned) */}
      <WorldScene />

      {/* 2. Scroll Story Narrative Chapters (5 Cinematic Stages) */}
      <ScrollStorySections />

      {/* 3. Top Navigation Bar (Fixed Spatial Header) */}
      <TopNav />

      {/* 4. Orbital Progress HUD (Fixed Chapter Navigator & Zoom Controls) */}
      <ScrollProgressHUD />

      {/* 5. Left Collapsible Top 10 Leaderboard */}
      <TopTenDrawer />

      {/* 6. Bottom Weekly Derby Ticker: DTU vs NSUT */}
      <WeeklyDerbyTicker />

      {/* 7. Right Campus Inspection Detail Card */}
      <CampusInspectionCard />

      {/* 8. Cluster Selection Popover for dense regional campus groups */}
      <ClusterSelectionPopover />

      {/* 9. Modals (Recycle, Sponsor Pitch, Vault, Learn) */}
      <Modals />
    </div>
  )
}

export default App
