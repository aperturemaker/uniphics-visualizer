/**
 * CosmologyControls
 * -----------------
 * Contrôles des constantes cosmologiques.
 * Étape 1 : sliders désactivés tant que la cosmologie est guidée.
 */
export default function CosmologyControls({
  energyDensity,
  setEnergyDensity,
  negentropy,
  setNegentropy,
  locked,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 40,
        maxWidth: 700,
        margin: "24px auto 0",

        // Indice visuel clair : verrouillage
        opacity: locked ? 0.6 : 1,
        pointerEvents: locked ? "none" : "auto",
      }}
    >
      {/* --- Densité d’énergie --- */}
      <div style={{ flex: 1 }}>
        <label style={{ display: "block", marginBottom: 6 }}>
          Densité d’énergie
        </label>
        <input
          type="range"
          min={1e16}
          max={1e20}
          step={1e16}
          value={energyDensity}
          onChange={(e) => setEnergyDensity(+e.target.value)}
          disabled={locked}
          style={{ width: "100%" }}
        />
      </div>

      {/* --- Néguentropie --- */}
      <div style={{ flex: 1 }}>
        <label style={{ display: "block", marginBottom: 6 }}>
          Néguentropie
        </label>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={negentropy}
          onChange={(e) => setNegentropy(+e.target.value)}
          disabled={locked}
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
}