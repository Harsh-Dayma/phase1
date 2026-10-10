import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Building2, CheckCircle2 } from 'lucide-react'
import { useWorldStore } from '../../store/useWorldStore'
import { useRecycleStore } from '../../store/useRecycleStore'
import { useAuthStore } from '../../store/useAuthStore'
import { RecycleModuleModal } from '../recycle/RecycleModuleModal'
import { LoginModal } from '../auth/LoginModal'

export const Modals: React.FC = () => {
  const { activeModal, openModal } = useWorldStore()
  const { setActiveTab } = useRecycleStore()
  const { isAuthenticated, isLoginModalOpen, openLoginModal } = useAuthStore()

  useEffect(() => {
    if (activeModal === 'vault') {
      if (!isAuthenticated) {
        openLoginModal('Please authenticate with your student or campus admin account to access the Tech Vault.')
      } else {
        setActiveTab('tech_vault')
      }
    } else if (activeModal === 'recycle') {
      if (!isAuthenticated) {
        openLoginModal('Please authenticate to initiate a student drop-off or operator terminal session.')
      } else {
        setActiveTab('student_flow')
      }
    }
  }, [activeModal, isAuthenticated, setActiveTab, openLoginModal])

  // Always render LoginModal if open
  if (isLoginModalOpen) {
    return <LoginModal />
  }

  if (!activeModal) return null

  // If user opens Recycle or Vault and is authenticated, render RecycleModuleModal
  if (isAuthenticated && (activeModal === 'recycle' || activeModal === 'vault')) {
    return (
      <AnimatePresence>
        <RecycleModuleModal />
      </AnimatePresence>
    )
  }

  // If unauthenticated and tried to open recycle/vault, show login
  if (!isAuthenticated && (activeModal === 'recycle' || activeModal === 'vault')) {
    return <LoginModal />
  }

  const isPitch = activeModal === 'sponsor_pitch'

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-md liquid-glass specular-rim p-7 shadow-liquid-glass relative"
        >
          {/* Close button */}
          <button
            onClick={() => openModal(null)}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors border border-white/10 liquid-glass-control"
          >
            <X className="w-4 h-4" />
          </button>

          {isPitch ? (
            /* SPONSOR PITCH MODAL */
            <div className="space-y-5">
              <div className="w-10 h-10 rounded-2xl bg-amber/15 border border-amber/30 flex items-center justify-center text-amber shadow-amber-glow">
                <Building2 className="w-5 h-5" />
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold text-amber uppercase tracking-wider">
                  ENTERPRISE SPONSORSHIP TIER
                </span>
                <h3 className="text-xl font-bold text-text-primary mt-1">
                  Your Brand on the Global Skyline
                </h3>
                <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                  Underwrite certified e-waste collection bins across partner universities. 
                  Every kilogram diverted raises your corporate holographic tower in real time.
                </p>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-white/[0.08] text-xs">
                <div className="flex items-center gap-2.5 text-text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                  <span>Audited ESG Scope 3 e-waste diversion certificates</span>
                </div>
                <div className="flex items-center gap-2.5 text-text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                  <span>Holographic crown wordmark on university towers</span>
                </div>
                <div className="flex items-center gap-2.5 text-text-secondary">
                  <CheckCircle2 className="w-4 h-4 text-emerald shrink-0" />
                  <span>Direct recruitment pipeline to top campus engineering recyclers</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openModal(null)}
                  className="w-full py-3.5 px-4 rounded-full bg-amber hover:brightness-105 active:scale-[0.98] font-bold text-xs text-background transition-all shadow-amber-glow"
                >
                  Contact University Partnership Desk
                </button>
              </div>
            </div>
          ) : (
            /* FALLBACK ROADMAP MODAL */
            <div className="space-y-5">
              <div className="w-10 h-10 rounded-2xl bg-emerald/15 border border-emerald/30 flex items-center justify-center text-emerald shadow-emerald-glow">
                <Sparkles className="w-5 h-5" />
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold text-emerald uppercase tracking-wider">
                  PHASE ROADMAP
                </span>
                <h3 className="text-xl font-bold text-text-primary mt-1 capitalize">
                  {activeModal} Module
                </h3>
                <p className="text-xs text-text-secondary mt-1.5 leading-relaxed">
                  You are currently exploring <strong className="text-text-primary">Phase 1: Global Impact World</strong>.
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => openModal(null)}
                  className="w-full py-3.5 px-4 rounded-full bg-white/10 hover:bg-white/15 text-text-primary font-bold text-xs transition-colors border border-white/10"
                >
                  Return to Global Impact World
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
