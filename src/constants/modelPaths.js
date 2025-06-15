import { useGLTF } from "@react-three/drei";

const MODEL_PATHS = [
  "/objects/beach_ball.glb",
  "/objects/bumper.glb",
  "/objects/cannon.glb",
  "/objects/car.glb",
  "/objects/lightbulb.glb",
  "/objects/rainbowSlide.glb",
  "/objects/slide.glb",
  "/objects/soccer_football.glb",
  "/objects/spiral_stairs.glb",
  "/objects/stairs_closed_short.glb",
  "/objects/stairs_closed.glb",
  "/objects/steel_ball.glb",
];

MODEL_PATHS.forEach((path) => {
  useGLTF.preload(path);
});

export default MODEL_PATHS;
