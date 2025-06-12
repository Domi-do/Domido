export const OBJECT_GROUP_NAMES = { STATIC: "STATIC_OBJECTS", DYNAMIC: "DYNAMIC_OBJECTS" };

export const OBJECT_METADATA = {
  [OBJECT_GROUP_NAMES.STATIC]: {
    defaultObject: {
      thumbnail: "/images/thumbnail/domino.png",
      model: "defaultObject",
      sound: "/sounds/domino_drop.mp3",
      colliders: "cuboid",
      type: "dynamic",
      title: "도미노",
    },
    spiralStairs: {
      thumbnail: "/images/thumbnail/spiral_stairs.png",
      model: "/objects/spiral_stairs.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "trimesh",
      type: "dynamic",
      title: "회전 트랙",
    },
    slide: {
      thumbnail: "/images/thumbnail/slide.png",
      model: "/objects/slide.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "trimesh",
      type: "dynamic",
      title: "미끄럼틀",
    },
    stairsClosedShort: {
      thumbnail: "/images/thumbnail/stairs_closed_short.png",
      model: "/objects/stairs_closed_short.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "trimesh",
      type: "dynamic",
      title: "계단",
    },
    lightbulb: {
      thumbnail: "/images/thumbnail/lightbulb.png",
      model: "/objects/lightbulb.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "trimesh",
      type: "fixed",
      title: "전구",
    },
    bumper: {
      thumbnail: "/images/thumbnail/bumper.png",
      model: "/objects/bumper.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "trimesh",
      title: "범퍼",
      type: "fixed",
    },
    rainbowSlide: {
      thumbnail: "/images/thumbnail/rainbowSlide.png",
      model: "/objects/rainbowSlide.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "trimesh",
      title: "무지개 미끄럼틀",
      type: "dynamic",
    },
  },
  [OBJECT_GROUP_NAMES.DYNAMIC]: {
    steelBall: {
      thumbnail: "/images/thumbnail/steel_ball.png",
      model: "/objects/steel_ball.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "hull",
      type: "dynamic",
      title: "쇠구슬",
    },
    beachBall: {
      thumbnail: "/images/thumbnail/beach_ball.png",
      model: "/objects/beach_ball.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "ball",
      type: "dynamic",
      title: "비치볼",
    },
    soccerFootball: {
      thumbnail: "/images/thumbnail/soccer_football.png",
      model: "/objects/soccer_football.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "ball",
      type: "dynamic",
      title: "축구공",
    },
    cannon: {
      thumbnail: "/images/thumbnail/cannon.png",
      model: "/objects/cannon.glb",
      sound: "/sounds/domino_drop.mp3",
      type: "fixed",
      title: "대포",
    },
    car: {
      thumbnail: "/images/thumbnail/car.png",
      model: "/objects/car.glb",
      sound: "/sounds/domino_drop.mp3",
      colliders: "trimesh",
      title: "자동차",
      type: "dynamic",
    },
  },
};

export const OBJECT_GROUP_LABELS = {
  [OBJECT_GROUP_NAMES.STATIC]: "Static Object",
  [OBJECT_GROUP_NAMES.DYNAMIC]: "Dynamic Object",
};
