/**
 * GalaxyCatalog
 * -------------
 * Catalogue des galaxies (ou structures locales)
 * indépendantes de la cosmogenèse globale.
 *
 * ⚠️ Les galaxies n'altèrent jamais les lois fondamentales.
 * Elles existent uniquement dans les univers compatibles.
 */

export const GALAXY_CATALOG = {
  milky_way: {
    id: "milky_way",
    name: "Voie lactée",
    catalogName: "Milky Way",
    type: "Galaxie spirale",

    distance: {
      value: 0,
      unit: "années-lumière",
      referenceFrame: "Terre",
    },

    constellation: "Sagittaire",

    localPhysics: {
      massClass: "moyenne",
      stability: "stable",
      starFormationActivity: "modérée",
    },

    compatibleUniverses: ["ours"],

    hud: {
      oneLineSummary:
        "Galaxie spirale stable, formation stellaire active",
      notes: "Galaxie hôte du système solaire",
    },
  },

  andromeda: {
    id: "andromeda",
    name: "Andromède",
    catalogName: "M31",
    type: "Galaxie spirale massive",

    distance: {
      value: 2.54e6,
      unit: "années-lumière",
      referenceFrame: "Voie lactée",
    },

    constellation: "Andromède",

    localPhysics: {
      massClass: "massive",
      stability: "dense",
      starFormationActivity: "modérée",
    },

    compatibleUniverses: ["ours"],

    hud: {
      oneLineSummary:
        "Galaxie spirale massive, dynamique dense",
      notes:
        "Se rapproche de la Voie lactée (~4 milliards d’années)",
    },
  },

  elliptical_generic: {
    id: "elliptical_generic",
    name: "Galaxie elliptique massive",
    catalogName: "Elliptical Type",
    type: "Galaxie elliptique",

    distance: {
      value: "variable",
      unit: "années-lumière",
      referenceFrame: "extragalactique",
    },

    constellation: "Variable",

    localPhysics: {
      massClass: "très massive",
      stability: "très stable",
      starFormationActivity: "faible",
    },

    compatibleUniverses: ["ours", "ordered"],

    hud: {
      oneLineSummary:
        "Structure stable, faible activité stellaire",
      notes:
        "Typique des univers à faible complexité évolutive",
    },
  },

  proto_cluster: {
    id: "proto_cluster",
    name: "Proto-amas instable",
    catalogName: "Proto-Structure",
    type: "Structure transitoire",

    distance: {
      value: "variable",
      unit: "années-lumière",
      referenceFrame: "local cosmique",
    },

    constellation: "N/A",

    localPhysics: {
      massClass: "diffuse",
      stability: "instable",
      starFormationActivity: "chaotique",
    },

    compatibleUniverses: ["chaotic"],

    hud: {
      oneLineSummary:
        "Structure transitoire, instable",
      notes:
        "N’évolue jamais vers une galaxie stable",
    },
  },
};