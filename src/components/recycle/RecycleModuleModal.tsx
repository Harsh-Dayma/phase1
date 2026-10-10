import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X,
  Sparkles,
  Scan,
  FolderArchive,
  ArrowLeft,
  CheckCircle2,
  Lock,
  Layers,
  MapPin,
  QrCode,
  ShieldCheck,
  Smartphone,
  LogOut,
  Shield,
  ShieldAlert,
  GraduationCap
} from 'lucide-react'
import { useRecycleStore } from '../../store/useRecycleStore'
import { useWorldStore } from '../../store/useWorldStore'
import { useAuthStore } from '../../store/useAuthStore'
import { MascotVolt } from './MascotVolt'
import { Stage1ProductVault } from './stages/Stage1ProductVault'
import { Stage2ConditionTriage } from './stages/Stage2ConditionTriage'
import { Stage3HazardousMaterials } from './stages/Stage3HazardousMaterials'
import { Stage4DataWipeProtocol } from './stages/Stage4DataWipeProtocol'
import { Stage5KioskSelection } from './stages/Stage5KioskSelection'
import { Stage6EphemeralQRPass } from './stages/Stage6EphemeralQRPass'
import { KioskOperatorTerminal } from './operator/KioskOperatorTerminal'
import { TechVaultDrawer } from './vault/TechVaultDrawer'

const STEPS = [
  { num: 1, title: 'Vault', desc: 'Identify Device' },
  { num: 2, title: 'Triage', desc: 'Condition & Safety' },
  { num: 3, title: 'Impact', desc: 'Material Profile' },
  { num: 4, title: 'Wipe', desc: 'Sanitization' },
  { num: 5, title: 'Kiosk', desc: 'Collection Pod' },
  { num: 6, title: 'Pass', desc: 'QR Handover' }
]

export const RecycleModuleModal: React.FC = () => {
  const { openModal } = useWorldStore()
  const { currentUser, logout } = useAuthStore()
  const {
    activeTab,
    setActiveTab,
    currentStep,
    setCurrentStep,
    mascotMood,
    mascotMessage,
    selectedProduct,
    customProduct,
    condition
  } = useRecycleStore()

  const isCollegeAdmin = currentUser?.role === 'college_admin'

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        openModal(null)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [openModal])

  const handleStepClick = (stepNum: number) => {
    // Only allow navigating back to previously visited steps
    if (stepNum < currentStep) {
      setCurrentStep(stepNum)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-2xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className={`w-full ${
          activeTab === 'student_flow' && currentStep === 5 ? 'max-w-6xl' : 'max-w-4xl'
        } my-auto rounded-3xl liquid-glass specular-rim shadow-2xl border border-white/15 overflow-hidden flex flex-col max-h-[92vh] transition-all duration-300`}
      >
        {/* ========================================================================= */}
        {/* HEADER: MODE SEGMENTED CONTROL, USER IDENTITY & LOGOUT                    */}
        {/* ========================================================================= */}
        <div className="px-5 py-3.5 border-b border-white/[0.08] flex items-center justify-between gap-3 bg-white/[0.02] shrink-0 flex-wrap sm:flex-nowrap">
          {/* TAB SWITCHER PILL WITH ROLE SECURITY */}
          <div className="flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/10 text-xs">
            <button
              onClick={() => setActiveTab('student_flow')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-all ${
                activeTab === 'student_flow'
                  ? 'bg-emerald text-background font-bold shadow-emerald-glow'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Student Drop-Off</span>
            </button>

            {/* KIOSK OPERATOR TERMINAL: RESTRICTED TO COLLEGE ADMIN */}
            <button
              onClick={() => {
                if (!isCollegeAdmin) {
                  // Restricted from student role
                  return
                }
                setActiveTab('kiosk_terminal')
              }}
              title={isCollegeAdmin ? 'Open Kiosk Operator Terminal' : 'Restricted: College Admin Role Required'}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-all ${
                !isCollegeAdmin
                  ? 'opacity-40 text-text-muted cursor-not-allowed hover:bg-transparent'
                  : activeTab === 'kiosk_terminal'
                  ? 'bg-cyan text-background font-bold shadow-cyan-glow'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {isCollegeAdmin ? (
                <Scan className="w-3.5 h-3.5" />
              ) : (
                <Lock className="w-3.5 h-3.5 text-amber" />
              )}
              <span>Kiosk Operator Terminal</span>
              {!isCollegeAdmin && (
                <span className="text-[9px] font-mono font-bold px-1 py-0.2 rounded bg-amber/20 text-amber border border-amber/40">
                  ADMIN
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('tech_vault')}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-medium transition-all ${
                activeTab === 'tech_vault'
                  ? 'bg-lavender text-background font-bold shadow-lavender-glow'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              <FolderArchive className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isCollegeAdmin ? 'Institutional Vault' : 'Tech Vault'}
              </span>
            </button>
          </div>

          {/* USER IDENTITY BADGE, LOGOUT & CLOSE CONTROLS */}
          <div className="flex items-center gap-2">
            {/* Active User Identity Pill */}
            {currentUser && (
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono">
                <span className="font-bold text-text-primary max-w-[110px] truncate">
                  {currentUser.name}
                </span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[9px] font-bold ${
                    isCollegeAdmin
                      ? 'bg-emerald/15 text-emerald border border-emerald/30'
                      : 'bg-cyan/15 text-cyan border border-cyan/30'
                  }`}
                >
                  {isCollegeAdmin ? 'ADMIN' : 'STUDENT'}
                </span>
              </div>
            )}

            {/* Prominent Logout Button */}
            <button
              id="btn-kiosk-modal-logout"
              onClick={async () => {
                await logout()
                openModal(null)
              }}
              title="Log Out of Current Session"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 hover:bg-amber/20 hover:text-amber text-text-muted transition-all border border-white/10 hover:border-amber/30 text-xs font-mono font-bold cursor-pointer"
            >
              <LogOut className="w-3 h-3" />
              <span className="hidden sm:inline">Log Out</span>
            </button>

            <kbd className="hidden sm:inline text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-text-muted">
              ESC
            </kbd>

            <button
              onClick={() => openModal(null)}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-muted hover:text-text-primary border border-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PERSISTENT STEPPER (VISIBLE ONLY IN STUDENT FLOW)                         */}
        {/* ========================================================================= */}
        {activeTab === 'student_flow' && (
          <div className="px-5 py-3 border-b border-white/[0.06] bg-white/[0.01] shrink-0">
            <div className="flex items-center justify-between gap-1 overflow-x-auto no-scrollbar">
              {STEPS.map((step, idx) => {
                const isCompleted = step.num < currentStep
                const isCurrent = step.num === currentStep
                const isClickable = isCompleted

                return (
                  <React.Fragment key={step.num}>
                    <button
                      type="button"
                      disabled={!isClickable && !isCurrent}
                      onClick={() => handleStepClick(step.num)}
                      className={`flex items-center gap-2 px-2.5 py-1 rounded-xl text-xs font-mono transition-all text-left shrink-0 ${
                        isCurrent
                          ? 'bg-white/10 text-emerald font-bold border border-emerald/40 shadow-emerald-glow'
                          : isCompleted
                          ? 'text-text-secondary hover:text-text-primary hover:bg-white/5 cursor-pointer'
                          : 'text-text-muted opacity-40 cursor-not-allowed'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                          isCompleted
                            ? 'bg-emerald text-black'
                            : isCurrent
                            ? 'border-2 border-emerald text-emerald'
                            : 'border border-white/20 text-text-muted'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.num}
                      </div>

                      <div className="hidden md:block">
                        <span className="block leading-none">{step.title}</span>
                      </div>
                    </button>

                    {idx < STEPS.length - 1 && (
                      <div
                        className={`h-[1px] flex-1 min-w-3 mx-1 ${
                          step.num < currentStep ? 'bg-emerald/50' : 'bg-white/10'
                        }`}
                      />
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* COMPANION MASCOT "VOLT" HERO STRIP                                        */}
        {/* ========================================================================= */}
        <div className="px-5 py-2.5 bg-gradient-to-r from-cyan/10 via-emerald/5 to-transparent border-b border-white/[0.06] shrink-0">
          <MascotVolt mood={mascotMood} message={mascotMessage} />
        </div>

        {/* ========================================================================= */}
        {/* MAIN SCROLLABLE CONTENT BODY                                              */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7">
          <AnimatePresence mode="wait">
            {activeTab === 'student_flow' && (
              <motion.div
                key={`step-${currentStep}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                {currentStep === 1 && <Stage1ProductVault />}
                {currentStep === 2 && <Stage2ConditionTriage />}
                {currentStep === 3 && <Stage3HazardousMaterials />}
                {currentStep === 4 && <Stage4DataWipeProtocol />}
                {currentStep === 5 && <Stage5KioskSelection />}
                {currentStep === 6 && <Stage6EphemeralQRPass />}
              </motion.div>
            )}

            {activeTab === 'kiosk_terminal' && (
              <motion.div
                key="kiosk_terminal"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {isCollegeAdmin ? (
                  <KioskOperatorTerminal />
                ) : (
                  <div className="p-8 text-center space-y-4 max-w-md mx-auto my-12 rounded-2xl liquid-glass border border-amber/30">
                    <div className="w-12 h-12 rounded-2xl bg-amber/20 border border-amber/40 flex items-center justify-center text-amber mx-auto shadow-amber-glow">
                      <ShieldAlert className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-text-primary">
                      Access Restricted: College Admin Required
                    </h3>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      You are authenticated as <strong>{currentUser?.name} (Student)</strong>. The Kiosk Operator Terminal and Hardware Verification console are restricted to authorized university facility managers and laboratory custodians.
                    </p>
                    <button
                      onClick={() => setActiveTab('student_flow')}
                      className="px-5 py-2.5 rounded-xl bg-cyan hover:bg-cyan-bright text-black font-bold text-xs shadow-cyan-glow transition-all cursor-pointer"
                    >
                      Return to Student Drop-Off
                    </button>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'tech_vault' && (
              <motion.div
                key="tech_vault"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <TechVaultDrawer />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
