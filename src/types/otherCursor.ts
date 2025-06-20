export interface CursorInfo {
  userNickname: string;
  objectInfo: string;
  position: [number, number, number];
  selectedColor: string;
  rotationY: number;
}

export type OtherCursorsState = Record<string, CursorInfo>;
