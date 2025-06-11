export const OBJECT_GROUP_NAMES = { STATIC: "STATIC_OBJECTS", DYNAMIC: "DYNAMIC_OBJECTS" };

export const OBJECT_METADATA = {
  [OBJECT_GROUP_NAMES.STATIC]: {
    defaultObject: {
      thumbnail: "/images/domino.png",
      model: "defaultObject",
      sound: "/sounds/domino_drop.mp3",
      colliders: "cuboid",
      type: "dynamic",
    },
    slide: {
      thumbnail: "/images/slide.png",
      model: "/objects/slide.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "trimesh",
      type: "dynamic",
    },
    spiralStairs: {
      thumbnail: "/images/spiral_stairs.png",
      model: "/objects/spiral_stairs.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "trimesh",
      type: "dynamic",
    },
    staircase: {
      thumbnail: "/images/staircase.png",
      model: "/objects/staircase.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "trimesh",
      type: "dynamic",
    },
    stairsClosedShort: {
      thumbnail: "/images/stairs_closed_short.png",
      model: "/objects/stairs_closed_short.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "trimesh",
      type: "dynamic",
    },
    stairsClosed: {
      thumbnail: "/images/stairs_closed.png",
      model: "/objects/stairs_closed.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "trimesh",
      type: "dynamic",
    },
    stairs: {
      thumbnail: "/images/stairs.png",
      model: "/objects/stairs.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "trimesh",
      type: "dynamic",
    },
    lightbulb: {
      thumbnail: "/images/lightbulb.png",
      model: "/objects/lightbulb.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "trimesh",
      type: "fixed",
    },
    bumper: {
      thumbnail: "/images/bumper.png",
      model: "/objects/bumper.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "trimesh",
    },
  },
  [OBJECT_GROUP_NAMES.DYNAMIC]: {
    beachBall: {
      thumbnail: "/images/beach_ball.png",
      model: "/objects/beach_ball.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "ball",
      type: "dynamic",
    },
    cannon: {
      thumbnail: "/images/cannon.png",
      model: "/objects/cannon.glb",
      sound: "/sounds/domino_drop.mp3",
      type: "fixed",
    },
    pokeball: {
      thumbnail: "/images/pokeball.png",
      model: "/objects/pokeball.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "ball",
      type: "dynamic",
    },
    soccerFootball: {
      thumbnail: "/images/soccer_football.png",
      model: "/objects/soccer_football.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "ball",
      type: "dynamic",
    },
    car: {
      thumbnail: "/images/car.png",
      model: "/objects/car.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "trimesh",
    },
  },
};

export const OBJECT_GROUP_LABELS = {
  [OBJECT_GROUP_NAMES.STATIC]: "Static Object",
  [OBJECT_GROUP_NAMES.DYNAMIC]: "Dynamic Object",
};
