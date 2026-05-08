/**
 * CosmicTimeline
 * --------------
 * Timeline visuelle du temps cosmologique.
 * Purement déclarative :
 * - n'altère aucun état
 * - ne contrôle aucune logique
 * - rend explicite la progression temporelle
 */
export default function CosmicTimeline({ phase, progress }) {
  const phases = [
    { key: "void", label: "Vide" },
    { key: "inflation", label: "Inflation" },
    { key: "chaos", label: "Chaos" },
    { key: "structuring", label: "Structuration" },
    { key: "stable", label: "Stable" },
  ];

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "28px auto 24px",
        textAlign: "center",
        fontSize: "0.75rem",
        opacity: 0.85,
      }}
    >
      {/* Ligne principale */}
      <div
        style={{
          position: "relative",
          height: 6,
          background: "rgba(255,255,255,0.15)",
          borderRadius: 3,
        }}
      >
        {/* Progression */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${progress * 100}%`,
            background: "#22d3ee",
            borderRadius: 3,
            transition: "width 0.3s linear",
          }}
        />
      </div>

      {/* Marqueurs de phase */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        {phases.map((p) => {
          const active = p.key === phase;

          return (
            <div
              key={p.key}
              style={{
                flex: 1,
                textAlign: "center",
                color: active ? "#facc15" : "rgba(255,255,255,0.6)",
                fontWeight: active ? 600 : 400,
              }}
            >
              {p.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}