export const COLLISION_GROUPS = { CAR: 1, DOMINO: 2 } as const;

export const getCollisionGroupMask = (objectName: string): number => {
  const groups = COLLISION_GROUPS;

  if (objectName === "car") {
    return (groups.CAR << 16) | groups.DOMINO;
  }

  return (groups.DOMINO << 16) | (groups.CAR | groups.DOMINO);
};
