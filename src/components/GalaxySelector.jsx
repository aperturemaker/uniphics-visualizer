import { GALAXY_CATALOG } from "../cosmology/GalaxyCatalog";

/**
 * GalaxySelector
 * --------------
 * Sélecteur de galaxie (niveau local).
 *
 * - La liste des galaxies est FOURNIE (déjà filtrée)
 * - Impossible de sélectionner une galaxie incohérente
 */
export default function GalaxySelector({
  galaxyKey,
  allowedGalaxies,
  onChangeGalaxy,
}) {
  return (
    <div style={{ textAlign: "center" }}>
      <label style={{ marginRight: 8 }}>
        Galaxie :
      </label>
      <select
        value={galaxyKey}
        onChange={(e) => onChangeGalaxy(e.target.value)}
      >
        {allowedGalaxies.map((gKey) => {
          const g = GALAXY_CATALOG[gKey];
          return (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}