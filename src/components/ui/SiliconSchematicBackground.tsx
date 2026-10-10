import React from 'react'

export const SiliconSchematicBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden select-none z-0">
      {/* 1. Base Silicon Wafer Matte Obsidian Canvas */}
      <div className="absolute inset-0 bg-[#050608]" />

      {/* 2. Behind-Earth Reclaimed Copper / Gold / Verdigris Radial Core */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140vw] h-[140vh] max-w-[1800px] max-h-[1800px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(28, 20, 10, 0.45) 0%, rgba(11, 22, 16, 0.28) 32%, rgba(7, 14, 20, 0.14) 55%, rgba(5, 6, 8, 0) 75%)',
          filter: 'blur(40px)',
          transform: 'translate(-50%, -50%) scale(1.1)'
        }}
      />

      {/* 3. Subtle Optical Edge Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 40%, rgba(3, 4, 6, 0.82) 100%)'
        }}
      />

      {/* 4. High-Precision Sub-Silicon Vector Schematics (PCB Traces, Component Bus, Circular Recovery Nodes) */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.055] transition-opacity duration-1000"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Micro Grid Dot Pattern */}
          <pattern id="pcb-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.6" fill="#FFFFFF" />
          </pattern>

          {/* Copper Contact Pad Definition */}
          <g id="contact-pin-group">
            <rect x="0" y="0" width="6" height="12" rx="1" fill="#FFD60A" opacity="0.8" />
            <rect x="10" y="0" width="6" height="12" rx="1" fill="#FFD60A" opacity="0.8" />
            <rect x="20" y="0" width="6" height="12" rx="1" fill="#FFD60A" opacity="0.8" />
            <rect x="30" y="0" width="6" height="12" rx="1" fill="#FFD60A" opacity="0.8" />
          </g>

          {/* Circular Economy Recovery Icon Node */}
          <g id="circular-recovery-node">
            <circle cx="0" cy="0" r="14" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="3 3" />
            <circle cx="0" cy="0" r="8" fill="none" stroke="#30D158" strokeWidth="1" />
            <circle cx="0" cy="0" r="2" fill="#30D158" />
          </g>
        </defs>

        {/* Base Substrate Dot Matrix */}
        <rect width="100%" height="100%" fill="url(#pcb-grid)" />

        {/* Central Planetary Circular Routing Orbits */}
        <g transform="translate(960, 540)">
          <circle r="340" fill="none" stroke="#FFFFFF" strokeWidth="0.75" strokeDasharray="6 8" />
          <circle r="420" fill="none" stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="2 12" />
          <circle r="520" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="14 18" />
          <circle r="640" fill="none" stroke="#FFFFFF" strokeWidth="0.5" />

          {/* Alignment Crosshairs */}
          <line x1="-680" y1="0" x2="-360" y2="0" stroke="#FFFFFF" strokeWidth="0.6" />
          <line x1="360" y1="0" x2="680" y2="0" stroke="#FFFFFF" strokeWidth="0.6" />
          <line x1="0" y1="-560" x2="0" y2="-360" stroke="#FFFFFF" strokeWidth="0.6" />
          <line x1="0" y1="360" x2="0" y2="560" stroke="#FFFFFF" strokeWidth="0.6" />

          {/* Calibrated Angle Ticks */}
          <line x1="-340" y1="0" x2="-352" y2="0" stroke="#FFD60A" strokeWidth="1.2" />
          <line x1="340" y1="0" x2="352" y2="0" stroke="#FFD60A" strokeWidth="1.2" />
          <line x1="0" y1="-340" x2="0" y2="-352" stroke="#FFD60A" strokeWidth="1.2" />
          <line x1="0" y1="340" x2="0" y2="352" stroke="#FFD60A" strokeWidth="1.2" />
        </g>

        {/* Orthogonal PCB Bus Lines - Top Left */}
        <g stroke="#FFFFFF" strokeWidth="0.75" fill="none">
          <path d="M 80,120 L 320,120 L 380,180 L 560,180" />
          <path d="M 80,140 L 300,140 L 360,200 L 620,200" />
          <path d="M 80,160 L 280,160 L 340,220 L 480,220 L 520,260 L 680,260" />
          <circle cx="560" cy="180" r="2.5" fill="#FFFFFF" />
          <circle cx="620" cy="200" r="2.5" fill="#FFFFFF" />
          <circle cx="680" cy="260" r="2.5" fill="#FFFFFF" />
        </g>

        {/* Orthogonal PCB Bus Lines - Bottom Left */}
        <g stroke="#FFFFFF" strokeWidth="0.75" fill="none">
          <path d="M 120,960 L 280,960 L 340,900 L 540,900 L 580,860 L 720,860" />
          <path d="M 80,990 L 320,990 L 380,930 L 640,930" />
          <circle cx="720" cy="860" r="2.5" fill="#FFFFFF" />
          <circle cx="640" cy="930" r="2.5" fill="#FFFFFF" />
        </g>

        {/* Orthogonal PCB Bus Lines - Top Right */}
        <g stroke="#FFFFFF" strokeWidth="0.75" fill="none">
          <path d="M 1840,140 L 1640,140 L 1580,200 L 1380,200 L 1340,240 L 1260,240" />
          <path d="M 1840,165 L 1660,165 L 1600,225 L 1440,225" />
          <circle cx="1260" cy="240" r="2.5" fill="#FFFFFF" />
          <circle cx="1440" cy="225" r="2.5" fill="#FFFFFF" />
        </g>

        {/* Orthogonal PCB Bus Lines - Bottom Right */}
        <g stroke="#FFFFFF" strokeWidth="0.75" fill="none">
          <path d="M 1860,940 L 1680,940 L 1620,880 L 1420,880 L 1380,840 L 1240,840" />
          <path d="M 1860,970 L 1650,970 L 1590,910 L 1340,910" />
          <circle cx="1240" cy="840" r="2.5" fill="#FFFFFF" />
          <circle cx="1340" cy="910" r="2.5" fill="#FFFFFF" />
        </g>

        {/* Structural IC Footprint */}
        <g transform="translate(140, 240)">
          <rect x="0" y="0" width="120" height="90" rx="3" fill="none" stroke="#FFFFFF" strokeWidth="0.9" />
          <rect x="10" y="10" width="100" height="70" rx="2" fill="none" stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="3 3" />
          <use href="#contact-pin-group" x="42" y="-12" />
          <use href="#contact-pin-group" x="42" y="90" />
          <text x="60" y="48" fill="#FFFFFF" fontSize="7" fontFamily="monospace" textAnchor="middle" letterSpacing="1">
            ASIC // RE-EARTH
          </text>
          <text x="60" y="60" fill="#FFFFFF" fontSize="5.5" fontFamily="monospace" textAnchor="middle" letterSpacing="0.5">
            0.8nm CIRCULAR DIE
          </text>
        </g>

        {/* Secondary IC Footprint */}
        <g transform="translate(1660, 720)">
          <rect x="0" y="0" width="110" height="80" rx="3" fill="none" stroke="#FFFFFF" strokeWidth="0.9" />
          <rect x="8" y="8" width="94" height="64" rx="2" fill="none" stroke="#FFFFFF" strokeWidth="0.5" strokeDasharray="3 3" />
          <use href="#contact-pin-group" x="38" y="-12" />
          <use href="#contact-pin-group" x="38" y="80" />
          <text x="55" y="44" fill="#FFFFFF" fontSize="6.5" fontFamily="monospace" textAnchor="middle" letterSpacing="1">
            PMIC // RECOVERY
          </text>
          <text x="55" y="55" fill="#FFFFFF" fontSize="5" fontFamily="monospace" textAnchor="middle" letterSpacing="0.5">
            WEEE DUAL-LOOP
          </text>
        </g>

        {/* Circular Recovery Nodes */}
        <use href="#circular-recovery-node" x="560" y="180" />
        <use href="#circular-recovery-node" x="1380" y="200" />
        <use href="#circular-recovery-node" x="540" y="900" />
        <use href="#circular-recovery-node" x="1420" y="880" />

        {/* Architectural Micro-Typography */}
        <g fill="#FFFFFF" fontFamily="monospace" fontSize="7" letterSpacing="1.2">
          <text x="80" y="85">PCB-REV.2026 // SUB-SURFACE SILICON SUBSTRATE</text>
          <text x="80" y="98">CU-PURITY: 99.98% // AU-CONTACT: 24K VACUUM DEPOSITION</text>
          <text x="1840" y="85" textAnchor="end">CIRCULAR HARDWARE ARCHITECTURE // WEEE CLASS 4</text>
          <text x="1840" y="98" textAnchor="end">LITHIUM-COBALT CLOSED LOOP: OPERATIONAL</text>
          <text x="80" y="1035">ANODIZED RECYCLED CHASSIS SPEC // ZERO VIRGIN MINING</text>
          <text x="80" y="1048">TERRESTRIAL HARDWARE CAPTURE: 100% TRACEABLE</text>
          <text x="1840" y="1035" textAnchor="end">ISO-14040 LIFE-CYCLE METRICS // REAL-TIME TELEMETRY</text>
          <text x="1840" y="1048" textAnchor="end">RE-EARTH ENGINE // SPATIAL SILICON RECOVERY v2.6</text>
        </g>

        {/* Optical Fiducial Markers */}
        <g stroke="#FFFFFF" strokeWidth="0.8" fill="none">
          <circle cx="45" cy="45" r="7" />
          <circle cx="45" cy="45" r="2.5" fill="#FFFFFF" />
          <line x1="32" y1="45" x2="58" y2="45" />
          <line x1="45" y1="32" x2="45" y2="58" />

          <circle cx="1875" cy="45" r="7" />
          <circle cx="1875" cy="45" r="2.5" fill="#FFFFFF" />
          <line x1="1862" y1="45" x2="1888" y2="45" />
          <line x1="1875" y1="32" x2="1875" y2="58" />

          <circle cx="45" cy="1035" r="7" />
          <circle cx="45" cy="1035" r="2.5" fill="#FFFFFF" />
          <line x1="32" y1="1035" x2="58" y2="1035" />
          <line x1="45" y1="1022" x2="45" y2="1048" />

          <circle cx="1875" cy="1035" r="7" />
          <circle cx="1875" cy="1035" r="2.5" fill="#FFFFFF" />
          <line x1="1862" y1="1035" x2="1888" y2="1035" />
          <line x1="1875" y1="1022" x2="1875" y2="1048" />
        </g>
      </svg>
    </div>
  )
}
