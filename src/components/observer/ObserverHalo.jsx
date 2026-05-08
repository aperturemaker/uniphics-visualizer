import { motion } from "framer-motion";

/**
 * ObserverHalo
 * ------------
 * Représente l’émergence d’un référentiel conscient.
 * Pas un être, un point de cohérence.
 */
export default function ObserverHalo({ active }) {
  if (!active) return null;

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: "10%",
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.15)",
        pointerEvents: "none",
      }}
      animate={{ scale: [1, 1.03, 1] }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}