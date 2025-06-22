import type { ObjectMetaDataType } from "@/types/objectMetaData";

export interface DominoType {
  _id?: string;
  projectId?: string;
  position: [number, number, number];
  rotation: [number, number, number];
  opacity: number;
  color: string | null;
  objectInfo: ObjectMetaDataType & {
    objectName: string;
    groupName: "STATIC_OBJECTS" | "DYNAMIC_OBJECTS";
  };
}
