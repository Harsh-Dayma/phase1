import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Layers, ChevronRight, MapPin, Sparkles } from 'lucide-react'
import { useWorldStore } from '../../store/useWorldStore'
import { SPONSOR_MAP } from '../../data/sponsors'

export const ClusterSelectionPopover: React.FC = () => {
  const { activeCluster, setActiveCluster, selectCampus } = useWorldStore()

  if (!activeCluster) return null

  const sponsor = SPONSOR_MAP.get(activeCluster.dominantSponsorId)

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
        {/* Subtle Backdrop Dismissal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto"
          onClick={() => setActiveCluster(null)}
        />

        {/* Apple Vision Pro Liquid Glass Cluster Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 15 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-sm liquid-glass specular-rim p-5 pointer-events-auto shadow-liquid-glass"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald/20 border border-emerald/40 flex items-center justify-center text-emerald">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-text-primary tracking-tight">
                    Regional Campus Cluster
                  </h3>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-white/10 text-emerald font-bold">
                    {activeCluster.campuses.length} HUBS
                  </span>
                </div>
                <p className="text-[10px] text-text-muted font-mono">
                  {Math.round(activeCluster.totalAllTimeKg).toLocaleString()} kg Verified Diversion
                </p>
              </div>
            </div>

            <button
              onClick={() => setActiveCluster(null)}
              className="w-7 h-7 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors liquid-glass-control"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Subtitle instructions */}
          <p className="text-[11px] text-text-secondary mt-3 mb-2 leading-relaxed">
            Select an individual institution to fly the camera into its dedicated sponsor-branded 3D tower:
          </p>

          {/* Campus List Items */}
          <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1 no-scrollbar">
            {activeCluster.campuses.map((campus) => {
              const campSponsor = SPONSOR_MAP.get(campus.sponsorId)

              return (
                <button
                  key={campus.id}
                  onClick={() => {
                    selectCampus(campus.id)
                    setActiveCluster(null)
                  }}
                  className="w-full text-left p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-white/20 transition-all duration-200 flex items-center justify-between group liquid-glass-control"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="font-mono text-xs font-bold text-emerald w-6 shrink-0">
                      #{campus.allTimeRank}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-text-primary truncate group-hover:text-emerald transition-colors">
                        {campus.name}
                      </p>
                      <div className="flex items-center gap-1.5 text-[10px] text-text-muted mt-0.5">
                        <span className="flex items-center gap-0.5">
                          <MapPin className="w-2.5 h-2.5 text-cyan" />
                          {campus.city}
                        </span>
                        {campSponsor && (
                          <>
                            <span>•</span>
                            <span style={{ color: campSponsor.color }}>
                              {campSponsor.logoText}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0 pl-2 flex items-center gap-1.5">
                    <div>
                      <span className="font-mono text-xs font-bold text-text-primary block">
                        {Math.round(campus.allTimeKg).toLocaleString()}
                        <span className="text-[9px] text-text-muted font-normal ml-0.5">kg</span>
                      </span>
                      <span className="text-[9px] text-cyan-light font-mono block">
                        +{campus.weeklyKg.toFixed(0)}w
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-text-primary group-hover:translate-x-0.5 transition-all" />
                  </div>
                </button>
              )
            })}
          </div>

          {/* Footer note */}
          <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[10px] text-text-muted font-mono">
            <span>ZOOM LEVEL: REGIONAL</span>
            <span className="text-emerald">CLICK TO EXPAND TOWER</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
