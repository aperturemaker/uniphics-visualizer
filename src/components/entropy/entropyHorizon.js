/**
 * Entropie des horizons / trous noirs
 *
 * Physique réelle dominante :
 * - Liée aux surfaces d'horizon (Bekenstein–Hawking)
 * - Très élevée
 * - Peu sensible aux détails locaux
 *
 * Modèle volontairement saturant.
 */

export function entropyHorizon({
  elapsedTime,
}) {
  // Saturation rapide vers un maximum
  const entropy =
    0.8 +
    0.2 * Math.tanh(elapsedTime / 10);

  return clamp01(entropy);
}

/* -------------------- Helper -------------------- */

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}