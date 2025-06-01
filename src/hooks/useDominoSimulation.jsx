import { useRef, useEffect } from "react";

import fingerCursor from "/images/finger_cursor.png";

import MODE from "@/constants/mode";
import useDominoStore from "@/store/useDominoStore";
import useSimulationStore from "@/store/useSimulationStore";

const FORCE = 4.5;

const useDominoSimulation = () => {
  const { dominos, setSelectedDomino } = useDominoStore();
  const { simulationMode, setSimulationMode, setCountdownNumber } = useSimulationStore();

  const rigidBodyRefs = useRef([]);

  const changePushCursor = (isChange) => {
    document.body.style.cursor = isChange ? `url(${fingerCursor}), auto` : "auto";
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
        setSimulationMode(MODE.SIMULATING);
        startDominoSimulation(event, index, normal);
      } else {
        setCountdownNumber(current - 1);
      }
    }, 1000);
  };

  const startDominoSimulation = (event, index) => {
    const rigidBodyRef = rigidBodyRefs.current[index];
    if (!rigidBodyRef) return;

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

    rigidBodyRef.setLinvel({ x: 0, y: 0, z: 0 }, true);
    rigidBodyRef.setAngvel({ x: 0, y: 0, z: 0 }, true);
    rigidBodyRef.setAngvel(angularForce, true);
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

    return () => changePushCursor(false);
  }, [simulationMode]);

  return { rigidBodyRefs, updateSimulationState, readyDominoSimulation };
};

export default useDominoSimulation;
