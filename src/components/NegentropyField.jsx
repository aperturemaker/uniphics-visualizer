import { motion } from "framer-motion";

/**
 * Champ de néguentropie
 * --------------------
 * Plus la valeur est haute :
 * - plus la structure est stable
 * - plus l’univers est cohérent
 */
export default function NegentropyField({ strength, timeFactor }) {
  return (
    <motion.div
      style={{
        height: "120px",
        borderRadius: "8px",
        background:
          "radial-gradient(circle, rgba(34,211,238,0.4), transparent 70%)",
      }}
      animate={{
        scale: [1, 1.1, 1],
        opacity: strength,
      }}
      transition={{
        duration: 8 * timeFactor,
        repeat: Infinity,
      }}
    />
  );
}
