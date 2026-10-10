uniform vec3 uSunDirection;
uniform vec3 uAtmoColor;
uniform float uIntensity;
uniform float uFalloff;
uniform float uSunInfluence;

varying vec3 vNormal;
varying vec3 vViewDir;
varying vec3 vWorldPos;

void main() {
  vec3 N = normalize(vNormal);
  vec3 V = normalize(vViewDir);
  vec3 S = normalize(uSunDirection);

  // For BackSide rendering, the inward-facing normal is -N.
  // At center behind globe: dot(V, -N) = 1.0 -> fresnel = 0 (transparent).
  // At grazing silhouette edge: dot(V, -N) = 0.0 -> fresnel = 1.0 (glowing limb).
  float cosTheta = clamp(dot(V, -N), 0.0, 1.0);
  float fresnel = pow(1.0 - cosTheta, uFalloff);

  // Sun-side scatter brightening
  float sunDot = dot(N, S);
  float sunSide = clamp(-sunDot + 0.35, 0.0, 1.0);
  float sunGlow = pow(sunSide, 2.0) * uSunInfluence;

  // Delicate blue-cyan atmospheric rim with subtle cosmic lavender gradient at extreme limb
  vec3 cosmicTint = vec3(0.75, 0.35, 0.95);
  vec3 color = mix(uAtmoColor, cosmicTint, pow(fresnel, 3.5) * 0.18);
  float alpha = clamp((fresnel + sunGlow) * uIntensity, 0.0, 1.0) * fresnel;

  gl_FragColor = vec4(color, alpha);
}
