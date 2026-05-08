import { motion } from "framer-motion";

/**
 * ObserverHalo
 * ------------
 * Représente l’émergence d’un point de vue conscient.
 */
export default function ObserverHalo({ visible }) {
  if (!visible) return null;

  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "50%",
        border: "1px solid rgba(255,255,255,0.2)",
      }}
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 6, repeat: Infinity }}
    />
  );
}