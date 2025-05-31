import { useState, useRef, useEffect } from "react";
import * as THREE from "three";

import fingerCursor from "/images/finger_cursor.png";

import MODE from "@/constants/mode";
import useDominoStore from "@/store/useDominoStore";
import useSimulationStore from "@/store/useSimulationStore";

const useDominoSimulation = (changeResetKey) => {
  const { dominos, setDominos, setSelectedDomino } = useDominoStore();
  const { simulationMode, setSimulationMode, setCountdownNumber } = useSimulationStore();

  const dominoRefs = useRef([]);
  const [dominoesBackup, setDominoesBackup] = useState([]);

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
        setDominoesBackup(dominos);
        setSimulationMode(MODE.SIMULATING);
        startDominoSimulation(e, i, normal);
      } else {
        setCountdownNumber(current - 1);
      }
    }, 1000);
  };

  const startDominoSimulation = (e, i) => {
    const FORCE = 4.5;

    const dominoRef = dominoRefs.current[i];
    if (!dominoRef) return;

    const localNormal = e.face?.normal.clone().normalize();
    if (!localNormal) return;

    const worldNormal = e.object
      .localToWorld(localNormal.clone())
      .sub(e.object.position)
      .normalize();

    const pushDirection = worldNormal.clone().multiplyScalar(-1);
    const { x: pushX, z: pushZ } = pushDirection;

    const isFallDirectionX = Math.abs(pushX) > Math.abs(pushZ);
    const rotationDirection = isFallDirectionX ? -Math.sign(pushX) : -Math.sign(pushZ);
    const angularForce = {
      x: isFallDirectionX ? 0 : rotationDirection * FORCE,
      y: 0,
      z: isFallDirectionX ? rotationDirection * FORCE : 0,
    };

    dominoRef.setLinvel({ x: 0, y: 0, z: 0 }, true);
    dominoRef.setAngvel({ x: 0, y: 0, z: 0 }, true);
    dominoRef.setAngvel(angularForce, true);
  };

  useEffect(() => {
    const isClickedResetButton = simulationMode === MODE.EDIT && dominoesBackup.length > 0;

    if (isClickedResetButton) {
      setCountdownNumber(3);
      setDominos(dominoesBackup);
      changeResetKey();
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
  }, [simulationMode, dominoesBackup]);

  return { dominoRefs, updateSimulationState, readyDominoSimulation };
};

export default useDominoSimulation;
