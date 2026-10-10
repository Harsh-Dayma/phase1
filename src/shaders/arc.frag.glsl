uniform vec3 uColor;
uniform float uTime;
uniform float uDrawRange; // [0..1] progressive reveal

varying float vProgress;

void main() {
  if (vProgress > uDrawRange) {
    discard;
  }

  // Base thin arc glow
  float baseAlpha = 0.45;

  // Traveling photon pulse
  float pulsePos = fract(uTime * 0.4);
  float distToPulse = abs(vProgress - pulsePos);
  float pulseGlow = smoothstep(0.12, 0.0, distToPulse) * 1.8;

  float alpha = baseAlpha + pulseGlow;
  vec3 finalColor = uColor + vec3(pulseGlow * 0.5);

  gl_FragColor = vec4(finalColor, alpha);
}
