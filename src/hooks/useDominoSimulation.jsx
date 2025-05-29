import fingerCursor from "/images/finger_cursor.png";

import * as THREE from "three";
import { useRef, useEffect, useState } from "react";

const useDominoSimulation = () => {
  const [countdownNumber, setCountdownNumber] = useState(3);
  const [simulationMode, setSimulationMode] = useState("EDIT");

  const dominoRefs = useRef([]);

  useEffect(() => {
    if (simulationMode !== "READY") return;

    changePushCursor(true);
    window.addEventListener("keydown", closePushMode);

    return () => {
      changePushCursor(false);
      window.removeEventListener("keydown", closePushMode);
    };
  }, [simulationMode]);

  const changePushCursor = (isChange) => {
    document.body.style.cursor = isChange ? `url(${fingerCursor}), auto` : "auto";
  };

  const closePushMode = (e) => {
    const isKeyUpToClosePushMode = e.keyCode === 27 || e.which === 27;

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
      setCountdownNumber((prev) => {
        if (prev > 1) {
          return prev - 1;
        } else {
          clearInterval(timer);
          setSimulationMode("SIMULATING");
          startDominoSimulation(e, i, normal);
          return null;
        }
      });
    }, 1000);
  };

  const startDominoSimulation = (e, i, normal) => {
    const worldNormal = new THREE.Vector3();
    const force = normal.negate().multiplyScalar(0.9);

    e.object.localToWorld(worldNormal.copy(normal));
    dominoRefs.current[i]?.applyImpulse(force, true);
  };

  return {
    dominoRefs,
    simulationMode,
    countdownNumber,
    updateSimulationState,
    readyDominoSimulation,
  };
};

export default useDominoSimulation;
