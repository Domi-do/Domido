import { useRef, useEffect } from "react";
import * as THREE from "three";

import fingerCursor from "/images/finger_cursor.png";

import MODE from "@/constants/mode";
import useDominoStore from "@/store/useDominoStore";
import useSimulationStore from "@/store/useSimulationStore";

const useDominoSimulation = () => {
  const { dominos, setSelectedDomino } = useDominoStore();
  const { simulationMode, setSimulationMode, setCountdownNumber } = useSimulationStore();

  const dominoRefs = useRef([]);

  const changePushCursor = (isChange) => {
    document.body.style.cursor = isChange ? `url(${fingerCursor}), auto` : "auto";
  };

  const closeCurrentMode = (event) => {
    if (event.key !== "Escape") return;

    if (simulationMode === MODE.EDIT) {
      setSelectedDomino(null);
      return;
    }

    if (simulationMode === MODE.READY) {
      setSimulationMode(MODE.EDIT);
      return;
    }
  };

  const updateSimulationState = (mode) => {
    setSimulationMode(mode);
  };

  const readyDominoSimulation = (e, i) => {
    e.stopPropagation();

    const normal = e.face?.normal;
    const isReadyToStartGame = simulationMode === MODE.READY && normal;

    if (!isReadyToStartGame) return;

    setSimulationMode(MODE.COUNTDOWN);

    const timer = setInterval(() => {
      const current = useSimulationStore.getState().countdownNumber;

      if (current <= 1) {
        clearInterval(timer);
        setCountdownNumber(0);
        setSimulationMode(MODE.SIMULATING);
        startDominoSimulation(e, i, normal);
      } else {
        setCountdownNumber(current - 1);
      }
    }, 1000);
  };

  const startDominoSimulation = (e, i, normal) => {
    const worldNormal = new THREE.Vector3();
    const force = normal.clone().negate().multiplyScalar(0.9);

    e.object.localToWorld(worldNormal.copy(normal));
    dominoRefs.current[i]?.applyImpulse(force, true);
  };

  const resetAllDominoes = () => {
    dominos.forEach((domino, index) => {
      const ref = dominoRefs.current[index];
      if (!ref) return;

      const { position } = domino;

      ref.setTranslation({ x: position[0], y: position[1], z: position[2] }, true);
      ref.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
      ref.setLinvel({ x: 0, y: 0, z: 0 }, true);
      ref.setAngvel({ x: 0, y: 0, z: 0 }, true);
    });
  };

  useEffect(() => {
    const isClickedResetButton = simulationMode === MODE.EDIT && dominoRefs.current.length > 0;

    if (isClickedResetButton) {
      setCountdownNumber(3);
      resetAllDominoes();
    }

    if (simulationMode === MODE.READY) {
      setSelectedDomino(null);
      changePushCursor(true);
    }

    window.addEventListener("keydown", closeCurrentMode);

    return () => {
      changePushCursor(false);
      window.removeEventListener("keydown", closeCurrentMode);
    };
  }, [simulationMode]);

  return { dominoRefs, updateSimulationState, readyDominoSimulation };
};

export default useDominoSimulation;
