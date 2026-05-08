/**
 * CosmicNarrator
 * --------------
 * Narration pédagogique centrale.
 * Synchronisée avec les phases cosmologiques.
 */
export default function CosmicNarrator({ phase }) {
  const messages = {
    void: "Avant l’univers, la symétrie. Aucun temps ne s’écoule.",
    inflation: "L’énergie explose. L’espace naît.",
    chaos: "Le champ s’agite. Rien ne se stabilise.",
    structuring: "L’ordre lutte contre la dispersion.",
    stable:
      "La matière s’organise. L’univers devient habitable. Vous êtes ici.",
  };

  return (
    <div
      style={{
        margin: "20px auto 30px",
        textAlign: "center",
        maxWidth: 800,
        fontSize: "1.3rem",
        fontWeight: 500,
        color: "#facc15",
        letterSpacing: "0.02em",
        pointerEvents: "none",
      }}
    >
      {messages[phase]}
    </div>
  );
}