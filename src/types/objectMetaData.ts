export interface ObjectMetaDataType {
  thumbnail: string;
  model: string;
  sound: string;
  colliders?: "cuboid" | "trimesh" | "hull" | "ball";
  type: "fixed" | "dynamic";
  title: string;
}

export type ObjectMetadataGroup = Record<string, ObjectMetaDataType>;
