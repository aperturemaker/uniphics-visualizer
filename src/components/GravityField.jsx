/**
 * GravityField
 * ------------
 * Définit des attracteurs gravitationnels.
 * Ce ne sont PAS des objets visibles,
 * mais des points de convergence énergétique.
 */
export default function GravityField({ width = 400, height = 300 }) {
  // Attracteurs fixes (pour l’instant)
  return [
    { x: width * 0.5, y: height * 0.5 },
    { x: width * 0.7, y: height * 0.4 },
  ];
}