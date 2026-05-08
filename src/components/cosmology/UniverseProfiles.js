/**
 * UniverseProfiles
 * ----------------
 * Profils d’univers au sens cosmologique.
 *
 * Un univers définit :
 * - la cosmogenèse globale
 * - la possibilité d’émergence de l’ordre
 * - les types de galaxies autorisées
 *
 * ⚠️ Aucun paramètre local ici (galaxies = autre couche)
 */

export const UNIVERSE_PROFILES = {
  ours: {
    id: "ours",
    label: "Notre univers",
    description:
      "Univers observable cohérent avec les constantes physiques mesurées. "
      + "Synchronisation stable entre énergie et ordre.",
    theoryRef: "Cosmologie standard (ΛCDM)",

    // Verdict global (utilisé plus tard : habitable / stérile)
    globalVerdict: {
      habitabilityPotential: "habitable",
      comment: "Structures complexes durables possibles",
    },

    // Galaxies compatibles avec cet univers
    allowedGalaxies: [
      "milky_way",
      "andromeda",
      "elliptical_generic",
    ],

    // Trajectoires cosmologiques (INCHANGÉES)
    phases: {
      void: { energyDensity: 1e20, negentropy: 0.05 },
      inflation: { energyDensity: 5e18, negentropy: 0.1 },
      chaos: { energyDensity: 1e18, negentropy: 0.3 },
      structuring: { energyDensity: 4e17, negentropy: 0.75 },
      stable: { energyDensity: 2.5e17, negentropy: 0.92 },
    },

    display: {
      shortName: "ΛCDM",
      statusLine: "Ordre stable — complexité émergente",
    },
  },

  chaotic: {
    id: "chaotic",
    label: "Univers chaotique",
    description:
      "Univers où la néguentropie reste trop faible pour stabiliser "
      + "des structures à grande échelle.",
    theoryRef: "Multivers anthropique (univers stérile)",

    globalVerdict: {
      habitabilityPotential: "stérile",
      comment: "Aucune structure durable",
    },

    allowedGalaxies: [
      "proto_cluster",
    ],

    phases: {
      void: { energyDensity: 1e20, negentropy: 0.02 },
      inflation: { energyDensity: 6e18, negentropy: 0.05 },
      chaos: { energyDensity: 2e18, negentropy: 0.15 },
      structuring: { energyDensity: 1e18, negentropy: 0.2 },
      stable: { energyDensity: 9e17, negentropy: 0.25 },
    },

    display: {
      shortName: "Chaotic",
      statusLine: "Instabilité permanente — ordre avorté",
    },
  },

  ordered: {
    id: "ordered",
    label: "Univers trop ordonné",
    description:
      "Univers où l’ordre apparaît trop tôt et fige l’évolution. "
      + "Peu ou pas de complexité émergente.",
    theoryRef: "Hypothèse d’ordre excessif",

    globalVerdict: {
      habitabilityPotential: "non-habitable",
      comment: "Univers figé, complexité faible",
    },

    allowedGalaxies: [
      "elliptical_generic",
    ],

    phases: {
      void: { energyDensity: 1e20, negentropy: 0.1 },
      inflation: { energyDensity: 4e18, negentropy: 0.3 },
      chaos: { energyDensity: 8e17, negentropy: 0.6 },
      structuring: { energyDensity: 3e17, negentropy: 0.9 },
      stable: { energyDensity: 2e17, negentropy: 0.98 },
    },

    display: {
      shortName: "Ordered",
      statusLine: "Ordre excessif — évolution bloquée",
    },
  },
};