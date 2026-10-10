import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Shield,
  GraduationCap,
  KeyRound,
  Lock,
  ArrowRight,
  AlertCircle,
  CheckCircle2,
  X,
  Sparkles,
  Building,
  UserCheck
} from 'lucide-react'
import { useAuthStore } from '../../store/useAuthStore'
import { PRESET_USERS } from '../../types/auth'

export const LoginModal: React.FC = () => {
  const {
    isLoginModalOpen,
    closeLoginModal,
    login,
    authError,
    isLoading,
    expiredMessage,
    clearError
  } = useAuthStore()

  const [activeTab, setActiveTab] = useState<'student' | 'admin'>('student')
  const [email, setEmail] = useState<string>('aarav.sharma@dtu.ac.in')
  const [password, setPassword] = useState<string>('pass123')

  if (!isLoginModalOpen) return null

  const handleTabChange = (tab: 'student' | 'admin') => {
    setActiveTab(tab)
    clearError()
    if (tab === 'student') {
      setEmail('aarav.sharma@dtu.ac.in')
      setPassword('pass123')
    } else {
      setEmail('kavita.sharma@dtu.ac.in')
      setPassword('admin123')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-2xl overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg my-auto rounded-3xl liquid-glass specular-rim shadow-2xl border border-white/15 overflow-hidden flex flex-col relative"
      >
        {/* Close Button */}
        <button
          onClick={closeLoginModal}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors border border-white/10 z-10"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Strip */}
        <div className="px-6 pt-6 pb-4 border-b border-white/[0.08] bg-white/[0.02]">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald font-bold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
              SMRT KIOSK IDENTITY PORTAL
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-text-primary tracking-tight">
            Authenticate Session
          </h3>
          <p className="text-xs text-text-secondary mt-1">
            Sign in with institutional credentials to access student drop-off lockers, verify tech vault certificates, or operate campus kiosk hubs.
          </p>

          {/* Role Segmented Controller */}
          <div className="mt-4 grid grid-cols-2 gap-1 p-1 rounded-2xl bg-black/50 border border-white/10 text-xs font-mono">
            <button
              type="button"
              onClick={() => handleTabChange('student')}
              className={`flex items-center justify-center gap-2 py-2 rounded-xl font-bold transition-all ${
                activeTab === 'student'
                  ? 'bg-cyan text-black shadow-cyan-glow'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Student Portal</span>
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('admin')}
              className={`flex items-center justify-center gap-2 py-2 rounded-xl font-bold transition-all ${
                activeTab === 'admin'
                  ? 'bg-emerald text-black shadow-emerald-glow'
                  : 'text-text-muted hover:text-text-primary'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>College Admin</span>
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4">
          {/* Expired or Logout Notice */}
          {expiredMessage && (
            <div className="p-3 rounded-xl bg-cyan/10 border border-cyan/30 text-xs text-cyan flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{expiredMessage}</span>
            </div>
          )}

          {/* Error Message */}
          {authError && (
            <div className="p-3 rounded-xl bg-amber/15 border border-amber/40 text-xs text-amber flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{authError}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            <div>
              <label className="block text-[11px] font-mono text-text-secondary uppercase mb-1">
                Institutional Email / Campus ID
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@campus.ac.in"
                  className="w-full bg-black/60 text-text-primary text-xs px-3.5 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-cyan transition-colors font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-text-secondary uppercase mb-1">
                Security Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-black/60 text-text-primary text-xs px-3.5 py-2.5 rounded-xl border border-white/10 focus:outline-none focus:border-cyan transition-colors font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 rounded-2xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 mt-2 ${
                activeTab === 'student'
                  ? 'bg-cyan hover:bg-cyan-bright text-black shadow-cyan-glow'
                  : 'bg-emerald hover:bg-emerald-bright text-black shadow-emerald-glow'
              }`}
            >
              <span>{isLoading ? 'Verifying Credentials...' : 'Sign In To Session'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick-Fill Presets for Instant Testing */}
          <div className="pt-3 border-t border-white/[0.08] space-y-2">
            <span className="text-[10px] font-mono text-text-muted uppercase block">
              Quick-Fill Test Credentials:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
              {activeTab === 'student' ? (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('aarav.sharma@dtu.ac.in')
                      setPassword('pass123')
                    }}
                    className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-left transition-colors flex items-center gap-2 group"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-cyan shrink-0" />
                    <div className="truncate">
                      <div className="text-text-primary font-bold group-hover:text-cyan">Aarav Sharma</div>
                      <div className="text-[10px] text-text-muted truncate">DTU Student • Roll #042</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEmail('priya.verma@nsut.ac.in')
                      setPassword('pass123')
                    }}
                    className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-left transition-colors flex items-center gap-2 group"
                  >
                    <UserCheck className="w-3.5 h-3.5 text-cyan shrink-0" />
                    <div className="truncate">
                      <div className="text-text-primary font-bold group-hover:text-cyan">Priya Verma</div>
                      <div className="text-[10px] text-text-muted truncate">NSUT Student • Roll #118</div>
                    </div>
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setEmail('kavita.sharma@dtu.ac.in')
                      setPassword('admin123')
                    }}
                    className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-left transition-colors flex items-center gap-2 group"
                  >
                    <Shield className="w-3.5 h-3.5 text-emerald shrink-0" />
                    <div className="truncate">
                      <div className="text-text-primary font-bold group-hover:text-emerald">Kavita Sharma</div>
                      <div className="text-[10px] text-text-muted truncate">DTU Lead Lab Tech (Admin)</div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setEmail('deepak.joshi@nsut.ac.in')
                      setPassword('admin123')
                    }}
                    className="p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 text-left transition-colors flex items-center gap-2 group"
                  >
                    <Shield className="w-3.5 h-3.5 text-emerald shrink-0" />
                    <div className="truncate">
                      <div className="text-text-primary font-bold group-hover:text-emerald">Deepak Joshi</div>
                      <div className="text-[10px] text-text-muted truncate">NSUT Operations Manager</div>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Security Notice */}
          <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-[10px] font-mono text-text-muted flex items-start gap-2">
            <Lock className="w-3.5 h-3.5 text-text-muted shrink-0 mt-0.5" />
            <span>
              Secure Session Rule: Direct user switching is disabled. To sign in as a different student or college admin, you must explicitly log out first.
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
