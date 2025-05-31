import { useRef, useEffect } from "react";
import * as THREE from "three";

import fingerCursor from "/images/finger_cursor.png";

import MODE from "@/constants/mode";
import useDominoStore from "@/store/useDominoStore";
import useSimulationStore from "@/store/useSimulationStore";

const useDominoSimulation = () => {
  const { dominos, setSelectedDomino } = useDominoStore();
  const { simulationMode, setSimulationMode, setCountdownNumber } = useSimulationStore();

  const rigidBodyRefs = useRef([]);

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
    rigidBodyRefs.current[i]?.applyImpulse(force, true);
  };

  const resetAllDominoes = () => {
    dominos.forEach((domino, index) => {
      const rigidBodyRef = rigidBodyRefs.current[index];
      if (!rigidBodyRef) return;

      const { position } = domino;

      rigidBodyRef.setTranslation({ x: position[0], y: position[1], z: position[2] }, true);
      rigidBodyRef.setRotation({ x: 0, y: 0, z: 0, w: 1 }, true);
      rigidBodyRef.setLinvel({ x: 0, y: 0, z: 0 }, true);
      rigidBodyRef.setAngvel({ x: 0, y: 0, z: 0 }, true);
    });
  };

  useEffect(() => {
    const canResetDominoes = simulationMode === MODE.EDIT && rigidBodyRefs.current.length > 0;

    if (canResetDominoes) {
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

  return { rigidBodyRefs, updateSimulationState, readyDominoSimulation };
};

export default useDominoSimulation;
