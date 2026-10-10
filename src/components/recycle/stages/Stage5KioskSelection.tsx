import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Flame,
  CheckCircle2,
  Clock,
  BatteryCharging,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  AlertOctagon,
  Sparkles,
  Lock,
  Layers
} from 'lucide-react'
import { CAMPUS_KIOSKS, type CampusKiosk } from '../../../data/kiosks'
import { useRecycleStore } from '../../../store/useRecycleStore'

export const Stage5KioskSelection: React.FC = () => {
  const {
    selectedKioskId,
    selectKiosk,
    condition,
    selectedProduct,
    customProduct,
    setCurrentStep
  } = useRecycleStore()

  const isSwollenHazard = condition === 'swollen_battery'
  const deviceCategory = selectedProduct?.category || customProduct?.category || 'smartphones'

  // Kiosks filtered and sorted by suitability & distance
  const kiosksWithEligibility = useMemo(() => {
    return CAMPUS_KIOSKS.map((kiosk) => {
      // Check hazard requirement
      const hazmatPass = !isSwollenHazard || kiosk.hazmatCertified
      // Check device category acceptance
      const categoryPass = kiosk.acceptedCategories.includes(deviceCategory)
      const isEligible = hazmatPass && categoryPass

      let ineligibilityReason = ''
      if (!hazmatPass) {
        ineligibilityReason = 'Not Hazmat Certified: Cannot accept swollen lithium batteries.'
      } else if (!categoryPass) {
        ineligibilityReason = `Kiosk capacity limited: Does not accept ${deviceCategory}.`
      }

      return {
        ...kiosk,
        isEligible,
        ineligibilityReason
      }
    }).sort((a, b) => {
      // Prioritize eligible kiosks first, then sort by distance
      if (a.isEligible && !b.isEligible) return -1
      if (!a.isEligible && b.isEligible) return 1
      return a.distanceKm - b.distanceKm
    })
  }, [isSwollenHazard, deviceCategory])

  const selectedKiosk = kiosksWithEligibility.find((k) => k.id === selectedKioskId)
  const canProceed = !!selectedKiosk && selectedKiosk.isEligible

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="space-y-1">
        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
          STAGE 5 OF 6 • DROP-POINT ALLOCATION
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-text-primary tracking-tight">
          Select Campus Collection Kiosk
        </h2>
        <p className="text-xs sm:text-sm text-text-secondary leading-relaxed">
          Choose an authorized collection point to prepare your handover pass and lock in your 15-minute locker reservation.
        </p>
      </div>

      {/* HAZARD ROUTING BANNER IF SWOLLEN BATTERY */}
      {isSwollenHazard && (
        <div className="p-3.5 rounded-2xl bg-amber/15 border border-amber/40 shadow-amber-glow flex items-start gap-3 text-xs">
          <div className="w-7 h-7 rounded-lg bg-amber/25 flex items-center justify-center text-amber shrink-0 mt-0.5">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-amber font-bold block">
              HAZMAT FILTERING ACTIVE
            </span>
            <p className="text-text-primary mt-0.5 leading-relaxed">
              Standard student smart bins have been disabled. Only campus hubs with verified fire-suppression chambers and sand isolation cells are selectable.
            </p>
          </div>
        </div>
      )}

      {/* MAP RADAR ILLUSTRATION & LIST */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* RADAR SUMMARY SCHEMATIC (5 cols on lg) */}
        <div className="lg:col-span-5 p-4 rounded-2xl liquid-glass specular-rim space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-text-muted mb-2">
              <span className="flex items-center gap-1 text-cyan font-bold">
                <MapPin className="w-3.5 h-3.5" />
                SMART KIOSK RADAR
              </span>
              <span className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-emerald font-bold">
                15:00 LOCK
              </span>
            </div>

            {/* Radar Circular Graphic */}
            <div className="relative w-full aspect-[4/3] rounded-xl bg-[#030406] border border-white/[0.08] overflow-hidden flex items-center justify-center">
              {/* Radar Rings */}
              <div className="absolute w-44 h-44 rounded-full border border-cyan/20 animate-ping opacity-25" />
              <div className="absolute w-36 h-36 rounded-full border border-white/10" />
              <div className="absolute w-24 h-24 rounded-full border border-cyan/30" />
              <div className="absolute w-12 h-12 rounded-full border border-white/15" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(100,210,255,0.08)_0%,transparent_70%)]" />

              {/* Crosshairs */}
              <div className="absolute inset-x-0 top-1/2 h-[1px] bg-white/[0.08]" />
              <div className="absolute inset-y-0 left-1/2 w-[1px] bg-white/[0.08]" />

              {/* Student Position Pin */}
              <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-cyan animate-pulse shadow-cyan-glow" />
                <span className="text-[9px] font-mono text-cyan bg-black/70 px-1 py-0.2 rounded border border-cyan/30">
                  Your Dorm
                </span>
              </div>

              {/* Selected Kiosk Pin */}
              {selectedKiosk && (
                <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-emerald flex items-center justify-center text-black text-[9px] font-bold shadow-emerald-glow">
                    ★
                  </div>
                  <span className="text-[9px] font-mono text-emerald bg-black/80 px-1.5 py-0.5 rounded border border-emerald/40 font-bold">
                    {selectedKiosk.name.split(' ')[0]}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Selected Kiosk Snapshot */}
          {selectedKiosk && (
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs space-y-1">
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-text-muted">RESERVATION SLOT:</span>
                <span className="text-emerald font-bold">
                  Slot #{Math.floor(1 + Math.random() * 8)} (Held 15m)
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-text-muted">CAMPUS TURF BOUNTY:</span>
                <span className="text-amber font-bold">
                  {selectedKiosk.turfBonusMultiplier}x Multiplier
                </span>
              </div>
            </div>
          )}
        </div>

        {/* KIOSK LIST (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-2.5 max-h-[380px] overflow-y-auto pr-1 no-scrollbar">
          {kiosksWithEligibility.map((kiosk) => {
            const isSelected = selectedKioskId === kiosk.id
            const isEligible = kiosk.isEligible

            return (
              <div
                key={kiosk.id}
                onClick={() => isEligible && selectKiosk(kiosk.id)}
                className={`p-3.5 rounded-2xl border transition-all duration-200 text-left relative ${
                  !isEligible
                    ? 'opacity-40 bg-white/[0.01] border-white/[0.04] cursor-not-allowed'
                    : isSelected
                    ? 'bg-emerald/15 border-emerald/50 shadow-emerald-glow cursor-pointer'
                    : 'liquid-glass-subtle border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04] cursor-pointer'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan/15 text-cyan border border-cyan/30">
                        {kiosk.distanceKm < 1
                          ? `${Math.round(kiosk.distanceKm * 1000)}m AWAY`
                          : `${kiosk.distanceKm} km`}
                      </span>

                      {kiosk.hazmatCertified && (
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber/15 text-amber border border-amber/30 flex items-center gap-1">
                          <Flame className="w-2.5 h-2.5" />
                          HAZMAT POD
                        </span>
                      )}

                      <span className="text-[10px] font-mono text-emerald font-bold">
                        {kiosk.turfBonusMultiplier}x TURF
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-text-primary truncate">
                      {kiosk.name}
                    </h4>

                    <p className="text-[11px] text-text-secondary">
                      {kiosk.landmark}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'border-emerald bg-emerald text-black'
                          : 'border-white/20'
                      }`}
                    >
                      {isSelected && <CheckCircle2 className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* CAPACITY & HOURS */}
                <div className="mt-3 pt-2.5 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-text-muted">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-text-muted" />
                    <span>{kiosk.operatingHours}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span>Fill: {kiosk.fillLevelPercent}%</span>
                    <div className="w-12 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className="h-full bg-emerald"
                        style={{ width: `${kiosk.fillLevelPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {!isEligible && (
                  <div className="mt-2 text-[10px] font-mono text-amber flex items-center gap-1">
                    <AlertOctagon className="w-3 h-3" />
                    <span>{kiosk.ineligibilityReason}</span>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* NAVIGATION */}
      <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between">
        <button
          onClick={() => setCurrentStep(4)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors border border-white/10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Data-Wipe Protocol</span>
        </button>

        <button
          disabled={!canProceed}
          onClick={() => {
            const store = useRecycleStore.getState()
            store.generateQrPass()
          }}
          className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
            canProceed
              ? 'bg-emerald text-background shadow-emerald-glow hover:brightness-105 active:scale-[0.98]'
              : 'bg-white/10 text-text-muted cursor-not-allowed opacity-50'
          }`}
        >
          <span>Generate Ephemeral QR Pass</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
