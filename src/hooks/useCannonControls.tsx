import * as THREE from "three";
import { CollisionTarget } from "@react-three/rapier";

const useCannonControls = () => {
  const handleCannonTrigger = (other: CollisionTarget, target: CollisionTarget) => {
    const cannonObject = target.colliderObject;
    const rigidBody = other.rigidBody;

    if (!cannonObject) return;

    const cannonDirection = new THREE.Vector3();
    cannonObject.getWorldDirection(cannonDirection);

    const cannonWorldPosition = new THREE.Vector3();
    cannonObject.getWorldPosition(cannonWorldPosition);

    const launchOffset = 2;
    const launchPosition = new THREE.Vector3()
      .copy(cannonWorldPosition)
      .add(cannonDirection.clone().multiplyScalar(launchOffset));

    launchPosition.y += 0.75;

    if (!rigidBody) return;

    rigidBody.setEnabled(false);

    const mesh = other.rigidBodyObject?.children?.[0];
    if (mesh) mesh.visible = false;

    rigidBody.setTranslation(
      { x: launchPosition.x, y: launchPosition.y, z: launchPosition.z },
      true,
    );

    rigidBody.setLinvel({ x: cannonDirection.x * 5, y: 2, z: cannonDirection.z * 5 }, true);
    rigidBody.setEnabled(true);

    if (mesh) mesh.visible = true;
  };

  return { handleCannonTrigger };
};

export default useCannonControls;
