import React from 'react'
import { motion } from 'framer-motion'
import {
  ArrowRight,
  Orbit,
  ChevronDown,
  Trophy,
  RotateCcw,
  Sparkles
} from 'lucide-react'
import { useWorldStore } from '../../store/useWorldStore'

export const ScrollStorySections: React.FC = () => {
  const {
    scrollToChapter,
    selectCampus,
    toggleLeftDrawer,
    openModal,
    campuses
  } = useWorldStore()

  const dtu = campuses.find((c) => c.id === 'dtu')
  const nsut = campuses.find((c) => c.id === 'nsut')

  return (
    <div className="relative w-full z-10 pointer-events-none">
      
      {/* ========================================================================= */}
      {/* ========================================================================= */}
      {/* CHAPTER 0: GENESIS / MACRO EARTH                                         */}
      {/* ========================================================================= */}
      <section
        id="chapter-genesis"
        className="min-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-12 py-32"
      >
        <div className="max-w-3xl w-full text-center space-y-8 pointer-events-auto">
          {/* Subtle Category Pill with Specular Rim */}
          <div className="overflow-hidden inline-block">
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill specular-rim text-[11px] font-mono tracking-widest uppercase text-text-secondary"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
              <span>18 Universities Synced</span>
            </motion.div>
          </div>

          {/* Apple-grade Staggered Masked Headline */}
          <div className="space-y-4">
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tight text-text-primary leading-[1.02]"
              >
                Turn Dead Tech into{' '}
                <span className="bg-gradient-to-r from-emerald via-cyan to-lavender bg-clip-text text-transparent text-shimmer">
                  Living Earth.
                </span>
              </motion.h1>
            </div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-base sm:text-xl text-text-secondary max-w-xl mx-auto font-normal leading-relaxed"
              >
                A planetary computing network transforming discarded electronics into verified collegiate architecture.
              </motion.p>
            </div>
          </div>

          {/* Minimal Action Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={() => scrollToChapter(1)}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-emerald text-background font-bold text-xs tracking-wider uppercase shadow-emerald-glow hover:brightness-105 active:scale-[0.97] transition-all duration-300"
            >
              <span>Explore Narrative</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => scrollToChapter(3)}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full liquid-glass-pill liquid-glass-control text-text-secondary hover:text-text-primary text-xs font-medium tracking-wide transition-all"
            >
              <Orbit className="w-3.5 h-3.5 text-cyan" />
              <span>Direct 3D Orbit</span>
            </button>
          </motion.div>

          {/* Subtle Downward Pulse */}
          <div className="pt-12">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
              className="inline-block"
            >
              <ChevronDown className="w-4 h-4 text-white/30" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 1: THE SILICON CRISIS                                            */}
      {/* ========================================================================= */}
      <section
        id="chapter-crisis"
        className="min-h-screen w-full flex flex-col justify-center items-start px-6 sm:px-16 md:px-24 py-32"
      >
        <div className="max-w-lg w-full space-y-8 pointer-events-auto">
          {/* Subtle Tag */}
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-[10px] font-mono tracking-widest text-amber uppercase font-semibold"
            >
              01 // The Silicon Crisis
            </motion.span>
          </div>

          {/* Staggered Masked Headline & Concise Copy */}
          <div className="space-y-4">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.06]"
              >
                62 Million Tonnes.{' '}
                <span className="block mt-1 bg-gradient-to-r from-amber to-rose-400 bg-clip-text text-transparent">
                  Buried Every Year.
                </span>
              </motion.h2>
            </div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-base text-text-secondary leading-relaxed"
              >
                Less than a quarter is ever documented as recycled. The rest leaches toxic lead and mercury into municipal water tables.
              </motion.p>
            </div>
          </div>

          {/* Two Clean Numbers with Immense Breathing Room */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-baseline gap-10 pt-2"
          >
            <div>
              <div className="text-4xl sm:text-5xl font-mono font-bold text-amber">62M T</div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-text-muted mt-1">
                Annual E-Waste
              </div>
            </div>
            <div className="w-[1px] h-10 bg-white/10" />
            <div>
              <div className="text-4xl sm:text-5xl font-mono font-bold text-rose-400">&lt; 22%</div>
              <div className="text-[11px] font-mono uppercase tracking-wider text-text-muted mt-1">
                Formally Recycled
              </div>
            </div>
          </motion.div>

          {/* On-Demand Expansion Link */}
          <div className="pt-2">
            <button
              onClick={() => openModal('vault')}
              className="inline-flex items-center gap-2 text-xs font-mono text-emerald hover:text-emerald-light transition-colors group liquid-glass-control"
            >
              <span>Inspect Chemical Impact Ledger</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 2: COLLEGIATE ARCHITECTURE & SPONSOR BEACONS                    */}
      {/* ========================================================================= */}
      <section
        id="chapter-beacons"
        className="min-h-screen w-full flex flex-col justify-center items-end px-6 sm:px-16 md:px-24 py-32"
      >
        <div className="max-w-lg w-full space-y-8 pointer-events-auto text-left">
          {/* Subtle Tag */}
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-[10px] font-mono tracking-widest text-cyan uppercase font-semibold"
            >
              02 // Architectural Beacons
            </motion.span>
          </div>

          {/* Staggered Masked Headline & Concise Copy */}
          <div className="space-y-4">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.06]"
              >
                Monuments of{' '}
                <span className="block mt-1 bg-gradient-to-r from-cyan to-emerald bg-clip-text text-transparent">
                  Diversion.
                </span>
              </motion.h2>
            </div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-base text-text-secondary leading-relaxed"
              >
                Universities rise as 3D holographic towers across the globe. Each tower is enveloped in the branded banner of its corporate sustainability partner.
              </motion.p>
            </div>
          </div>

          {/* Clean Metric Callout */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-3 pt-2"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full liquid-glass-pill specular-rim text-xs font-mono text-emerald border-emerald/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
              <span>Tower Height = Verified Kilograms Diverted</span>
            </div>

            <div className="text-[11px] font-mono text-text-muted tracking-wider pt-2">
              PARTNERS // APPLE • INTEL • TESLA • GOOGLE • NVIDIA • PATAGONIA
            </div>
          </motion.div>

          {/* Action Link */}
          <div className="pt-2">
            <button
              onClick={() => scrollToChapter(3)}
              className="inline-flex items-center gap-2 text-xs font-mono text-cyan hover:text-cyan-light transition-colors group liquid-glass-control"
            >
              <span>See the competitive campus war</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 3: COMPETITIVE DERBY & LIVE PLANETARY HUB                       */}
      {/* ========================================================================= */}
      <section
        id="chapter-derby"
        className="min-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-12 py-32"
      >
        <div className="max-w-2xl w-full text-center space-y-8 pointer-events-auto">
          {/* Subtle Tag */}
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-[10px] font-mono tracking-widest text-emerald uppercase font-semibold"
            >
              03 // The Derby
            </motion.span>
          </div>

          {/* Staggered Masked Headline */}
          <div className="space-y-4">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.06]"
              >
                The Campus War.
              </motion.h2>
            </div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-base text-text-secondary max-w-lg mx-auto leading-relaxed"
              >
                Colleges compete weekly. Every kilogram of reclaimed lithium and silicon elevates the institution in real-time.
              </motion.p>
            </div>
          </div>

          {/* Clean Interactive Action Pill with Liquid Glass Controls */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2 flex flex-wrap items-center justify-center gap-3"
          >
            {nsut && (
              <button
                onClick={() => selectCampus('nsut')}
                className="px-4 py-2 rounded-full liquid-glass-pill liquid-glass-control border-amber/30 text-amber font-mono text-xs hover:bg-amber/10 transition-all"
              >
                NSUT • {nsut.weeklyKg.toFixed(1)}kg
              </button>
            )}
            <span className="text-text-muted text-xs font-mono">vs</span>
            {dtu && (
              <button
                onClick={() => selectCampus('dtu')}
                className="px-4 py-2 rounded-full liquid-glass-pill liquid-glass-control border-emerald/30 text-emerald font-mono text-xs hover:bg-emerald/10 transition-all"
              >
                DTU • {dtu.weeklyKg.toFixed(1)}kg
              </button>
            )}

            <button
              onClick={toggleLeftDrawer}
              className="px-4 py-2 rounded-full liquid-glass-pill liquid-glass-control border-white/15 text-text-primary hover:border-emerald/40 text-xs font-medium transition-all flex items-center gap-1.5"
            >
              <Trophy className="w-3.5 h-3.5 text-emerald" />
              <span>Leaderboard</span>
            </button>
          </motion.div>

          {/* Minimal Interaction Hint */}
          <p className="text-[11px] font-mono text-text-muted pt-4">
            Click any illuminated tower on Earth to inspect its verified hardware ledger.
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* CHAPTER 4: THE CIRCULAR OS / CALL TO ACTION                              */}
      {/* ========================================================================= */}
      <section
        id="chapter-action"
        className="min-h-screen w-full flex flex-col justify-between items-center px-6 sm:px-12 py-24"
      >
        <div className="w-full" /> {/* Top Spacer */}

        {/* Closing Headline & Action Pills */}
        <div className="max-w-2xl w-full text-center space-y-8 pointer-events-auto">
          <div className="overflow-hidden">
            <motion.span
              initial={{ y: '100%', opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block text-[10px] font-mono tracking-widest text-lavender uppercase font-semibold"
            >
              04 // Circular OS
            </motion.span>
          </div>

          <div className="space-y-4">
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="text-4xl sm:text-6xl font-extrabold tracking-tight text-text-primary leading-[1.06]"
              >
                Connect Your Campus.{' '}
                <span className="block mt-1 bg-gradient-to-r from-emerald via-cyan to-lavender bg-clip-text text-transparent text-shimmer">
                  Close the Loop.
                </span>
              </motion.h2>
            </div>

            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '100%', opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-base text-text-secondary max-w-lg mx-auto leading-relaxed"
              >
                Deploy an automated smart drop-off kiosk to your institution and enter the global circular ledger.
              </motion.p>
            </div>
          </div>

          {/* 3 Refined Action Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <button
              onClick={() => openModal('recycle')}
              className="px-6 py-3 rounded-full bg-emerald text-background font-bold text-xs uppercase tracking-wider shadow-emerald-glow hover:brightness-105 active:scale-[0.97] transition-all"
            >
              Deploy Campus Kiosk
            </button>

            <button
              onClick={() => openModal('sponsor_pitch')}
              className="px-6 py-3 rounded-full liquid-glass-pill liquid-glass-control border-white/10 text-text-primary hover:border-cyan/40 hover:text-cyan text-xs font-semibold tracking-wide transition-all"
            >
              Become a Sponsor
            </button>

            <button
              onClick={() => openModal('vault')}
              className="px-6 py-3 rounded-full liquid-glass-pill liquid-glass-control border-white/10 text-text-primary hover:border-lavender/40 hover:text-lavender text-xs font-semibold tracking-wide transition-all"
            >
              Open Data Vault
            </button>
          </motion.div>

          {/* Return to Top */}
          <div className="pt-6">
            <button
              onClick={() => scrollToChapter(0)}
              className="inline-flex items-center gap-2 text-[11px] font-mono text-text-muted hover:text-text-primary transition-colors liquid-glass-control"
            >
              <RotateCcw className="w-3 h-3 text-emerald" />
              <span>Return to Orbit</span>
            </button>
          </div>
        </div>

        {/* Minimal Editorial Footer */}
        <footer className="w-full max-w-4xl pt-16 pointer-events-auto text-center">
          <div className="text-[10px] font-mono text-text-muted tracking-wider">
            RE—EARTH // 18 UNIVERSITIES CONNECTED // HARDWARE-VERIFIED TELEMETRY
          </div>
        </footer>
      </section>

    </div>
  )
}
