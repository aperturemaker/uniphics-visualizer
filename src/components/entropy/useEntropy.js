import { EntropyModel } from "./EntropyModel";
import { entropyThermo } from "./entropyThermo";
import { entropyGravitational } from "./entropyGravitational";
import { entropyHorizon } from "./entropyHorizon";

/**
 * useEntropy
 * ----------
 * Hook central de calcul de l'entropie cosmologique.
 *
 * ⚠️ Ce hook :
 * - ne gère PAS de state React
 * - est purement déterministe
 * - délègue le calcul aux modèles physiques séparés
 *
 * À ce stade :
 * - pas d'hystérésis
 * - pas de verdict
 * - pas de ΔS
 */
export function useEntropy({
  model,
  phase,
  negentropy,
  galaxyKey,
  elapsedTime,
}) {
  switch (model) {
    /**
     * 🅰️ Entropie thermodynamique
     */
    case EntropyModel.THERMO:
      return {
        entropy: entropyThermo({
          elapsedTime,
          phase,
        }),
      };

    /**
     * 🅱️ Entropie gravitationnelle (structure formation)
     */
    case EntropyModel.GRAVITATION:
      return {
        entropy: entropyGravitational({
          phase,
          negentropy,
          galaxyKey,
        }),
      };

    /**
     * 🅲️ Entropie des horizons / trous noirs
     */
    case EntropyModel.HORIZONS:
      return {
        entropy: entropyHorizon({
          elapsedTime,
        }),
      };

    default:
      return { entropy: 0 };
  }
}