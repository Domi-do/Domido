import type { DominoType } from "@/types/domino";

export interface CursorInfo {
  userNickname: string;
  objectInfo: DominoType["objectInfo"];
  position: [number, number, number];
  selectedColor: string;
  rotationY: number;
}

export type OtherCursorsState = Record<string, CursorInfo>;
