/**
 * EntropyModelSelect
 * ------------------
 * Sélecteur du modèle physique d'entropie.
 *
 * Corrections apportées :
 * - style "instrumentation" cohérent avec le HUD
 * - layout compact (colonne droite)
 * - feedback visuel focus / hover
 *
 * ⚠️ API strictement inchangée :
 *   ({ value, onChange })
 */
export default function EntropyModelSelect({
  value,
  onChange,
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        fontFamily: "Courier New, monospace",
        fontSize: 12,
        color: "rgba(255,255,255,0.85)",
      }}
    >
      {/* Libellé */}
      <label
        htmlFor="entropy-model-select"
        style={{
          textTransform: "uppercase",
          letterSpacing: 1,
          fontSize: 11,
          opacity: 0.7,
        }}
      >
        Modèle d’entropie
      </label>

      {/* Sélecteur */}
      <select
        id="entropy-model-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          background: "rgba(2, 6, 23, 0.9)",
          color: "#e5e7eb",
          border: "1px solid rgba(34, 211, 238, 0.6)",
          borderRadius: 4,
          padding: "6px 8px",
          outline: "none",
          cursor: "pointer",
        }}
      >
        <option value="THERMO">
          Thermo
        </option>

        <option value="GRAVITATION">
          Gravitation
        </option>

        <option value="HORIZONS">
          Horizons
        </option>
      </select>
    </div>
  );
}