import { motion } from "framer-motion";
import { useMemo } from "react";
import { getAttractors } from "./gravity/attractors";

/**
 * GyrotronField
 * -------------
 * Champ de quanta en rotation (matière).
 *
 * Corrections apportées :
 * - spirale réellement dynamique (angle dépend du temps)
 * - suppression des alignements rigides
 * - entropie influe sur la cohérence orbitale
 * - conservation stricte de la logique existante
 */
export default function GyrotronField({
  phase,
  energyDensity,
  negentropy,
  timeFactor,
  elapsedTime,
  entropy,
  observerActive,
}) {
  /* -------------------- Comptage -------------------- */

  const baseCount = Math.floor(energyDensity / 8e17);
  const count =
    phase === "chaos"
      ? Math.max(20, Math.floor(baseCount * 0.3))
      : Math.max(40, baseCount);

  /* -------------------- Bruit déterministe -------------------- */

  const noiseTable = useMemo(() => {
    return Array.from({ length: Math.max(count, 1) }, (_, i) => {
      return (Math.sin(i * 12.9898) * 43758.5453) % 1;
    });
  }, [count]);

  /* -------------------- Conditions de rendu -------------------- */

  if (phase === "void" || phase === "inflation") {
    return null;
  }

  const isCollapsed = phase === "stable" && negentropy > 0.7;

  /* -------------------- Attracteurs multiples -------------------- */

  const attractors = getAttractors(elapsedTime, 400, 300);
  const gravityStrength = negentropy * 0.015;

  /* -------------------- Flèche du temps -------------------- */

  // Plus l'entropie est élevée, plus la trajectoire est cohérente
  const chaosDamping = 1 - entropy;

  /* -------------------- Feedback observateur -------------------- */

  const observerStabilization = observerActive ? 0.85 : 1;

  /* -------------------- Zoom cosmique -------------------- */

  const viewBox = isCollapsed
    ? "100 50 200 200"
    : "0 0 400 300";

  return (
    <svg width="100%" height="300" viewBox={viewBox}>
      {Array.from({ length: count }).map((_, i) => {
        /* -------- Chaos -------- */

        const chaosOffset =
          phase === "chaos"
            ? noiseTable[i] * 40 * chaosDamping
            : 0;

        /* -------- Orbite (spirale dynamique) -------- */

        // ✅ angle dépend maintenant du temps
        const angle =
          i * 0.35 +
          elapsedTime * 0.4 * (1 + entropy) +
          chaosOffset;

        const radius = isCollapsed
          ? 20 + (i % 40) * 2
          : 30 + i * negentropy;

        const baseX = 200 + Math.cos(angle) * radius;
        const baseY = 150 + Math.sin(angle) * radius;

        /* -------- Gravité -------- */

        const attractor = attractors[i % attractors.length];

        const dx = attractor.x - baseX;
        const dy = attractor.y - baseY;

        const x =
          baseX +
          dx * gravityStrength * observerStabilization;

        const y =
          baseY +
          dy * gravityStrength * observerStabilization;

        return (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={2}
            fill="#22d3ee"
            animate={{ rotate: 360 }}
            transition={{
              duration: (6 + i * 0.02) * timeFactor,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </svg>
  );
}