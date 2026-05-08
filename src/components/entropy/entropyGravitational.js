/**
 * Entropie gravitationnelle (formation des structures)
 *
 * Physique (Penrose) :
 * - Univers homogène → faible entropie gravitationnelle
 * - Structuration → entropie augmente
 */

export function entropyGravitational({
  phase,
  negentropy,
}) {
  const phaseFactor = phaseToFactor(phase);

  // Plus la néguentropie locale est élevée,
  // plus l'entropie gravitationnelle globale augmente
  const structureFactor = 1 - negentropy;

  const entropy =
    0.15 +
    0.6 * phaseFactor +
    0.5 * structureFactor;

  return clamp01(entropy);
}

/* -------------------- Helpers -------------------- */

function phaseToFactor(phase) {
  switch (phase) {
    case "void": return 0.0;
    case "inflation": return 0.1;
    case "chaos": return 0.4;
    case "structuring": return 0.8;
    case "stable": return 1.0;
    default: return 0.0;
  }
}

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}