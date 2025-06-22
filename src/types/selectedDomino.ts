import { ObjectMetaDataType } from "@/types/objectMetaData";

export interface SelectedDominoType extends ObjectMetaDataType {
  objectName: string;
  groupName: "STATIC_OBJECTS" | "DYNAMIC_OBJECTS";
}
