import * as THREE from 'three'
import { SPONSOR_MAP, type Sponsor } from '../data/sponsors'

// Cache generated textures so we never create duplicates per sponsor
const textureCache = new Map<string, THREE.CanvasTexture>()

/**
 * Creates a high-fidelity vertical billboard banner texture for a 3D tower.
 * Resolution: 512 wide x 1024 tall (2:1 aspect ratio, ideal for vertical towers).
 * The canvas contains:
 *  - Top: Official Sponsor Logo Badge with radiant glow
 *  - Center: Vertical/Stacked corporate brand typography & ESG mission slogan
 *  - Middle-Body: Architectural telemetry grid & e-waste diversion graduation ticks
 *  - Base: High-contrast corporate footer with verified ESG partner crest
 */
export function createSponsorTowerBannerTexture(
  sponsor: Sponsor,
  collegeShortName: string
): THREE.CanvasTexture {
  const cacheKey = `${sponsor.id}-${collegeShortName}`
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!
  }

  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 1024
  const ctx = canvas.getContext('2d')!

  // 1. Base Tower Surface (Dark Metallic Architectural Gradient)
  const baseGrad = ctx.createLinearGradient(0, 0, 0, 1024)
  baseGrad.addColorStop(0, '#06080C')
  baseGrad.addColorStop(0.3, '#0A0D14')
  baseGrad.addColorStop(0.7, `${sponsor.color}22`)
  baseGrad.addColorStop(1, '#050608')
  ctx.fillStyle = baseGrad
  ctx.fillRect(0, 0, 512, 1024)

  // 2. Vertical Edge Neon Rails (Sponsor Color Accent)
  ctx.fillStyle = sponsor.color
  ctx.fillRect(0, 0, 12, 1024)
  ctx.fillRect(500, 0, 12, 1024)

  // Outer Neon Glow behind rails
  ctx.shadowColor = sponsor.color
  ctx.shadowBlur = 18
  ctx.fillRect(6, 0, 6, 1024)
  ctx.fillRect(500, 0, 6, 1024)
  ctx.shadowBlur = 0 // reset shadow

  // 3. Architectural Telemetry Grid Pattern across the entire surface
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)'
  ctx.lineWidth = 1
  for (let y = 40; y < 1000; y += 40) {
    ctx.beginPath()
    ctx.moveTo(16, y)
    ctx.lineTo(496, y)
    ctx.stroke()
  }

  // 4. TOP SECTION: Giant Sponsor Brand Header
  // Luminous Brand Pill
  ctx.fillStyle = 'rgba(0, 0, 0, 0.65)'
  ctx.strokeStyle = sponsor.color
  ctx.lineWidth = 4
  ctx.beginPath()
  ctx.roundRect(32, 36, 448, 120, 24)
  ctx.fill()
  ctx.stroke()

  // Inner Brand Core Glow
  ctx.fillStyle = `${sponsor.color}25`
  ctx.fill()

  // Sponsor Logo Wordmark (Large, Bold, High Legibility)
  ctx.font = '900 64px "Plus Jakarta Sans", system-ui, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = '#FFFFFF'
  ctx.shadowColor = sponsor.color
  ctx.shadowBlur = 24
  ctx.fillText(sponsor.logoText, 256, 96)
  ctx.shadowBlur = 0

  // 5. MID-HIGH SECTION: College Partnership Callout
  ctx.font = 'bold 26px "JetBrains Mono", monospace'
  ctx.fillStyle = sponsor.accentColor
  ctx.fillText(`× ${collegeShortName.toUpperCase()}`, 256, 195)

  ctx.font = '500 18px "Plus Jakarta Sans", sans-serif'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
  ctx.fillText('CIRCULAR HARDWARE PARTNER', 256, 226)

  // 6. CENTER BODY: Giant Vertical Corporate Watermark
  // Rotated 90 degrees to run vertically along the spine of the tower
  ctx.save()
  ctx.translate(256, 560)
  ctx.rotate(-Math.PI / 2)
  ctx.font = '900 80px "JetBrains Mono", monospace'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)'
  ctx.fillText(sponsor.name.toUpperCase(), 0, 0)
  ctx.restore()

  // 7. E-Waste Diversion Measurement Ticks (Height Telemetry along side)
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)'
  ctx.font = '14px "JetBrains Mono", monospace'
  ctx.textAlign = 'left'
  const tickLabels = ['100% CSR', '75% PEAK', '50% DIVERTED', '25% YIELD', 'BASE RECOVERY']
  for (let i = 0; i < tickLabels.length; i++) {
    const yPos = 300 + i * 130
    // tick mark
    ctx.fillStyle = sponsor.color
    ctx.fillRect(24, yPos, 28, 3)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
    ctx.fillText(tickLabels[i], 60, yPos + 5)
  }

  // 8. Dynamic Light Ribbon (Energy Pulse across banner)
  const ribbonGrad = ctx.createLinearGradient(0, 480, 512, 540)
  ribbonGrad.addColorStop(0, 'rgba(255, 255, 255, 0)')
  ribbonGrad.addColorStop(0.5, `${sponsor.color}66`)
  ribbonGrad.addColorStop(1, 'rgba(255, 255, 255, 0)')
  ctx.fillStyle = ribbonGrad
  ctx.fillRect(16, 490, 480, 24)

  // 9. LOWER-MID SECTION: Corporate ESG Slogan
  ctx.font = '600 20px "Plus Jakarta Sans", sans-serif'
  ctx.textAlign = 'center'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.85)'
  ctx.fillText('ZERO E-WASTE TO LANDFILLS', 256, 820)

  ctx.font = '15px "JetBrains Mono", monospace'
  ctx.fillStyle = sponsor.accentColor
  ctx.fillText('VERIFIED SCOPE 3 ESG CREDIT', 256, 850)

  // 10. BASE FOOTER: Anodized Recycled Aluminum Foundation Plate
  ctx.fillStyle = 'rgba(0, 0, 0, 0.85)'
  ctx.fillRect(24, 888, 464, 100)
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)'
  ctx.lineWidth = 2
  ctx.strokeRect(24, 888, 464, 100)

  // Base Sponsor Logo & Badge
  ctx.font = 'bold 32px "Plus Jakarta Sans", sans-serif'
  ctx.fillStyle = sponsor.color
  ctx.fillText(sponsor.logoText, 256, 934)

  ctx.font = '14px "JetBrains Mono", monospace'
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
  ctx.fillText('RE-EARTH CIRCULAR OS v2.6', 256, 966)

  // 11. Create Three.js texture with high-quality filtering
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.minFilter = THREE.LinearMipmapLinearFilter
  texture.magFilter = THREE.LinearFilter
  texture.generateMipmaps = true
  texture.anisotropy = 8
  texture.needsUpdate = true

  textureCache.set(cacheKey, texture)
  return texture
}
