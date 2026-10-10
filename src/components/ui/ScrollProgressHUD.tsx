import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ZoomIn, ZoomOut } from 'lucide-react'
import { useWorldStore } from '../../store/useWorldStore'

const CHAPTER_LABELS = [
  { id: 0, tag: '01', title: 'Genesis' },
  { id: 1, tag: '02', title: 'The Crisis' },
  { id: 2, tag: '03', title: 'Sponsor Beacons' },
  { id: 3, tag: '04', title: 'Live Hub' },
  { id: 4, tag: '05', title: 'Circular OS' }
]

export const ScrollProgressHUD: React.FC = () => {
  const {
    activeChapter,
    scrollToChapter,
    viewMode,
    cameraRadius,
    setCameraRadius
  } = useWorldStore()

  const [hoveredPip, setHoveredPip] = useState<number | null>(null)

  if (viewMode !== 'globe') return null

  const handleZoom = (delta: number) => {
    const nextRadius = Math.max(4.8, Math.min(14.0, cameraRadius + delta))
    setCameraRadius(nextRadius)
    window.dispatchEvent(
      new KeyboardEvent('keydown', { key: delta < 0 ? '=' : '-' })
    )
  }

  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-4 pointer-events-none select-none">
      {/* Minimal Vertical Track */}
      <div className="liquid-glass specular-rim px-2 py-3 flex flex-col items-center gap-2 shadow-liquid-glass pointer-events-auto">
        {CHAPTER_LABELS.map((ch) => {
          const isActive = activeChapter === ch.id
          return (
            <div
              key={ch.id}
              className="relative flex items-center justify-center"
              onMouseEnter={() => setHoveredPip(ch.id)}
              onMouseLeave={() => setHoveredPip(null)}
            >
              <button
                onClick={() => scrollToChapter(ch.id)}
                className={`transition-all duration-300 rounded-full flex items-center justify-center liquid-glass-control ${
                  isActive
                    ? 'w-2 h-5 bg-emerald shadow-emerald-glow'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/60 hover:scale-125'
                }`}
                aria-label={`Go to ${ch.title}`}
              />

              {/* Floating Tooltip Pill on Hover */}
              <AnimatePresence>
                {hoveredPip === ch.id && (
                  <motion.div
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-6 px-2.5 py-1 rounded-full liquid-glass-pill border-white/10 text-[10px] font-mono whitespace-nowrap text-text-primary shadow-liquid-glass pointer-events-none z-40"
                  >
                    <span className="text-emerald mr-1.5 font-bold">{ch.tag}</span>
                    <span>{ch.title}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Subtle Zoom Buttons */}
      <div className="flex flex-col items-center gap-1 p-1 rounded-full liquid-glass-pill border-white/[0.06] pointer-events-auto shadow-liquid-glass">
        <button
          onClick={() => handleZoom(-1.2)}
          title="Zoom In"
          className="w-5 h-5 rounded-full flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/10 transition-colors liquid-glass-control"
        >
          <ZoomIn className="w-3 h-3" />
        </button>
        <button
          onClick={() => handleZoom(1.2)}
          title="Zoom Out"
          className="w-5 h-5 rounded-full flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/10 transition-colors liquid-glass-control"
        >
          <ZoomOut className="w-3 h-3" />
        </button>
      </div>
    </aside>
  )
}
