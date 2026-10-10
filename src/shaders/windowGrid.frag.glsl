uniform vec3 uBaseColor;
uniform vec3 uGlowColor;
uniform float uTime;
uniform float uTier; // 1 = emerald, 2 = amber, 3 = slate
uniform float uHeightProgress; // animated growth [0..1]

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

// Simple procedural hash for subtle window variation
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  // Height clipping during growth
  if (vUv.y > uHeightProgress) {
    discard;
  }

  // Base structural material (dark metallic obsidian)
  vec3 darkStructure = vec3(0.04, 0.05, 0.08);

  // Procedural Window Grid
  // Horizontal floors and vertical window bays
  vec2 gridCoord = vec2(vUv.x * 12.0, vUv.y * 48.0);
  vec2 cell = floor(gridCoord);
  vec2 fracCoord = fract(gridCoord);

  // Window mullion borders
  float borderX = step(0.18, fracCoord.x) * step(fracCoord.x, 0.82);
  float borderY = step(0.25, fracCoord.y) * step(fracCoord.y, 0.85);
  float isWindow = borderX * borderY;

  // Pseudo-random window light state (some off, some lit, subtle breathing pulse)
  float h = hash(cell);
  float pulse = 0.85 + 0.15 * sin(uTime * 2.0 + h * 6.28);
  float windowLit = step(0.28, h) * pulse;

  // Emissive Edge Highlighting on tower corners
  float edgeX = 1.0 - smoothstep(0.0, 0.06, min(vUv.x, 1.0 - vUv.x));
  float edgeY = 1.0 - smoothstep(0.0, 0.02, min(vUv.y, 1.0 - vUv.y));
  float edgeGlow = max(edgeX, edgeY * 0.5);

  // Traveling upward data pulse
  float travelingPulse = smoothstep(0.08, 0.0, abs(fract(vUv.y * 3.0 - uTime * 0.6) - 0.5));

  // Combine colors
  vec3 windowColor = mix(uBaseColor, uGlowColor, h * 0.4);
  vec3 color = darkStructure;
  
  // Add windows
  color += isWindow * windowLit * windowColor * 1.8;
  
  // Add architectural edge lines and beacon pulse
  color += edgeGlow * uGlowColor * 1.4;
  color += travelingPulse * uGlowColor * 0.6;

  // Fresnel rim glow
  float fresnel = pow(1.0 - clamp(abs(vNormal.z), 0.0, 1.0), 2.0);
  color += fresnel * uGlowColor * 0.4;

  gl_FragColor = vec4(color, 1.0);
}
