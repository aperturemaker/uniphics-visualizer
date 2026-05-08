/**
 * EntropyModel
 * ------------
 * Enum des modèles physiques d'entropie disponibles
 * dans la simulation Uniphics.
 *
 * ⚠️ Ce fichier est une SOURCE DE VÉRITÉ.
 * Ne pas utiliser de chaînes littérales ailleurs.
 */

export const EntropyModel = Object.freeze({
  THERMO: "THERMO",          // Entropie thermodynamique (baryons + rayonnement)
  GRAVITATION: "GRAVITATION",// Entropie gravitationnelle (formation des structures)
  HORIZONS: "HORIZONS",      // Entropie des horizons / trous noirs
});

/**
 * Libellés courts associés (UI)
 */
export const EntropyModelLabel = Object.freeze({
  [EntropyModel.THERMO]: "Thermo",
  [EntropyModel.GRAVITATION]: "Gravitation",
  [EntropyModel.HORIZONS]: "Horizons",
});