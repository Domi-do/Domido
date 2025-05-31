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

  const readyDominoSimulation = (event, index) => {
    event.stopPropagation();

    const normal = event.face?.normal;
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
        startDominoSimulation(event, index, normal);
      } else {
        setCountdownNumber(current - 1);
      }
    }, 1000);
  };

  const startDominoSimulation = (event, index) => {
    const FORCE = 4.5;

    const dominoRef = dominoRefs.current[index];
    if (!dominoRef) return;

    const clickedNormal = event.face?.normal.clone().normalize();
    if (!clickedNormal) return;

    const worldDirection = event.object
      .localToWorld(clickedNormal.clone())
      .sub(event.object.position)
      .normalize();

    const fallDirection = worldDirection.clone().multiplyScalar(-1);
    const { x: pushX, z: pushZ } = fallDirection;

    const isFallDirectionX = Math.abs(pushX) > Math.abs(pushZ);
    const spinDirection = isFallDirectionX ? -Math.sign(pushX) : -Math.sign(pushZ);
    const angularForce = {
      x: isFallDirectionX ? 0 : spinDirection * FORCE,
      y: 0,
      z: isFallDirectionX ? spinDirection * FORCE : 0,
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
