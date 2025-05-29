import { useRef, useEffect } from "react";
import * as THREE from "three";

import fingerCursor from "/images/finger_cursor.png";

import useSimulationStore from "@/store/useSimulationStore";

const useDominoSimulation = () => {
  const { simulationMode, setSimulationMode, setCountdownNumber } = useSimulationStore();
  const dominoRefs = useRef([]);

  const changePushCursor = (isChange) => {
    document.body.style.cursor = isChange ? `url(${fingerCursor}), auto` : "auto";
  };

  const closePushMode = (e) => {
    const isKeyUpToClosePushMode = e.key === "Escape";

    if (isKeyUpToClosePushMode) {
      setSimulationMode("EDIT");
    }
  };

  const updateSimulationState = (mode) => {
    setSimulationMode(mode);
  };

  const readyDominoSimulation = (e, i) => {
    e.stopPropagation();

    const normal = e.face?.normal;
    const isReadyToStartGame = simulationMode === "READY" && normal;

    if (!isReadyToStartGame) return;

    setSimulationMode("COUNTDOWN");

    const timer = setInterval(() => {
      const current = useSimulationStore.getState().countdownNumber;

      if (current <= 1) {
        clearInterval(timer);
        setCountdownNumber(0);
        setSimulationMode("SIMULATING");
        startDominoSimulation(e, i, normal);
      } else {
        setCountdownNumber(current - 1);
      }
    }, 1000);
  };

  const startDominoSimulation = (e, i, normal) => {
    const worldNormal = new THREE.Vector3();
    const force = normal.negate().multiplyScalar(0.9);

    e.object.localToWorld(worldNormal.copy(normal));
    dominoRefs.current[i]?.applyImpulse(force, true);
  };

  useEffect(() => {
    if (simulationMode !== "READY") return;

    changePushCursor(true);
    window.addEventListener("keydown", closePushMode);

    return () => {
      changePushCursor(false);
      window.removeEventListener("keydown", closePushMode);
    };
  }, [simulationMode]);

  return { dominoRefs, updateSimulationState, readyDominoSimulation };
};

export default useDominoSimulation;
