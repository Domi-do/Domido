export const TRACKER_KEYS = {
  SIDE_PANEL_OPEN: "isSidePanelOpen",
  DOMINO_SELECTED: "isDominoSelected",
  ROTATED_LEFT: "hasRotatedDominoLeft",
  ROTATED_RIGHT: "hasRotatedDominoRight",
  PLACED_FOR_DELETE: "placedDominoForDelete",
  DELETED_DOMINO: "hasDeletedDomino",
  PLACED_FOR_KNOCK: "placedDominoForKnock",
  CANNON_TRIGGERED: "cannonSensorTriggered",
};

export const TUTORIAL_STEPS = [
  { message: <>📂 우측 패널을 열어보세요!</>, trackerKey: TRACKER_KEYS.SIDE_PANEL_OPEN },
  { message: <>🧱 도미노를 선택해보세요!</>, trackerKey: TRACKER_KEYS.DOMINO_SELECTED },
  {
    message: (
      <>
        🔄 단축키 Q 를 눌러
        <br />
        왼쪽으로 회전시켜보세요!
      </>
    ),
    trackerKey: TRACKER_KEYS.ROTATED_LEFT,
  },
  {
    message: (
      <>
        🔄 단축키 E 를 눌러
        <br />
        오른쪽으로 회전시켜보세요!
      </>
    ),
    trackerKey: TRACKER_KEYS.ROTATED_RIGHT,
  },
  {
    message: (
      <>
        📍 표시된 곳에 도미노를 놓아보세요!
        <br />
        <span className="text-xs text-gray-400">(삭제 연습용이에요)</span>
      </>
    ),
    isShowTargetPlaceholder: true,
    requiredObjectName: "defaultObject",
    targetPositions: [[0, 0, 0]],
    trackerKey: TRACKER_KEYS.PLACED_FOR_DELETE,
  },
  {
    message: (
      <>
        🗑️ 도미노에 마우스를 올린 뒤,
        <br />
        단축키 X 를 눌러 삭제해보세요!
      </>
    ),
    trackerKey: TRACKER_KEYS.DELETED_DOMINO,
  },
  {
    message: (
      <>
        📍 도미노 3개를 나란히 놓아보세요!
        <br />
        <span className="text-xs text-gray-400">(곧 쓰러뜨릴 도미노예요)</span>
      </>
    ),
    isShowTargetPlaceholder: true,
    requiredObjectName: "defaultObject",
    targetPositions: [
      [0, 0, 0],
      [0.5, 0, 0],
      [1, 0, 0],
    ],
    trackerKey: TRACKER_KEYS.PLACED_FOR_KNOCK,
  },
  {
    message: <>💣 공을 넣고 대포를 발사해보세요!</>,
    isCannonPlacementStep: true,
    trackerKey: TRACKER_KEYS.CANNON_TRIGGERED,
  },
];
