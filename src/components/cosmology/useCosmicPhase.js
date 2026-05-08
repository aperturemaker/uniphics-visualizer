import { useMemo } from "react";

/**
 * useCosmicPhase
 * --------------
 * Traduit le temps cosmique en phase d'univers.
 */
export function useCosmicPhase(elapsedTime) {
  return useMemo(() => {
    if (elapsedTime < 2) return "void";
    if (elapsedTime < 5) return "inflation";
    if (elapsedTime < 9) return "chaos";
    if (elapsedTime < 14) return "structuring";
    return "stable";
  }, [elapsedTime]);
}
