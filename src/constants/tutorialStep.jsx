export const TUTORIAL_STEPS = [
  { message: <>📂 우측 패널을 열어보세요!</>, position: "top" },
  { message: <>🧱 도미노를 선택해보세요!</>, position: "top" },
  {
    message: (
      <>
        🔄 단축키 Q 를 눌러
        <br />
        왼쪽으로 회전시켜보세요!
      </>
    ),
    position: "top",
  },
  {
    message: (
      <>
        🔄 단축키 E 를 눌러
        <br />
        오른쪽으로 회전시켜보세요!
      </>
    ),
    position: "top",
  },
  {
    message: (
      <>
        📍 표시된 위치에 도미노를 1개 놓아보세요!
        <br />
        (삭제 연습을 위해 사용할 도미노예요)
      </>
    ),
    position: "top",
    isShowTargetPlaceholder: true,
    targetPositions: [[0, 0, 0]],
  },
  {
    message: (
      <>
        🗑️ 도미노에 마우스를 올린 뒤,
        <br />
        단축키 X 를 눌러 삭제해보세요!
      </>
    ),
    position: "top",
  },
  {
    message: (
      <>
        📍 표시된 위치에 도미노 3개를 나란히 놓아보세요!
        <br />
        (나중에 밀어서 쓰러뜨릴 도미노들이에요)
      </>
    ),
    position: "top",
    isShowTargetPlaceholder: true,
    targetPositions: [
      [0, 0, 0],
      [0.5, 0, 0],
      [1, 0, 0],
    ],
  },
  { message: <>🎯 표시된 위치에 대포를 놓아보세요!</>, position: "top" },
  { message: <>💣 공을 넣고 대포를 발사해보세요!</>, position: "top" },
  {
    message: (
      <>
        🔁 리셋 버튼을 눌러
        <br />
        다이나믹 오브젝트를 초기화하세요!
      </>
    ),
    position: "bottom",
  },
  {
    message: (
      <>
        🧹 클리어 버튼을 눌러
        <br />
        모든 오브젝트를 삭제하세요!
      </>
    ),
    position: "bottom",
  },
];
