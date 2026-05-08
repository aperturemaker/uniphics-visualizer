/**
 * Entropie thermodynamique baryonique + rayonnement
 *
 * Modèle physique simplifié :
 * - Entropie augmente avec l'expansion
 * - Peu sensible à la structuration locale
 * - Proxy pédagogique, pas dominant cosmologiquement
 */

export function entropyThermo({
  elapsedTime,
  phase,
}) {
  const phaseFactor = phaseToFactor(phase);

  // Croissance douce et continue
  const entropy =
    0.1 +
    0.4 * phaseFactor +
    0.02 * Math.log1p(elapsedTime);

  return clamp01(entropy);
}

/* -------------------- Helpers -------------------- */

function phaseToFactor(phase) {
  switch (phase) {
    case "void": return 0.0;
    case "inflation": return 0.2;
    case "chaos": return 0.4;
    case "structuring": return 0.7;
    case "stable": return 1.0;
    default: return 0.0;
  }
}

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}