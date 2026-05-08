import { useEffect, useMemo, useReducer, useState } from "react";
import CosmicBackground from "./CosmicBackground";
import GyrotronField from "./GyrotronField";
import CosmologyControls from "./controls/CosmologyControls";
import { useCosmicPhase } from "./cosmology/useCosmicPhase";
import ObserverHalo from "./observer/ObserverHalo";
import CosmicNarrator from "./narration/CosmicNarrator";
import CosmicTimeline from "./CosmicTimeline";
import CosmicHUD from "./CosmicHUD";
import { UNIVERSE_PROFILES } from "./cosmology/UniverseProfiles";

import { useEntropy } from "./entropy/useEntropy";
import { EntropyModel } from "./entropy/EntropyModel";
import EntropyModelSelect from "./EntropyModelSelect";

/* ============================================================
   PARAMÈTRES DE SINGULARITÉ RÉGIONALE
   ------------------------------------------------------------
   Biais entropique faible, déterministe, interprétable.
   Permet l’émergence réelle de ΔS ≠ 0.
   ============================================================ */

const REGION_ENTROPY_BIAS = {
  milky_way: +0.02, // milieu légèrement plus structurant
  andromeda: -0.015, // milieu plus instable
  // autres galaxies → 0 par défaut
};

/* ============================================================
   REDUCER : hystérésis globale + hystérésis par région + ΔS
   ============================================================ */

const HISTORY_SIZE = 50;

const initialEntropyState = {
  globalHistory: [],
  globalAvg: 0,
  regionHistory: {},
  regionAvg: {},
  deltaS: {},
};

function entropyReducer(state, action) {
  switch (action.type) {
    case "TICK": {
      const { entropy, galaxyKey } = action;

      /* -------- HYSTÉRÉSIS GLOBALE -------- */
      const globalHistory = [...state.globalHistory, entropy].slice(
        -HISTORY_SIZE,
      );

      const globalAvg =
        globalHistory.reduce((a, b) => a + b, 0) / globalHistory.length;

      /* -------- BIAIS RÉGIONAL -------- */
      const bias = REGION_ENTROPY_BIAS[galaxyKey] ?? 0;

      // Entropie locale modifiée par le milieu régional
      const localEntropy = clamp01(entropy + bias);

      /* -------- HYSTÉRÉSIS PAR RÉGION -------- */
      const prevRegionHistory = state.regionHistory[galaxyKey] ?? [];

      const nextRegionHistory = [...prevRegionHistory, localEntropy].slice(
        -HISTORY_SIZE,
      );

      const regionHistory = {
        ...state.regionHistory,
        [galaxyKey]: nextRegionHistory,
      };

      const regionAvg = {
        ...state.regionAvg,
        [galaxyKey]:
          nextRegionHistory.reduce((a, b) => a + b, 0) /
          nextRegionHistory.length,
      };

      /* -------- ΔS PAR RÉGION -------- */
      const deltaS = {
        ...state.deltaS,
        [galaxyKey]: regionAvg[galaxyKey] - globalAvg,
      };

      return {
        globalHistory,
        globalAvg,
        regionHistory,
        regionAvg,
        deltaS,
      };
    }

    case "RESET":
      return initialEntropyState;

    default:
      return state;
  }
}

/* ============================================================
   UniphicsViewer
   ============================================================ */

export default function UniphicsViewer() {
  const K = 4.64159e18;

  /* -------------------- Univers / galaxie -------------------- */

  const [universeKey, setUniverseKey] = useState("ours");
  const universe = UNIVERSE_PROFILES[universeKey];

  const [galaxyKey, setGalaxyKey] = useState(universe.allowedGalaxies[0]);

  /* -------------------- Modèle d'entropie -------------------- */

  const [entropyModel, setEntropyModel] = useState(EntropyModel.GRAVITATION);

  /* -------------------- Paramètres utilisateur -------------------- */

  const [energyDensity, setEnergyDensity] = useState(1e20);
  const [negentropy, setNegentropy] = useState(0.05);

  /* -------------------- Temps cosmique -------------------- */

  const [elapsedTime, setElapsedTime] = useState(0);
  const [guidedCosmology, setGuidedCosmology] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setElapsedTime((t) => t + 0.1);
    }, 100);
    return () => clearInterval(id);
  }, [universeKey]);

  const phase = useCosmicPhase(elapsedTime);

  /* -------------------- Valeurs guidées -------------------- */

  const guidedValues = useMemo(() => {
    return universe.phases[phase] ?? universe.phases.stable;
  }, [phase, universe]);

  if (phase === "stable" && guidedCosmology) {
    setGuidedCosmology(false);
  }

  const effectiveEnergyDensity = guidedCosmology
    ? guidedValues.energyDensity
    : energyDensity;

  const effectiveNegentropy = guidedCosmology
    ? guidedValues.negentropy
    : negentropy;

  const observerActive = phase === "stable" && effectiveNegentropy > 0.8;

  /* -------------------- Entropie instantanée -------------------- */

  const { entropy } = useEntropy({
    model: entropyModel,
    phase,
    negentropy: effectiveNegentropy,
    galaxyKey,
    elapsedTime,
  });

  /* -------------------- Reducer entropie -------------------- */

  const [entropyState, dispatchEntropy] = useReducer(
    entropyReducer,
    initialEntropyState,
  );

  useEffect(() => {
    dispatchEntropy({
      type: "TICK",
      entropy,
      galaxyKey,
    });
  }, [entropy, galaxyKey]);

  const entropyAvgGlobal = entropyState.globalAvg;
  const entropyAvgLocal = entropyState.regionAvg[galaxyKey] ?? entropyAvgGlobal;

  const deltaS = entropyState.deltaS[galaxyKey] ?? 0;

  /* -------------------- Verdicts -------------------- */

  const verdictGlobal = computeVerdict(entropyAvgGlobal);

  const LOCAL_WEIGHT = 0.5;
  const entropyLocalEffective = clamp01(
    entropyAvgLocal + LOCAL_WEIGHT * deltaS,
  );
  const verdictLocal = computeVerdict(entropyLocalEffective);

  /* -------------------- Timeline -------------------- */

  const PHASE_INDEX = {
    void: 0,
    inflation: 1,
    chaos: 2,
    structuring: 3,
    stable: 4,
  };

  const progress = PHASE_INDEX[phase] / (Object.keys(PHASE_INDEX).length - 1);

  /* -------------------- Actions -------------------- */

  const resetEntropy = () => dispatchEntropy({ type: "RESET" });

  const goToOtherUniverse = () => {
    const next = universeKey === "ours" ? "chaotic" : "ours";
    setUniverseKey(next);
    setGalaxyKey(UNIVERSE_PROFILES[next].allowedGalaxies[0]);
    setElapsedTime(0);
    setGuidedCosmology(true);
    resetEntropy();
  };

  const goBackToOurUniverse = () => {
    setUniverseKey("ours");
    setGalaxyKey(UNIVERSE_PROFILES.ours.allowedGalaxies[0]);
    setElapsedTime(0);
    setGuidedCosmology(true);
    resetEntropy();
  };

  const exploreOtherRegions = () => {
    const regions = universe.allowedGalaxies;
    const currentIndex = regions.indexOf(galaxyKey);
    const nextIndex = (currentIndex + 1) % regions.length;
    setGalaxyKey(regions[nextIndex]);
  };

  /* -------------------- Render -------------------- */

  return (
    <>
      <CosmicBackground
        phase={phase}
        timeFactor={1}
        universeKey={universeKey}
      />

      <main
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: 24,
          padding: 24,
          height: "100vh",
          color: "white",
          boxSizing: "border-box",
        }}
      >
        {/* ==================== ZONE CENTRALE ==================== */}
        <div>
          <h1>Uniphics — {universe.label}</h1>

          <CosmicNarrator phase={phase} />
          <CosmicTimeline phase={phase} progress={progress} />
          <ObserverHalo active={observerActive} />

          <GyrotronField
            phase={phase}
            energyDensity={effectiveEnergyDensity}
            negentropy={effectiveNegentropy}
            entropy={entropy}
            elapsedTime={elapsedTime}
            observerActive={observerActive}
            timeFactor={1}
          />

          <CosmologyControls
            energyDensity={effectiveEnergyDensity}
            setEnergyDensity={setEnergyDensity}
            negentropy={effectiveNegentropy}
            setNegentropy={setNegentropy}
            locked={guidedCosmology}
          />
        </div>

        {/* ==================== COLONNE DROITE ==================== */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <CosmicHUD
            universeKey={universeKey}
            galaxyKey={galaxyKey}
            entropy={entropy}
            entropyAvgGlobal={entropyAvgGlobal}
            entropyAvgLocal={entropyAvgLocal}
            deltaS={deltaS}
            verdictGlobal={verdictGlobal}
            verdictLocal={verdictLocal}
            K={K}
          />

          <button onClick={goToOtherUniverse}>Autre univers</button>

          {universeKey !== "ours" && (
            <button onClick={goBackToOurUniverse}>Revenir</button>
          )}

          <button onClick={exploreOtherRegions}>Autres régions</button>

          <EntropyModelSelect value={entropyModel} onChange={setEntropyModel} />
        </div>
      </main>
    </>
  );
}

/* -------------------- Utilitaires -------------------- */

function computeVerdict(entropy) {
  if (entropy < 0.3) return "STÉRILE";
  if (entropy < 0.7) return "INSTABLE";
  return "HABITABLE";
}

function clamp01(x) {
  return Math.max(0, Math.min(1, x));
}
