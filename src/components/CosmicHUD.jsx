import { UNIVERSE_PROFILES } from "./cosmology/UniverseProfiles";
import { GALAXY_CATALOG } from "./cosmology/GalaxyCatalog";

/**
 * CosmicHUD
 * ---------
 * HUD scientifique (version panneau latéral droit).
 *
 * Affiche :
 * - Informations sur l’univers
 * - Verdict GLOBAL (entropie globale)
 * - Informations sur la galaxie courante
 * - Verdict LOCAL (entropie locale pondérée)
 * - Indicateur visuel LOCAL vs GLOBAL (icône + couleur)
 * - Entropie instantanée
 * - Entropies lissées (globale et locale)
 * - ΔS pour la galaxie courante
 *
 * ✅ Compatible avec UniphicsViewer.jsx (useReducer)
 * ✅ Aucun état interne
 * ✅ Aucun accès dangereux
 * ✅ Placé par le layout parent (pas de position: fixed)
 */
export default function CosmicHUD({
  universeKey,
  galaxyKey,
  entropy,
  entropyAvgGlobal,
  entropyAvgLocal,
  deltaS,
  verdictGlobal,
  verdictLocal,
  K,
}) {
  const universe = UNIVERSE_PROFILES[universeKey];
  const galaxy = GALAXY_CATALOG[galaxyKey];

  // Sécurité : éviter tout rendu si les données ne sont pas encore disponibles
  if (!universe || !galaxy) return null;

  /* -------------------- Comparaison local vs global -------------------- */

  const comparison = compareVerdicts(verdictLocal, verdictGlobal);

  const indicatorConfig = {
    better: {
      icon: "▲",
      color: "#22c55e", // vert
      label: "Région plus favorable",
    },
    equal: {
      icon: "●",
      color: "#22d3ee", // cyan
      label: "Région conforme",
    },
    worse: {
      icon: "▼",
      color: "#f97316", // orange
      label: "Région défavorisée",
    },
  };

  const indicator = indicatorConfig[comparison];

  return (
    <div
      style={{
        padding: "14px 12px",
        fontFamily: "Courier New, monospace",
        fontSize: 12,
        lineHeight: "1.6",
        color: "rgba(255,255,255,0.9)",
        background: "rgba(0,0,0,0.35)",
        border: "1px solid rgba(255,255,255,0.15)",
        borderRadius: 6,
      }}
    >
      {/* ==================== UNIVERS ==================== */}
      <div style={{ marginBottom: 14 }}>
        <div>
          <b>UNIVERSE</b> : {universe.label}
        </div>
        <div>
          <b>STATUS</b> : {universe.display.statusLine}
        </div>
        <div>
          <b>VERDICT (GLOBAL)</b> : {verdictGlobal}
        </div>
      </div>

      {/* ==================== GALAXIE ==================== */}
      <div style={{ marginBottom: 14 }}>
        <div>
          <b>GALAXY</b> : {galaxy.name}
        </div>
        <div>
          <b>VERDICT (LOCAL)</b> : {verdictLocal}
        </div>
        <div>
          <b>ΔS (region)</b> : {deltaS.toFixed(3)}
        </div>
      </div>

      {/* ==================== INDICATEUR VISUEL ==================== */}
      <div
        style={{
          marginBottom: 14,
          padding: "6px 8px",
          borderRadius: 4,
          border: `1px solid ${indicator.color}`,
          color: indicator.color,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <span style={{ fontSize: 14 }}>{indicator.icon}</span>
        <span>{indicator.label}</span>
      </div>

      {/* ==================== ENTROPIE ==================== */}
      <div style={{ marginBottom: 14 }}>
        <div>
          <b>ENTROPY</b> : {entropy.toFixed(3)}
        </div>
        <div>
          <b>ENTROPY (avg global)</b> : {entropyAvgGlobal.toFixed(3)}
        </div>
        <div>
          <b>ENTROPY (avg local)</b> : {entropyAvgLocal.toFixed(3)}
        </div>
        <div>
          <b>K</b> : {K.toExponential(3)}
        </div>
      </div>

      {/* ==================== CHAMP LOCAL ==================== */}
      <div>
        <div>
          <b>LOCAL FIELD</b> : {galaxy.localPhysics.stability}
        </div>
      </div>
    </div>
  );
}

/* -------------------- Utilitaire -------------------- */

/**
 * Compare deux verdicts (LOCAL vs GLOBAL) de façon ordinale.
 */
function compareVerdicts(verdictLocal, verdictGlobal) {
  const rank = {
    STÉRILE: 0,
    INSTABLE: 1,
    HABITABLE: 2,
  };

  if (rank[verdictLocal] > rank[verdictGlobal]) return "better";
  if (rank[verdictLocal] < rank[verdictGlobal]) return "worse";
  return "equal";
}
