import Bumper from "@/components/DominoCanvas/DominoEntity/DominoVisualUnit/Bumper/Bumper";
import Cannon from "@/components/DominoCanvas/DominoEntity/DominoVisualUnit/Cannon/Cannon";
import Car from "@/components/DominoCanvas/DominoEntity/DominoVisualUnit/Car/Car";
import LightBulb from "@/components/DominoCanvas/DominoEntity/DominoVisualUnit/LightBulb/LightBulb";

const ObjectComponentMap = { bumper: Bumper, cannon: Cannon, car: Car, lightbulb: LightBulb };

const DominoVisualUnit = ({ objectName, ...props }) => {
  const Object = ObjectComponentMap[objectName];
  if (!Object) return null;

  return <Object {...props} />;
};

export default DominoVisualUnit;
