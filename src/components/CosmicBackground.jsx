import { motion } from "framer-motion";

/**
 * CosmicBackground
 * ----------------
 * Champ d’énergie cosmique global.
 *
 * Corrections apportées :
 * - différenciation visuelle claire entre univers
 * - univers chaotique : instabilité chromatique subtile
 * - univers stable : ambiance plus contenue
 * - logique par phase CONSERVÉE
 */
export default function CosmicBackground({
  phase,
  timeFactor,
  universeKey,
}) {
  /**
   * Palettes par univers
   * --------------------
   * Chaque univers possède une "signature énergétique"
   * indépendante de la phase.
   */
  const universePalettes = {
    ours: {
      void: "black",
      inflation:
        "radial-gradient(circle at center, #22d3ee, #020617 50%)",
      chaos:
        "radial-gradient(circle at center, #0ea5e9, #020617 70%)",
      structuring:
        "radial-gradient(circle at center, #0f766e, #020617 70%)",
      stable:
        "radial-gradient(circle at center, #064e3b, #020617 75%)",
    },

    chaotic: {
      void: "black",
      inflation:
        "radial-gradient(circle at center, #f97316, #020617 45%)",
      chaos:
        "radial-gradient(circle at center, #dc2626, #020617 65%)",
      structuring:
        "radial-gradient(circle at center, #7f1d1d, #020617 70%)",
      stable:
        "radial-gradient(circle at center, #450a0a, #020617 80%)",
    },
  };

  /**
   * Styles dynamiques par phase
   * ----------------------------
   * Le scale et l’opacité traduisent la "tension" cosmique.
   */
  const phaseDynamics = {
    void: { opacity: 1, scale: 1 },
    inflation: { opacity: 1, scale: 1.3 },
    chaos: { opacity: 0.9, scale: 1.15 },
    structuring: { opacity: 0.8, scale: 1.05 },
    stable: { opacity: 0.7, scale: 1 },
  };

  const palette =
    universePalettes[universeKey] ??
    universePalettes.ours;

  const background =
    palette[phase] ?? palette.stable;

  const dynamics =
    phaseDynamics[phase] ??
    phaseDynamics.stable;

  return (
    <motion.div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
        background,
      }}
      animate={{
        opacity: dynamics.opacity,
        scale: dynamics.scale,
      }}
      transition={{
        duration: 3 * timeFactor,
        ease: "easeInOut",
      }}
    />
  );
}