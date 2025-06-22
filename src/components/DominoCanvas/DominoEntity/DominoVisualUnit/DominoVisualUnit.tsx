import { JSX, memo } from "react";

import Bumper from "@/components/DominoCanvas/DominoEntity/DominoVisualUnit/Bumper/Bumper";
import Cannon from "@/components/DominoCanvas/DominoEntity/DominoVisualUnit/Cannon/Cannon";
import Car, { CarProps } from "@/components/DominoCanvas/DominoEntity/DominoVisualUnit/Car/Car";
import LightBulb from "@/components/DominoCanvas/DominoEntity/DominoVisualUnit/LightBulb/LightBulb";
import { RefObject } from "react";
import type { RapierRigidBody } from "@react-three/rapier";

export type visualUnitObjectName = "bumper" | "cannon" | "car" | "lightbulb";

type SharedProps = {
  position: [number, number, number];
  id: string;
  rigidBodyRefs: RefObject<RapierRigidBody[]>;
  onAfterTrigger?: (...args: any[]) => void;
};

type DominoVisualUnitProps = SharedProps & { objectName: visualUnitObjectName };

type ComponentMap = {
  bumper: (props: { position: [number, number, number] }) => JSX.Element;
  cannon: (props: { onAfterTrigger?: (...args: any[]) => void }) => JSX.Element;
  car: ({ rigidBodyRefs }: CarProps) => null;
  lightbulb: (props: { id: string }) => JSX.Element;
};

const ObjectComponentMap: ComponentMap = {
  bumper: Bumper,
  cannon: Cannon,
  car: Car,
  lightbulb: LightBulb,
};

const DominoVisualUnit = ({ objectName, ...props }: DominoVisualUnitProps) => {
  const Object = ObjectComponentMap[objectName];
  if (!Object) return null;

  return <Object {...props} />;
};

export default memo(DominoVisualUnit);
