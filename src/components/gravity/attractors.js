/**
 * Attracteurs gravitationnels dynamiques
 * -------------------------------- densité d’énergie. * -------------------------------------
 * Leur déplacement lent permet des collisions et fusions
 * de proto-galaxies.
 */
export function getAttractors(time, width, height) {
  const t = time * 0.02;

  return [
    {
      // Attracteur A
      x: width * (0.3 + Math.sin(t) * 0.05),
      y: height * 0.4,
    },
    {
      // Attracteur B
      x: width * (0.7 - Math.sin(t) * 0.05),
      y: height * 0.5,
    },
    {
      // Attracteur C (plus stable)
      x: width * 0.5,
      y: height * (0.7 + Math.cos(t) * 0.02),
    },
  ];
}
