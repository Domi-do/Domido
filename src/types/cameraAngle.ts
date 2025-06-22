import { GAME_THEME } from "@/constants/gameThema";

export type CameraAngleType = (typeof GAME_THEME)[keyof typeof GAME_THEME]["cameraAngle"];
