import { UNIVERSE_PROFILES } from "../cosmology/UniverseProfiles";

/**
 * UniverseSelector
 * ----------------
 * Sélecteur d’univers (niveau cosmologique global).
 *
 * - Liste tous les univers disponibles
 * - Ne connaît PAS les galaxies
 * - Pure UI contrôlée
 */
export default function UniverseSelector({
  universeKey,
  onChangeUniverse,
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <label style={{ marginRight: 8 }}>
        Univers :
      </label>
      <select
        value={universeKey}
        onChange={(e) => onChangeUniverse(e.target.value)}
      >
        {Object.values(UNIVERSE_PROFILES).map((u) => (
          <option key={u.id} value={u.id}>
            {u.label}
          </option>
        ))}
      </select>
    </div>
  );
}