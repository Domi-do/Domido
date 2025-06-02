import * as THREE from "three";

import useDominoStore from "@/store/useDominoStore";

const useDominoReset = (rigidBodyRefs) => {
  const { dominos, setDominos } = useDominoStore();

  const resetAllDominoes = () => {
    const filteredDominos = dominos.filter(
      (domino) => domino.objectInfo?.objectName === "defaultObject",
    );

    setDominos(filteredDominos);

    requestAnimationFrame(() => {
      filteredDominos.forEach((domino, index) => {
        const rigidBody = rigidBodyRefs.current[index];
        if (!rigidBody) return;

        const { position, rotation } = domino;

        const eulerRotation = new THREE.Euler(rotation[0], rotation[1], rotation[2]);
        const rotationQuaternion = new THREE.Quaternion().setFromEuler(eulerRotation);

        rigidBody.setTranslation({ x: position[0], y: position[1], z: position[2] }, true);
        rigidBody.setRotation(rotationQuaternion, true);
        rigidBody.setLinvel({ x: 0, y: 0, z: 0 }, true);
        rigidBody.setAngvel({ x: 0, y: 0, z: 0 }, true);
        rigidBody.sleep();
      });
    });
  };

  const resetDominoSimulation = () => {
    if (!rigidBodyRefs.current.length > 0) return;
    resetAllDominoes();
  };

  return { resetDominoSimulation };
};

export default useDominoReset;
