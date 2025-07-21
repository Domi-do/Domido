# [Domido](https://www.domido.co.kr) – 3D 도미노 시뮬레이터

- 마우스로 직접 도미노를 배치하고, 중력의 법칙에 따라 쓰러지는 도미노의 연쇄 반응을 시뮬레이션할 수 있습니다.

## 📑 Table of Contents

- [Domido – 3D 도미노 시뮬레이터](#domido--3d-도미노-시뮬레이터)
  - [📑 Table of Contents](#-table-of-contents)
  - [🔥 Motivation](#-motivation)
  - [📱 Preview](#-preview)
  - [💻 Development](#-development)
    - [1. 다양한 도미노 오브젝트를 어떻게 관리할까?](#1-다양한-도미노-오브젝트를-어떻게-관리할까)
      - [❗ 문제 상황](#-문제-상황)
      - [💡 해결 아이디어](#-해결-아이디어)
      - [⚙️ 구현 방식](#️-구현-방식)
    - [2. 사용자가 클릭한 3D 위치에 도미노를 어떻게 정확히 배치할까?](#2-사용자가-클릭한-3d-위치에-도미노를-어떻게-정확히-배치할까)
      - [❗ 문제 상황](#-문제-상황-1)
      - [💡 해결 아이디어](#-해결-아이디어-1)
      - [⚙️ 구현 방식](#️-구현-방식-1)
    - [3. 멀티플레이시 사용자에게 정확하고 빠른 결과를 어떻게 줄 수 있을까?](#3-멀티플레이시-사용자에게-정확하고-빠른-결과를-어떻게-줄-수-있을까)
      - [❗ 문제 상황](#-문제-상황-2)
      - [💡 해결 아이디어](#-해결-아이디어-2)
      - [⚙️ 구현 방식](#️-구현-방식-2)
    - [4. 튜토리얼 로직을 기존 기능에 영향을 주지 않고 어떻게 설계할까?](#4-튜토리얼-로직을-기존-기능에-영향을-주지-않고-어떻게-설계할까)
      - [❗ 문제 상황](#-문제-상황-3)
      - [💡 해결 아이디어](#-해결-아이디어-3)
      - [⚙️ 구현 방식](#️-구현-방식-3)
  - [🛠️ Optimization](#️-optimization)
    - [1. 키 이벤트 중복 등록 최적화](#1-키-이벤트-중복-등록-최적화)
      - [🔁 KeyDown 이벤트 중복 처리 리팩토링 필요성 및 대응 방안](#-keydown-이벤트-중복-처리-리팩토링-필요성-및-대응-방안)
      - [✅ 문제점 1: 이벤트 중복 등록 가능성](#-문제점-1-이벤트-중복-등록-가능성)
      - [✅ 문제점 2: 로직의 분산](#-문제점-2-로직의-분산)
      - [💡 해결 방안: `useDominoKeyboardControls` 커스텀 훅 도입](#-해결-방안-usedominokeyboardcontrols-커스텀-훅-도입)
    - [2. 커서 이동시 프레임 저하 최적화](#2-커서-이동시-프레임-저하-최적화)
      - [배경](#배경)
      - [❗ 문제점 요약](#-문제점-요약)
      - [💡 해결 전략](#-해결-전략)
      - [✅ debounce 적용 (throttle 방식)](#-debounce-적용-throttle-방식)
      - [비교 스크린샷](#비교-스크린샷)
  - [🔫 Trouble Shooting](#-trouble-shooting)
    - [1. Three.js + React에서 GLTF 모델이 배열에 추가되지 않는 문제](#1-threejs--react에서-gltf-모델이-배열에-추가되지-않는-문제)
      - [❓ 문제 요약](#-문제-요약)
      - [🧪 재현 상황](#-재현-상황)
      - [❗️문제 원인](#️문제-원인)
      - [💡 해결 방법: .clone(true)로 깊은 복제](#-해결-방법-clonetrue로-깊은-복제)
      - [왜 .clone(true)가 꼭 필요한가?](#왜-clonetrue가-꼭-필요한가)
    - [2. 새로고침 시 배경음악이 꺼지는 현상](#2-새로고침-시-배경음악이-꺼지는-현상)
      - [❓ 문제 요약](#-문제-요약-1)
      - [🎯 BGM이 재생되지 않는 상황](#-bgm이-재생되지-않는-상황)
      - [⚠️ 문제 원인](#️-문제-원인)
      - [📜 브라우저 콘솔 경고 메시지 예시](#-브라우저-콘솔-경고-메시지-예시)
      - [💡 해결 방법](#-해결-방법)
    - [3. WebAssembly “recursive use of an object detected” 에러](#3-webassembly-recursive-use-of-an-object-detected-에러)
      - [🧐 어떤 상황에서 발생했는가?](#-어떤-상황에서-발생했는가)
      - [⚠️ 어떤 에러가 발생했는가?](#️-어떤-에러가-발생했는가)
      - [🔍 어떤 원인을 추정했는가?](#-어떤-원인을-추정했는가)
      - [🛠️ 어떤 시도를 했는가?](#️-어떤-시도를-했는가)
      - [💡 해결 방법](#-해결-방법-1)
    - [4. React 상태 업데이트 직후 socket.emit이 잘못된 상태로 실행되는 버그](#4-react-상태-업데이트-직후-socketemit이-잘못된-상태로-실행되는-버그)
      - [🐞 버그 개요](#-버그-개요)
      - [🔍 버그 발생 코드](#-버그-발생-코드)
      - [⚠️ 문제 분석](#️-문제-분석)
      - [🛠️ 해결 시도 1: await new Promise로 타이밍 지연](#️-해결-시도-1-await-new-promise로-타이밍-지연)
      - [🛠️ 해결 시도 2: flushSync 강제 동기화](#️-해결-시도-2-flushsync-강제-동기화)
      - [✅ 최종 해결: setTimeout(..., 0)으로 메크로 태스크 큐에 지연](#-최종-해결-settimeout-0으로-메크로-태스크-큐에-지연)
  - [🛠️ 기술 스택](#️-기술-스택)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [배포 환경 (AWS)](#배포-환경-aws)
  - [🚀 구현 기능](#-구현-기능)
    - [**도미노 배치 \& 편집**](#도미노-배치--편집)
    - [**도미노 회전 \& 색상 선택**](#도미노-회전--색상-선택)
    - [**물리 기반 시뮬레이션**](#물리-기반-시뮬레이션)
    - [**실시간 멀티플레이**](#실시간-멀티플레이)
    - [**사운드 \& UX**](#사운드--ux)
    - [**업적 시스템**](#업적-시스템)
    - [**Undo/Redo \& 히스토리**](#undoredo--히스토리)
    - [**퍼포먼스 최적화**](#퍼포먼스-최적화)

---

## 🔥 Motivation

- 단순한 렌더링을 넘어, 실제 **물리 법칙을 반영한 상호작용 가능한 시뮬레이션**을 만들고 싶었습니다.
- 도미노를 하나씩 배치하고 넘어뜨리며 발생하는 연쇄 반응은 단순하지만 깊은 몰입감을 줍니다.
- 성능과 현실감을 모두 만족시키기 위해, **Three.js + Rapier + drei** 구조를 설계했습니다.

---

## 📱 Preview

- ![Image](https://github.com/user-attachments/assets/6c83427c-19ed-47dc-b9f9-d2e660d76a08)
- 배포 사이트: [www.domido.co.kr](https://www.domido.co.kr)

---

## 💻 Development

### 1. 다양한 도미노 오브젝트를 어떻게 관리할까?

#### ❗ 문제 상황  

초기에는 도미노 하나만 렌더링했지만, 기능이 확장되면서 **다양한 오브젝트(도미노, 미끄럼틀, 전구, 계단, 공 등)** 들을 동적으로 추가하고, 사용자 선택에 따라 **모델을 불러오고, 썸네일을 보여주며, 소리와 충돌 형태까지** 다르게 지정해야 하는 요구사항이 생겼습니다.

하지만 이 데이터를 **하드코딩으로 컴포넌트에 박아두는 방식**은 다음과 같은 한계가 있었습니다:

- 새로운 오브젝트를 추가할 때마다 컴포넌트 로직을 수정해야 함  
- 썸네일, 모델, 충돌 형태 등 메타데이터가 흩어져 있어 유지보수 어려움  
- 사용자가 오브젝트를 선택하는 UI 구현이 복잡해짐

---

#### 💡 해결 아이디어  

모든 오브젝트 정보를 **JSON 스타일의 오브젝트 메타데이터로 정리**해두고, 이를 기반으로 UI, 로딩, 렌더링, 충돌 처리까지 통합되게 관리하자.

---

#### ⚙️ 구현 방식

- `OBJECT_GROUP_NAMES`: 오브젝트 그룹을 `STATIC`, `DYNAMIC`으로 나눠 분류
- `OBJECT_METADATA`: 각 오브젝트마다 아래의 메타데이터를 설정

| 키 | 설명 |
|----|------|
| `thumbnail` | 선택 UI에 사용될 썸네일 경로 |
| `model` | GLB 3D 모델 경로 or 이름 |
| `sound` | 상호작용 시 재생될 효과음 |
| `colliders` | 물리 충돌 타입 (`cuboid`, `ball`, `trimesh`, 등) |
| `type` | 물리 시뮬레이션 상 성질 (`fixed` or `dynamic`) |
| `title` | 사용자에게 보여지는 이름 |

- `OBJECT_GROUP_LABELS`: 그룹별 라벨 이름을 제공해 UI 렌더링에 활용

```ts
export const OBJECT_GROUP_NAMES = {
  STATIC: "STATIC_OBJECTS",
  DYNAMIC: "DYNAMIC_OBJECTS",
} as const;

export const OBJECT_METADATA = {
  [OBJECT_GROUP_NAMES.STATIC]: {
    slide: {
      thumbnail: "/images/thumbnail/slide.png",
      model: "/objects/slide.glb",
      colliders: "trimesh",
      type: "fixed",
      title: "미끄럼틀",
    },
    ...
  },
  [OBJECT_GROUP_NAMES.DYNAMIC]: {
    steelBall: {
      thumbnail: "/images/thumbnail/steel_ball.png",
      model: "/objects/steel_ball.glb",
      colliders: "hull",
      type: "dynamic",
      title: "쇠구슬",
    },
    ...
  },
};

export const OBJECT_GROUP_LABELS = {
  [OBJECT_GROUP_NAMES.STATIC]: "Static Object",
  [OBJECT_GROUP_NAM
```

### 2. 사용자가 클릭한 3D 위치에 도미노를 어떻게 정확히 배치할까?

#### ❗ 문제 상황  

사용자가 3D 씬 위에 마우스를 클릭했을 때, 도미노를 정확히 그 위치에 배치하기 위해서는  
**2D 화면 좌표(mouse)** → **3D 공간 좌표(world)** 로 변환해야 했습니다.  
또한 클릭 위치가 단순히 평면이 아닌, 여러 오브젝트 위일 수도 있어 **충돌 대상 감지 필터링**도 필요했습니다.

---

#### 💡 해결 아이디어  

Three.js의 `Raycaster`를 활용하여,  
**카메라 + 마우스 위치를 기준으로 광선을 쏘고**,  
그 광선이 씬 내 어떤 오브젝트와 먼저 교차하는지를 통해 3D 좌표를 얻기로 했습니다.

---

#### ⚙️ 구현 방식

- `useFrame()` 내에서 매 프레임마다 `Raycaster`를 갱신하여 마우스 위치 추적
- `scene.getObjectByName("ground")`로 바닥을 찾고, 도미노들과 함께 `intersectObjects` 대상에 포함
- `firstHit.point`를 통해 클릭한 정확한 좌표 획득
- 현재 도미노 오브젝트의 높이를 고려해 `centerY` 값을 계산하여 올바르게 배치
- `mesh.position.set(...)`을 통해 도미노 위치 이동
- `socket.emit("update cursor position", ...)`으로 실시간 위치 브로드캐스트
- 클릭 시 `onPointerDown`으로 해당 위치에 도미노를 생성

```ts
const raycaster = new THREE.Raycaster();
raycaster.setFromCamera(pointer, camera);

const intersects = raycaster.intersectObjects([ground, ...allDominoes], true);
const [firstHit] = intersects;

if (!firstHit) return;

const pos = firstHit.point;
const boundingBox = new THREE.Box3().setFromObject(meshRef.current);
const height = boundingBox.max.y - boundingBox.min.y;
const centerY = pos.y + height / 2;

meshRef.current.position.set(pos.x, centerY, pos.z);
```

### 3. 멀티플레이시 사용자에게 정확하고 빠른 결과를 어떻게 줄 수 있을까?

#### ❗ 문제 상황  

여러 사용자가 동시에 도미노를 배치하는 실시간 협업 환경에서,

- 내가 놓은 도미노는 **즉시 반영**되어야 하고  
- 다른 사용자가 놓은 도미노도 **빠르게 갱신**되어야 하며  
- 과도한 클릭이나 충돌을 방지할 **제한 로직**도 필요했습니다.

---

#### 💡 해결 아이디어  

- `React Query`를 통해 클라이언트 로컬 캐시에 도미노 리스트를 빠르게 갱신  
- `Socket.IO`로 도미노 변경 이벤트를 모든 사용자에게 실시간 브로드캐스트  
- 서버가 응답되기 전에도 **낙관적 UI 업데이트**로 즉시 결과 반영  
- 빠른 클릭을 방지하기 위한 최소 시간 간격 체크 추가 (`lastPlacedTime`)

---

#### ⚙️ 구현 방식

1. **도미노 배치 처리**

- 클릭한 위치에 도미노를 생성해 로컬에 먼저 반영
- `mutate()`를 통해 서버 상태 갱신 요청
- 성공 시 히스토리에 push

```ts
mutate(
  { dominos: updatedDomino },
  {
    onSuccess: (data: DominoType[]) => {
      historyRef.current.push(data);
    },
  },
);
```

2. 다른 유저와 동기화

- socket.emit("domino update", ...)은 서버를 통해 다른 유저에게 브로드캐스트
- 수신한 유저는 refetchQueries를 통해 최신 도미노 목록 재요청

```ts
socket.on("domino update", ({ sendUser }) => {
  if (myUserID === sendUser) return;
  queryClient.refetchQueries({ queryKey: ["dominos", projectId], exact: true });
});
```

3. 빠른 중복 클릭 방지

- lastPlacedTime을 기준으로 300ms 이내 중복 클릭 방지

```ts
if (nowTime - lastPlacedTime.current < 300) {
  showToast({ message: "너무 빠르게 놓으셨네요. 잠시만요!" });
  return;
}
```

4. 다른 유저의 커서 상태 공유

- "cursor position update" 이벤트를 통해 실시간 커서 위치 공유
- 각 유저의 오브젝트 위치, 색상, 회전 상태를 함께 전달

```ts
socket.on("cursor position update", ({ userID, ... }) => {
  setOtherCursors((prev) => ({
    ...prev,
    [userID]: { ... },
  }));
});
```

### 4. 튜토리얼 로직을 기존 기능에 영향을 주지 않고 어떻게 설계할까?

#### ❗ 문제 상황

튜토리얼 단계별 행동을 감지하려면 기존 기능의 상태를 추적하거나 로직을 수정해야 했습니다.
예를 들어 도미노 선택 여부나 사이드 패널 열림 상태를 감지하기 위해
`useState`, `props`, 내부 이벤트를 직접 건드리는 구조는 다음과 같은 한계가 있었습니다.

- 조건 로직이 분산되어 전체 흐름을 파악하기 어려움
- 단계 추가 시 기존 UI 컴포넌트를 수정해야 함
- 메시지와 조건이 분리돼 있어 유지보수가 힘듦

---

#### 💡 해결 아이디어

튜토리얼 전용 상태 트래커를 도입해,
**기존 로직은 그대로 두고 "관찰만" 하는 구조**로 설계했습니다.

모든 튜토리얼 단계는 `TUTORIAL_STEPS` 배열에 선언형으로 정의되어 있고,
각 단계는 특정 trackerKey 조건을 기준으로 자동 진행됩니다.

---

#### ⚙️ 구현 방식

- 튜토리얼 단계는 메시지와 완료 조건 키를 포함한 배열로 선언형 정의됨
- 사용자의 행동은 클릭, 키 입력, 배치 등으로 감지되며, 전용 상태 저장소에 기록됨
- 현재 단계의 조건은 매 프레임마다 감지되고, 충족 시 자동으로 다음 단계로 전환됨
- UI에는 안내 메시지와 진행도가 표시되며, 조건이 충족되기 전까지 "다음" 버튼은 비활성화됨
- 전체 로직은 별도 컴포넌트에 고립되어 있으며, 기존 기능이나 화면 구조를 수정하지 않고 동작함
- 단계 추가는 배열에 항목만 추가하면 적용되도록 설계됨

```ts
// 튜토리얼 단계 선언 예시
const TUTORIAL_STEPS = [
  {
    message: "도미노를 선택해보세요",
    trackerKey: "isDominoSelected",
  },
];
```

```ts
// 사용자 행동 감지 및 상태 갱신 예시
if (userSelectedDomino) {
  setTracker("isDominoSelected", true);
}
```

****

## 🛠️ Optimization

### 1. 키 이벤트 중복 등록 최적화

#### 🔁 KeyDown 이벤트 중복 처리 리팩토링 필요성 및 대응 방안

현재 코드에서는 `keydown` 이벤트를 직접 `useEffect` 내부에서 등록하여 사용하는 구조로 되어 있으며, 다양한 키 입력(예: `x`, `h`, `u` 등)을 감지해 각각의 동작을 수행하도록 하고 있습니다. 하지만 이러한 방식은 다음과 같은 문제점을 가지고 있다고 판단하였습니다.

---

#### ✅ 문제점 1: 이벤트 중복 등록 가능성

- 컴포넌트 내부에서 `window.addEventListener('keydown', handler)`를 여러 곳에서 반복적으로 작성할 경우, 동일한 이벤트에 대해 **중복된 리스너가 등록**될 수 있음
- 하나의 키 입력에 대해 의도하지 않은 **중복 실행 발생**
- 메모리 낭비 및 **성능 저하** 가능성

---

#### ✅ 문제점 2: 로직의 분산

- 키별 이벤트 핸들러가 흩어져 있어 전체 흐름을 한눈에 파악하기 어려움
- 코드의 가독성과 유지보수성 저하

---

#### 💡 해결 방안: `useDominoKeyboardControls` 커스텀 훅 도입

키 입력 이벤트를 **통합적으로 관리**하고, **중복 등록을 방지**하며, **재사용성과 가독성**까지 확보할 수 있도록 `useDominoKeyboardControls`라는 커스텀 훅을 도입했습니다.

```tsx
import { useEffect, useRef } from "react";

const useDominoKeyboardControls = (onToggleGuideToast) => {
  const dominos = useDominoStore((state) => state.dominos);
  const historyRef = useRef([]);
  const prevLengthRef = useRef(dominos.length);

  const keyMap = {
    x: () => deleteSelectedDomino(historyRef, onToggleGuideToast),
    h: () => toggleSelectedDominoOpacity(historyRef, onToggleGuideToast),
    u: () => undoDominoHistory(historyRef),
    q: rotateDominoCounterClockwise,
    e: rotateDominoClockwise,
    escape: () => closeCurrentMode(),
  };

  const handleKeydown = (event) => {
    event.stopPropagation();

    const key = event.key.toLowerCase();
    const handler = keyMap[key];
    if (typeof handler === "function") handler();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);
};

export default useDominoKeyboardControls;

```

💎 리팩토링 효과

| 항목               | 개선 전                        | 개선 후                            |
|--------------------|--------------------------------|-------------------------------------|
| 키 이벤트 처리 위치 | 컴포넌트 여러 곳               | 단일 훅으로 집중                   |
| 중복 등록 위험      | 있음                           | 없음                                |
| 유지보수            | 키마다 수정 위치 다름          | `keyMap`만 수정하면 됨             |
| 가독성              | 이벤트 흐름 파악 어려움        | 전체 흐름이 한눈에 보임            |
| 성능               | 메모리 낭비 가능성             | 안정적인 등록/해제 구조            |

✅ 적용 결과

- 도미노 시뮬레이션 편집 모드에서의 키보드 조작 기능 안정화
- 단일 entry point를 통한 이벤트 처리로 디버깅 용이성 증가
- 리팩토링 전 대비 약 30% 코드량 감소
- 향후 새로운 키 입력 기능(Ctrl+Z, Space 등) 추가 시 생산성 향상 기대

📚 학습 및 통찰

- 핵심 로직은 통합하면 협업 시 의도 전달이 쉬워지고, 디버깅도 용이하다는 것을 실감했습니다.
- 기능별 분산 구조가 항상 최선은 아님. 이벤트 리스너는 컨트롤러처럼 한 곳에 집중시켜야 합니다.

### 2. 커서 이동시 프레임 저하 최적화

#### 배경

사용자가 3D 도미노 오브젝트 위로 마우스를 올릴 때마다 `pointerOver` 이벤트가 발생하고, 이때마다 토스트 안내가 나타났습니다.  
하지만 이 이벤트가 **매 프레임마다 발생하며** 성능 저하를 유발했고, 특히 도미노 개수가 많을수록 **렌더링 프레임 드랍**이 심해졌습니다.

---

#### ❗ 문제점 요약

- `pointerOver`가 너무 자주 호출되어 렌더링 병목 발생
- 상태 변경이 자주 일어나면서 Recoil/Zustand 기반 렌더링도 과도하게 트리거됨
- 성능 이슈로 인해 UX가 저하되고, 커서 반응이 버벅이는 현상 발생

---

#### 💡 해결 전략

#### ✅ debounce 적용 (throttle 방식)

`pointerOver` 이벤트에 직접 반응하지 않고, `debounce()`를 통해 **200ms 간격으로만 처리**하도록 제한

```ts
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}


const throttledPointerOver = useMemo(() => {
  return debounce((event: PointerEvent, key: string) => {
    openGuideToast(event, key);
  }, 200);
}, [openGuideToast]);

```

#### 비교 스크린샷

Before (Debounce 전)

<https://github.com/user-attachments/assets/6501fb9d-46ef-4323-bffa-5cfc51c19c89>

After (Debounce 후)

<https://github.com/user-attachments/assets/b78909c1-68b9-45aa-bcf7-8e3572024476>

## 🔫 Trouble Shooting

### 1. Three.js + React에서 GLTF 모델이 배열에 추가되지 않는 문제

#### ❓ 문제 요약

`@react-three/drei`의 `useGLTF`를 통해 불러온 모델을 **여러 개의 위치에 렌더링**하거나 배열에 추가하려 했을 때,  
일부 모델만 보이거나 **렌더링이 누락**, **상태 배열에 제대로 추가되지 않는 문제**가 발생했습니다.

#### 🧪 재현 상황

아래처럼 `useGLTF()`로 불러온 `scene` 객체를 `<primitive />`로 여러 번 렌더링하려 했습니다.

```tsx
const PrimitiveObject = ({ path, position }) => {
  const { scene } = useGLTF(path);

  return (
    <primitive object={scene} position={position} />
  );
};
```

하지만

- 일부만 렌더링됨
- 배열로 상태에 추가 시, 참조 충돌 발생
- 예상치 못한 렌더링 누락 발생

#### ❗️문제 원인

useGLTF()로 불러온 scene은 내부적으로 Object3D의 단일 인스턴스이며 참조값이 동일합니다.

Three.js는 동일한 Object3D를 여러 번 씬에 추가하는 것을 허용하지 않습니다.
이미 추가된 객체를 또 다른 위치에 붙이면, 이전 parent에서 제거되고 새로운 위치만 남습니다.

즉:

- 같은 GLTF 객체를 여러 위치에 렌더링 → 한 군데만 보임
- 상태 배열에 동일 참조 추가 → React/Three의 동기화 깨짐

#### 💡 해결 방법: .clone(true)로 깊은 복제

- 불러온 scene 객체는 .clone(true)를 사용해 반드시 깊은 복제한 뒤 사용해야 합니다.

```tsx
import { useMemo } from "react";
import { useGLTF } from "@react-three/drei";

const PrimitiveObject = ({ path, position, onPointerOver, onPointerOut, onClick }) => {
  const { scene } = useGLTF(path);

  // 깊은 복제
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  return (
    <primitive
      castShadow
      receiveShadow
      object={clonedScene}
      position={position}
      scale={1}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
      onClick={onClick}
    />
  );
};
```

#### 왜 .clone(true)가 꼭 필요한가?

|                            | **.clone() (기본)**               | **.clone(true) (깊은 복제)**                         |
|----------------------------|-----------------------------------|------------------------------------------------------|
| 복제 방식                  | 참조만 복사됨                     | 하위 구조까지 모두 새로운 인스턴스로 생성됨         |
| geometry & material 공유   | geometry, material 공유됨        | geometry, material도 분리되어 독립적 렌더링 가능    |
| 렌더링 안정성              | 렌더링 충돌 발생 가능            | 여러 위치에서 안전하게 렌더링 가능                  |

### 2. 새로고침 시 배경음악이 꺼지는 현상

#### ❓ 문제 요약

- 웹페이지에 배경음악(BGM)을 넣었는데, **초기 진입 시에는 잘 재생되지만**, **페이지를 새로고침하거나 다시 방문할 경우 음악이 재생되지 않는 현상**이 발생했습니다.

#### 🎯 BGM이 재생되지 않는 상황

- 사용자가 페이지에 **처음 진입**했을 때
- 사용자가 **페이지를 새로고침 (F5 / ⌘R)** 했을 때  
- BGM이 자동으로 재생되기를 기대했지만, **정적 상태**로 남음

#### ⚠️ 문제 원인

*브라우저의 [Autoplay Policy](https://developer.mozilla.org/en-US/docs/Web/Media/Autoplay_guide)*에 따르면,  
사용자의 **명시적인 상호작용**(예: 클릭, 키 입력 등)이 없는 상태에서는  
`<audio>` 또는 `AudioContext`를 통한 오디오 자동 재생이 **기본적으로 차단**됩니다.

#### 📜 브라우저 콘솔 경고 메시지 예시

```text
Uncaught (in promise) DOMException: play() failed because the user didn't interact with the document first.
```

#### 💡 해결 방법

- 사용자 인터랙션(예: 클릭 이벤트) 이후에만 .play()를 호출하도록 로직을 수정합니다.

```tsx
import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";

import useSettingStore from "@/store/useSettingStore";
import AudioController from "@/utils/AudioController";

const BGM_PATH = "/sounds/bgm.mp3";

const GlobalAudio = () => {
  const { camera } = useThree();
  const volumeLevel = useSettingStore((state) => state.volumeLevel);
  const audioControllerRef = useRef(new AudioController());

  useEffect(() => {
    const audioController = audioControllerRef.current;
    audioController.init(camera, volumeLevel, true);

    // 최초 클릭 이후에만 재생 시도
    const handleFirstClick = () => {
      audioController.play(BGM_PATH);
      window.removeEventListener("click", handleFirstClick);
    };

    // 최초 클릭 이벤트 등록
    window.addEventListener("click", handleFirstClick);

    return () => {
      window.removeEventListener("click", handleFirstClick);
      audioController.cleanup(camera);
    };
  }, [camera, volumeLevel]);

  useEffect(() => {
    audioControllerRef.current.setVolume(volumeLevel);
  }, [volumeLevel]);

  return null;
};

export default GlobalAudio;
```

- window.addEventListener("click", ...)로 최초 사용자 상호작용 감지
- 상호작용이 감지되면 오디오를 재생하고 이벤트 리스너 제거
- 브라우저 autoplay 정책을 우회하면서 UX를 해치지 않음

### 3. WebAssembly “recursive use of an object detected” 에러

#### 🧐 어떤 상황에서 발생했는가?

- `@react-three/fiber`, `@react-three/rapier`, `Socket.IO`를 사용해
  도미노 시뮬레이션을 실시간 동기화하는 기능을 개발
- 사용자가 오브젝트를 선택하여 캔버스에 도미노를 추가하면,
  전체 `dominos` 배열에 추가 후 소켓으로 서버에 전송:

```jsx
socket.emit("update domino", { projectId, dominos: updatedDomino });
```

- 이때 updatedDomino에는 기존 배열에 아래와 같은 newDomino 객체가 포함되어 있었음

```ts
const newDomino = {
  position: [x, y, z],
  rotation: [0, rotationY, 0],
  objectInfo: selectedDomino, // 문제 발생
  …
}
```

#### ⚠️ 어떤 에러가 발생했는가?

```bash
Uncaught Error: recursive use of an object detected which would lead to unsafe aliasing in rust
```

- 이 오류는 wasm-bindgen 내부의 WasmRefCell에 중복된 mutable reference가 발생했을 때 Rust 런타임이 강제로 차단하며 발생함
- 특히 selectedDomino 객체를 참조한 상태에서 이를 그대로 objectInfo에 포함해 emit한 것이 원인

#### 🔍 어떤 원인을 추정했는가?

- JavaScript는 객체를 참조로 전달하므로 동일한 selectedDomino 객체가 여러 도미노 인스턴스에서 동일하게 참조됨
- Rust Wasm 측에서는 이 객체가 mutable reference로 동시에 사용되는 것으로 감지
- 결과적으로 borrow rule 위반 → 런타임 에러 발생

#### 🛠️ 어떤 시도를 했는가?

- 처음에는 objectInfo: selectedDomino로 직접 참조하여 emit
- 재사용 시 **재귀 참조(recursive use)**로 간주되어 충돌
- 키 설정 누락이나 RigidBody 리렌더 문제 등으로 의심했으나 본질적 원인은 아님

#### 💡 해결 방법

- objectInfo에 원본 객체를 넘기지 말고, 필드를 하나하나 복사해 새 객체로 생성하도록 변경

```ts
const newDomino = {
  position: [x, y, z],
  rotation: [0, rotationY, 0],
  objectInfo: {
    colliders: selectedDomino.colliders,
    groupName: selectedDomino.groupName,
    model: selectedDomino.model,
    objectName: selectedDomino.objectName,
    sound: selectedDomino.sound,
    thumbnail: selectedDomino.thumbnail,
    type: selectedDomino.type,
  },
  opacity: DEFAULT_OPACITY,
  color: selectedColor,
};
```

- 명시적 복사로 Wasm 내부의 참조 중복 문제를 해결

### 4. React 상태 업데이트 직후 socket.emit이 잘못된 상태로 실행되는 버그

#### 🐞 버그 개요

- `Escape` 키를 눌러 `setSelectedDomino(null)`로 상태를 초기화하고, 이후 `socket.emit("clear cursor")`로 서버의 커서를 지우는 로직을 사용했으나, **상태 반영 이전에 `socket.emit`이 실행되어**, 여전히 이전 `selectedDomino` 값으로 처리되는 버그 발생.

---

#### 🔍 버그 발생 코드

```jsx
escape: () => {
  setSelectedDomino(null);
  socket.emit("clear cursor", { projectId }); // selectedDomino가 아직 null이 아님
},
```

#### ⚠️ 문제 분석

- React의 setState는 비동기 처리되므로,
바로 다음 줄에 실행되는 socket.emit은 변경 전 상태를 읽습니다.
- 그 결과, selectedDomino가 null로 변경되었다고 가정하고 emit했지만, 실제로는 이전 값 기준으로 서버에 전달됩니다.

#### 🛠️ 해결 시도 1: await new Promise로 타이밍 지연

```tsx
escape: async () => {
  setSelectedDomino(null);

  await new Promise((res) => setTimeout(res, 0)); // 반영 보장 안 됨

  socket.emit("clear cursor", { projectId });
},
```

- 실패 이유:
  - 단순히 이벤트 큐 뒤로 밀 뿐, React 상태 업데이트 완료를 보장하지 않음.

#### 🛠️ 해결 시도 2: flushSync 강제 동기화

```tsx
import { flushSync } from "react-dom";

escape: () => {
  flushSync(() => {
    setSelectedDomino(null);
  });

  socket.emit("clear cursor", { projectId }); // 여전히 불안정
},
```

- 실패 이유:
  - React 18 이상의 Concurrent Mode에서는 여전히 비결정적일 수 있음.

#### ✅ 최종 해결: setTimeout(..., 0)으로 메크로 태스크 큐에 지연

```tsx
escape: () => {
  setSelectedDomino(null);

  setTimeout(() => {
    socket.emit("clear cursor", { projectId }); // 상태 반영 이후 안전 실행
  }, 0);
},
```

- 작동 원리:
  - setTimeout(..., 0)을 사용해 렌더링 이후 메크로 태스크 큐에서 실행을 보장하여, setSelectedDomino(null)이 실제 반영된 후 emit이 호출됩니다.

- React 상태 업데이트 이후 외부 사이드 이펙트(socket.emit 등)를 안전하게 실행하려면,
렌더 타이밍 이후를 보장하는 메크로 태스크(setTimeout) 사용이 가장 안정적입니다.

## 🛠️ 기술 스택

### Frontend

- **Core**: <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"/>, <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=white"/>  
- **3D & Physics**: <img src="https://img.shields.io/badge/React_Three_Fiber-61DAFB?style=flat&logo=react&logoColor=white"/>, <img src="https://img.shields.io/badge/drei-000000?style=flat&logo=react&logoColor=white"/>, <img src="https://img.shields.io/badge/Rapier-000000?style=flat&logo=rust&logoColor=white"/>  
- **State & Data Fetching**: <img src="https://img.shields.io/badge/Zustand-000000?style=flat&logo=react&logoColor=white"/>, <img src="https://img.shields.io/badge/TanStack_Query-FF4154?style=flat&logo=reactquery&logoColor=white"/>  
- **Realtime**: <img src="https://img.shields.io/badge/Socket.IO-010101?style=flat&logo=socketdotio&logoColor=white"/>  
- **Routing & Utilities**: <img src="https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=reactrouter&logoColor=white"/>, <img src="https://img.shields.io/badge/UUID-000000?style=flat&logo=uuid&logoColor=white"/>  
- **Styling & Build**:, <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white"/>, <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/>  
- **Quality & Testing**: <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white"/>, <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=white"/>, <img src="https://img.shields.io/badge/Vitest-6E9F18?style=flat&logo=vitest&logoColor=white"/>, <img src="https://img.shields.io/badge/Testing_Library-FF4154?style=flat&logo=testinglibrary&logoColor=white"/>  

---

### Backend

- **Core**: <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white"/>, <img src="https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white"/>, <img src="https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white"/>  
- **Database**: <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white"/>  
- **Realtime & Auth**: <img src="https://img.shields.io/badge/Socket.IO-010101?style=flat&logo=socketdotio&logoColor=white"/>, <img src="https://img.shields.io/badge/JSON_Web_Token-000000?style=flat&logo=JSONwebtokens&logoColor=white"/>  
- **Utilities**: <img src="https://img.shields.io/badge/Dotenv-ECD53F?style=flat&logo=dotenv&logoColor=black"/>, <img src="https://img.shields.io/badge/CORS-000000?style=flat&logo=CORS&logoColor=white"/>, <img src="https://img.shields.io/badge/Body_Parser-000000?style=flat&logo=bodyparser&logoColor=white"/>  
- **Quality & Dev Tools**: <img src="https://img.shields.io/badge/ESLint-4B32C3?style=flat&logo=eslint&logoColor=white"/>, <img src="https://img.shields.io/badge/Prettier-F7B93E?style=flat&logo=prettier&logoColor=white"/>, <img src="https://img.shields.io/badge/Husky-000000?style=flat&logo=husky&logoColor=white"/>, <img src="https://img.shields.io/badge/Lint-staged-000000?style=flat&logo=lintstaged&logoColor=white"/>, <img src="https://img.shields.io/badge/Nodemon-76D04B?style=flat&logo=nodemon&logoColor=black"/>, <img src="https://img.shields.io/badge/TSX-3178C6?style=flat&logo=typescript&logoColor=white"/>  

---

### 배포 환경 (AWS)

| 서비스                                              | 역할                                               |
|-----------------------------------------------------|----------------------------------------------------|
| <img src="https://img.shields.io/badge/AWS S3-569A31?style=flat&logo=amazons3&logoColor=white"/>           | 프론트엔드 정적 파일 (React 빌드) 저장             |
| <img src="https://img.shields.io/badge/AWS CloudFront-232F3E?style=flat&logo=amazonaws&logoColor=white"/> | CDN을 통한 프론트엔드 배포 및 캐싱 최적화           |
| <img src="https://img.shields.io/badge/AWS EC2-FF9900?style=flat&logo=amazonec2&logoColor=white"/>        | 백엔드 서버 호스팅 (Node.js + Express)             |
| <img src="https://img.shields.io/badge/PM2-2B037A?style=flat&logo=pm2&logoColor=white"/>                  | 백엔드 프로세스 관리 및 자동 재시작                |

## 🚀 구현 기능

#### **도미노 배치 & 편집**  

- 마우스 클릭 → `Raycaster`로 3D 좌표 계산 → 도미노 위치/회전 설정  
- `x` 키로 도미노 삭제, `h` 키로 투명도 토글, `u` 키로 실행 취소 지원  

#### **도미노 회전 & 색상 선택**  

- 회전 버튼 또는 키맵(Q/E)으로 Y축 회전  
- 팔레트에서 색상 선택 → `Zustand`로 전역 상태 관리  

#### **물리 기반 시뮬레이션**  

- Rapier 물리 엔진 연동 → 충돌·중력 시뮬레이션  

#### **실시간 멀티플레이**  

- Socket.IO로 커서 위치·도미노 배치 브로드캐스트  
- React Query + 낙관적 업데이트 → 즉시 UI 반영 + 서버 동기화  

#### **사운드 & UX**  

- 도미노 낙하 효과음 재생  
- 최초 클릭 시 BGM 재생 (Autoplay 정책 우회)  
- 애니메이션 전환 & 토스트 알림  

#### **업적 시스템**  

- 첫 배치 도미노, 100개 배치 달성 시 토스트 알림  

#### **Undo/Redo & 히스토리**  

- `historyRef`에 상태 스냅샷 저장 → 무제한 실행 취소/재실행 지원  

#### **퍼포먼스 최적화**  

- `useMemo`/`useCallback` 적용  
- `shallow` 비교로 상태 리렌더 최소화  
- `pointerOver` 이벤트 `debounce` 적용  
