import * as THREE from "three";

const CANNON_TARGETS = ["beachBall", "pokeball", "soccerFootball"];

const useCannonControls = () => {
  const handleCannonTrigger = (other, target) => {
    const objectName = other.rigidBodyObject?.name;
    const isCannonTarget = CANNON_TARGETS.includes(objectName);

    if (!isCannonTarget) return;

    const cannonObject = target.colliderObject;
    const rigidBody = other.rigidBody;

    const cannonDirection = new THREE.Vector3();
    cannonObject.getWorldDirection(cannonDirection);

    const cannonWorldPosition = new THREE.Vector3();
    cannonObject.getWorldPosition(cannonWorldPosition);

    const launchOffset = 2;
    const launchPosition = new THREE.Vector3()
      .copy(cannonWorldPosition)
      .add(cannonDirection.clone().multiplyScalar(launchOffset));

    launchPosition.y += 0.75;

    rigidBody.setEnabled(false);

    const mesh = other.rigidBodyObject?.children?.[0];
    if (mesh) mesh.visible = false;

    setTimeout(() => {
      rigidBody.setTranslation(
        { x: launchPosition.x, y: launchPosition.y, z: launchPosition.z },
        true,
      );

      rigidBody.setLinvel({ x: cannonDirection.x * 5, y: 2, z: cannonDirection.z * 5 }, true);
      rigidBody.setEnabled(true);

      if (mesh) mesh.visible = true;
    }, 1000);
  };

  return { handleCannonTrigger };
};

export default useCannonControls;
