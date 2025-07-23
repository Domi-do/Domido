<div align="center">

![compressed_image_under_1MB (1)](https://github.com/user-attachments/assets/b78436a3-0832-4696-b9ce-71a4e1e6f4a6)

**Domido - 3D 도미노 시뮬레이터**

마우스로 직접 도미노를 배치하고, 중력의 법칙에 따라 쓰러지는 도미노의 연쇄 반응을 시뮬레이션할 수 있습니다.

</div>

## 목차

- [Domido - 3D 도미노 시뮬레이터](#domido---3d-도미노-시뮬레이터)
  - [목차](#목차)
  - [주요 기능](#주요-기능)
  - [기술 스택](#기술-스택)
  - [개발 과정](#개발-과정)
    - [1. 다양한 도미노 오브젝트를 어떻게 관리할까?](#1-다양한-도미노-오브젝트를-어떻게-관리할까)
    - [2. 사용자가 클릭한 3D 위치에 도미노를 어떻게 정확히 배치할까?](#2-사용자가-클릭한-3d-위치에-도미노를-어떻게-정확히-배치할까)
    - [3. 멀티플레이시 사용자에게 정확하고 빠른 결과를 어떻게 줄 수 있을까?](#3-멀티플레이시-사용자에게-정확하고-빠른-결과를-어떻게-줄-수-있을까)
    - [4. 튜토리얼 로직을 기존 기능에 영향을 주지 않고 어떻게 설계할까?](#4-튜토리얼-로직을-기존-기능에-영향을-주지-않고-어떻게-설계할까)
    - [5. 단축키 하나에 모든 도미노가 반응한다고? React key 문제 해결기](#5-단축키-하나에-모든-도미노가-반응한다고-react-key-문제-해결기)
  - [🔧 트러블슈팅 기록서](#-트러블슈팅-기록서)
    - [이슈 #1: \[WebAssembly "recursive use of an object detected" 에러\]](#-이슈-1-webassembly-recursive-use-of-an-object-detected-에러)
    - [이슈 #2: \[React 상태 업데이트 직후 socket.emit이 잘못된 상태로 실행되는 버그\]](#-이슈-2-react-상태-업데이트-직후-socketemit이-잘못된-상태로-실행되는-버그)
    - [이슈 #3: \[DominoHUD 노출 타이밍 제어: Suspense와 상태 관리 기반 해결\]](#-이슈-3-dominohud-노출-타이밍-제어-suspense와-상태-관리-기반-해결)
  - [🔥 최적화](#-최적화)
    - [도미노 상태, 누가 책임지는 게 맞을까?](#-도미노-상태-누가-책임지는-게-맞을까)
    - [입력과 렌더링 사이, 그 지연을 줄일 수는 없을까?](#-입력과-렌더링-사이-그-지연을-줄일-수는-없을까)
    - [다양한 오브젝트, 어떻게 더 빠르게 보여줄 수 있을까?](#-다양한-오브젝트-어떻게-더-빠르게-보여줄-수-있을까)
    - [여러 키 입력을 한 곳에서, 깔끔하게 관리할 수 없을까?](#-여러-키-입력을-한-곳에서-깔끔하게-관리할-수-없을까)
    - [커서만 움직였을 뿐인데, 왜 프레임이 떨어질까?](#-커서만-움직였을-뿐인데-왜-프레임이-떨어질까)

## 주요 기능

### 핵심 게임플레이

<table>
<tr>
<td width="45%">

- **3D 도미노 배치**: 마우스 클릭으로 정확한 위치에 배치
- **물리 시뮬레이션**: 중력과 충돌을 통한 현실적인 연쇄 반응
- **다양한 오브젝트**: 12가지 이상의 다양한 3D 오브젝트
- **실시간 멀티플레이**: 최대 4명까지 동시 협업

</td>
<td width="55%">

![Image](https://github.com/user-attachments/assets/6c83427c-19ed-47dc-b9f9-d2e660d76a08)

</td>
</tr>
</table>

### 커스터마이징

<table>
<tr>
<td width="45%">

- **색상 변경**: 9가지 색상 팔레트로 도미노 커스터마이징 기능
- **테마 변경**: 정원, 바다, 밤 테마로 배경 변경
- **음량 조절**: 배경음악과 효과음 개별 조절

</td>
<td width="55%">

![녹화_2025_07_23_17_03_29_833 (2)](https://github.com/user-attachments/assets/a48bbc64-3918-4cdc-8b85-e37d198e1ef2)

</td>
</tr>
</table>

### 협업 기능

<table>
<tr>
<td width="45%">

- **실시간 동기화**: 다른 사용자의 도미노 배치 실시간 반영
- **커서 추적**: 다른 사용자의 마우스 커서 실시간 표시
- **프로젝트 공유**: 초대 코드를 통한 프로젝트 공유 및 참여

</td>
<td width="55%">

![화면-기록-2025-07-23-오후-5 02 09](https://github.com/user-attachments/assets/70660232-d9dc-41f3-8be4-57b88a5a277c)

</td>
</tr>
</table>

<br>

## 기술 스택

### Frontend

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

![Three.js](https://img.shields.io/badge/three.js-black?style=for-the-badge&logo=three.js&logoColor=white) ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Zustand](https://img.shields.io/badge/Zustand-764ABC?style=for-the-badge&logo=redux&logoColor=white)

![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white) ![React Icons](https://img.shields.io/badge/React_Icons-61DAFB?style=for-the-badge&logo=react&logoColor=black)

### Backend

![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens) ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=for-the-badge&logo=nodemon&logoColor=white)

### 개발 도구

![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E) ![Husky](https://img.shields.io/badge/husky-000000?style=for-the-badge&logo=husky&logoColor=white) ![Vitest](https://img.shields.io/badge/vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white) ![Git](https://img.shields.io/badge/git-%23F05032.svg?style=for-the-badge&logo=git&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

<br>

## 개발 과정

### 1. 다양한 도미노 오브젝트를 어떻게 관리할까?

초기에는 도미노 하나만 렌더링했지만, 기능이 확장되면서 **다양한 오브젝트(도미노, 미끄럼틀, 전구, 계단, 공 등)** 들을 동적으로 추가하고, 사용자 선택에 따라 **모델을 불러오고, 썸네일을 보여주며, 소리와 충돌 형태까지** 다르게 지정해야 하는 요구사항이 생겼습니다.

하지만 이 데이터를 **하드코딩으로 컴포넌트에 박아두는 방식**은 다음과 같은 한계가 있었습니다:

- 새로운 오브젝트를 추가할 때마다 컴포넌트 로직을 수정해야 함
- 썸네일, 모델, 충돌 형태 등 메타데이터가 흩어져 있어 유지보수 어려움
- 사용자가 오브젝트를 선택하는 UI 구현이 복잡해짐

### 💡 해결 아이디어

모든 오브젝트 정보를 **JSON 스타일의 오브젝트 메타데이터로 정리**해두고, 이를 기반으로 UI, 로딩, 렌더링, 충돌 처리까지 통합되게 관리하도록 구현했습니다.

### ⚙️ 적용 방식

- `OBJECT_GROUP_NAMES`: 오브젝트 그룹을 `STATIC`, `DYNAMIC`으로 나누어 분류
- `OBJECT_METADATA`: 각 오브젝트마다 아래의 메타데이터를 설정
- `OBJECT_GROUP_LABELS`: 그룹별 라벨 이름을 제공하여 UI 렌더링에 활용

| 키          | 설명                                             |
| ----------- | ------------------------------------------------ |
| `thumbnail` | 선택 UI에 사용될 썸네일 경로                     |
| `model`     | GLB 3D 모델 경로 or 이름                         |
| `sound`     | 상호작용 시 재생될 효과음                        |
| `colliders` | 물리 충돌 타입 (`cuboid`, `ball`, `trimesh`, 등) |
| `type`      | 물리 시뮬레이션 상 성질 (`fixed` or `dynamic`)   |
| `title`     | 사용자에게 보여지는 이름                         |

---

### 2. 사용자가 클릭한 3D 위치에 도미노를 어떻게 정확히 배치할까?

사용자가 3D 씬 위에 마우스를 클릭했을 때, 도미노를 정확히 그 위치에 배치하기 위해서는  
**2D 화면 좌표(mouse)** → **3D 공간 좌표(world)** 로 변환해야 했습니다.  
또한 클릭 위치가 단순히 평면이 아닌, 여러 오브젝트 위일 수도 있어 **충돌 대상 감지 필터링**도 필요했습니다.

### 💡 해결 아이디어

Three.js의 `Raycaster`를 활용하여,  
**카메라 + 마우스 위치를 기준으로 광선을 쏘고**,  
그 광선이 씬 내 어떤 오브젝트와 먼저 교차하는지를 통해 3D 좌표를 얻기로 했습니다.

### ⚙️ 적용 방식

- `useFrame()` 내에서 매 프레임마다 `Raycaster`를 갱신하여 마우스 위치 추적
- `scene.getObjectByName("ground")`로 바닥을 찾고, 도미노들과 함께 `intersectObjects` 대상에 포함
- `firstHit.point`를 통해 클릭한 정확한 좌표 획득
- 현재 도미노 오브젝트의 높이를 고려해 `centerY` 값을 계산하여 올바르게 배치
- `mesh.position.set(...)`을 통해 도미노 위치 이동
- `socket.emit("update cursor position", ...)`으로 실시간 위치 브로드캐스트
- 클릭 시 `onPointerDown`으로 해당 위치에 도미노를 생성

---

### 3. 멀티플레이시 사용자에게 정확하고 빠른 결과를 어떻게 줄 수 있을까?

여러 사용자가 동시에 도미노를 배치하는 실시간 협업 환경에서,

- 내가 놓은 도미노는 **즉시 반영**되어야 하고
- 다른 사용자가 놓은 도미노도 **빠르게 갱신**되어야 하며
- 과도한 클릭이나 충돌을 방지할 **제한 로직**도 필요했습니다.

### 💡 해결 아이디어

- `React Query`를 통해 클라이언트 로컬 캐시에 도미노 리스트를 빠르게 갱신
- `Socket.IO`로 도미노 변경 이벤트를 모든 사용자에게 실시간 브로드캐스트
- 서버가 응답되기 전에도 **낙관적 UI 업데이트**로 즉시 결과 반영
- 빠른 클릭을 방지하기 위한 최소 시간 간격 체크 추가 (`lastPlacedTime`)

### ⚙️ 적용 방식

1. **도미노 배치 처리**

   - 클릭한 위치에 도미노를 생성해 로컬에 먼저 반영
   - `mutate()`를 통해 서버 상태 갱신 요청
   - 성공 시 히스토리에 push

2. **다른 유저와 동기화**

   - socket.emit("domino update", ...)은 서버를 통해 다른 유저에게 브로드캐스트
   - 수신한 유저는 refetchQueries를 통해 최신 도미노 목록 재요청

3. **빠른 중복 클릭 방지**

   - lastPlacedTime을 기준으로 300ms 이내 중복 클릭 방지

4. **다른 유저의 커서 상태 공유**
   - "cursor position update" 이벤트를 통해 실시간 커서 위치 공유
   - 각 유저의 오브젝트 위치, 색상, 회전 상태를 함께 전달

---

### 4. 튜토리얼 로직을 기존 기능에 영향을 주지 않고 어떻게 설계할까?

튜토리얼 단계별 행동을 감지하려면 기존 기능의 상태를 추적하거나 로직을 수정해야 했습니다.
예를 들어 도미노 선택 여부나 사이드 패널 열림 상태를 감지하기 위해
`useState`, `props`, 내부 이벤트를 직접 건드리는 구조는 다음과 같은 한계가 있었습니다.

- 조건 로직이 분산되어 전체 흐름을 파악하기 어려움
- 단계 추가 시 기존 UI 컴포넌트를 수정해야 함
- 메시지와 조건이 분리돼 있어 유지보수가 힘듦

### 💡 해결 아이디어

튜토리얼 전용 상태 트래커를 도입하여,
**기존 로직은 그대로 두고 "관찰만" 하는 구조**로 설계했습니다.

모든 튜토리얼 단계는 `TUTORIAL_STEPS` 배열에 선언형으로 정의되어 있고,
각 단계는 특정 trackerKey 조건을 기준으로 자동 진행됩니다.

### ⚙️ 적용 방식

- 튜토리얼 단계는 메시지와 완료 조건 키를 포함한 배열로 선언형 정의됨
- 사용자의 행동은 클릭, 키 입력, 배치 등으로 감지되며, 전용 상태 저장소에 기록됨
- 현재 단계의 조건은 매 프레임마다 감지되고, 충족 시 자동으로 다음 단계로 전환됨
- UI에는 안내 메시지와 진행도가 표시되며, 조건이 충족되기 전까지 "다음" 버튼은 비활성화됨
- 전체 로직은 별도 컴포넌트에 고립되어 있으며, 기존 기능이나 화면 구조를 수정하지 않고 동작함
- 단계 추가는 배열에 항목만 추가하면 적용되도록 설계됨

---

### 5. 단축키 하나에 모든 도미노가 반응한다고? React key 문제 해결기

사용자가 플레이 도중 특정 도미노에 마우스를 올리면 단축키 안내창이 노출되며,
단축키 입력을 통해 해당 도미노를 삭제, 되돌리기, 투명 처리할 수 있는 기능을 구현했습니다.

이때 단축키 안내창은 화면 하단 중앙에 게임 플레이를 방해하지 않는 위치에 표시되며,
안내창이 닫힐 때는 100ms의 지연 시간을 두어 사용자 시야에서 자연스럽게 사라지도록 UX를 조정했습니다.

#### ❗ 문제 상황

- 단축키 입력 시 마우스가 올려진 도미노에만 반응해야 하지만, 모든 도미노 오브젝트가 함께 반응하는 현상이 발생하였습니다.

### 💡 해결 아이디어

초기 구현에서는 각 도미노를 index 값을 기준으로 식별하고 있었는데,
도미노를 삽입하거나 삭제하는 과정에서 동일한 index 값을 공유하는 경우가 발생했고,
이로 인해 단축키 입력 시 여러 도미노가 조건에 동시에 일치하는 문제가 생겼습니다.

이 문제는 React 공식 문서에서도 다음과 같이 언급되고 있습니다:

> "항목이 삽입되거나 삭제되거나 배열의 순서가 바뀌면 시간이 지남에 따라 항목을 렌더링하는 순서가 변경됩니다.인덱스를 key로 사용하면 종종 미묘하고 혼란스러운 버그가 발생합니다."  
> — [React Docs: 리스트 렌더링](https://ko.react.dev/learn/rendering-lists)

즉, 동적으로 추가/삭제되는 리스트에서는 인덱스를 키로 사용하면 컴포넌트가 정확하게 매칭되지 않고 불필요하게 리렌더링되거나 잘못된 항목에 이벤트가 전달되는 오류가 생길 수 있다는 것입니다.

### ⚙️ 적용 방식

**UUID를 사용한 고유 식별자 생성**

- 각 도미노가 생성될 때 `uuidv4()` 함수를 사용하여 고유한 UUID를 생성합니다.
- 이 UUID가 도미노의 `id`값에 할당되어 전역적으로 고유한 식별자가 됩니다.

**키 값을 활용한 마우스 이벤트 처리**

- 마우스 오버 시 해당 도미노의 id를 이벤트 핸들러에 전달합니다.
- 디바운싱을 통해 과도한 이벤트 발생을 방지합니다.
- 고유한 식별자를 통해 중복 이벤트를 방지합니다.

<br/>

## 🔧 트러블슈팅 기록서

### 📌 이슈 #1: [WebAssembly "recursive use of an object detected" 에러]

`@react-three/fiber`, `@react-three/rapier`, `Socket.IO`를 사용해 도미노 시뮬레이션을 실시간 동기화하는 기능을 개발하였습니다. 사용자가 오브젝트를 선택하여 캔버스에 도미노를 추가하면, 전체 `dominos` 배열에 추가 후 소켓으로 서버에 전송합니다.

```jsx
socket.emit("update domino", { projectId, dominos: updatedDomino });
```

이때 updatedDomino에는 기존 배열에 아래와 같은 newDomino 객체가 포함되어 있습니다.

```ts
const newDomino = {
  position: [x, y, z],
  rotation: [0, rotationY, 0],
  objectInfo: selectedDomino, // 문제 발생
  …
}
```

```bash
Uncaught Error: recursive use of an object detected which would lead to unsafe aliasing in rust
```

- 이 오류는 `wasm-bindgen` 내부의 `WasmRefCell`에 중복된 `mutable reference`가 발생했을 때 `Rust` 런타임이 강제로 차단하며 발생하였습니다.
- 특히 `selectedDomino` 객체를 참조한 상태에서 이를 그대로 `objectInfo`에 포함해 `emit`한 것이 원인이였습니다.

#### **🧪 해결 시도 1: 객체 참조 직접 전달**

- **내용**: selectedDomino 객체를 그대로 objectInfo에 전달하여 코드를 간결하게 유지하도록 하였습니다.
- **문제**: JavaScript의 참조 전달 특성 때문에 동일 객체가 재사용되며, Wasm 내부에서 mutable reference 중복 사용으로 판단되어 borrow rule 위반 → 런타임 에러 발생
- **결론**: WebAssembly에서 안정성을 보장할 수 없습니다.

#### **🧪 해결 시도 2: 명시적 객체 복사**

- **내용**: selectedDomino 객체의 모든 필드를 명시적으로 복사하여 새로운 객체를 생성하도록 하였습니다.
- **문제**: 코드가 장황해지고, 속성 추가/변경 시 복사 누락 가능성이 존재합니다.
- **결론**: WebAssembly에서 안정성을 보장할 수 있지만 유지보수가 어려울 수 있습니다.

#### ✅ **최종 선택: 명시적 객체 복사**

- **선택 이유**: WebAssembly에서의 안정성을 확보하는 것이 우선이며, 명시적 복사를 통해 참조 충돌 없이 객체를 안전하게 사용할 수 있습니다.

#### ⚙️ 구현 상세

- objectInfo에 원본 객체를 넘기지 말고, 필드를 하나하나 복사해 새 객체로 생성하도록 변경했습니다.
- 명시적 복사로 Wasm 내부의 참조 중복 문제를 해결했습니다.

#### 🚀 개선 및 회고

- WebAssembly와의 연동 시 객체 참조 전달보다는 명시적 복사가 안전합니다.

---

### 📌 이슈 #2: [React 상태 업데이트 직후 socket.emit이 잘못된 상태로 실행되는 버그]

`Escape` 키를 눌러 `setSelectedDomino(null)`로 상태를 초기화하고, 이후 `socket.emit("clear cursor")`로 서버의 커서를 지우는 로직을 사용했으나, **상태 반영 이전에 `socket.emit`이 실행되어**, 여전히 이전 `selectedDomino` 값으로 처리되는 버그 발생했습니다.

```jsx
escape: () => {
  setSelectedDomino(null);
  socket.emit("clear cursor", { projectId }); // selectedDomino가 아직 null이 아님
},
```

React의 setState는 비동기 처리되므로, 바로 다음 줄에 실행되는 socket.emit은 변경 전 상태를 읽습니다.
그 결과, selectedDomino가 null로 변경되었다고 가정하고 emit했지만, 실제로는 이전 값 기준으로 서버에 전달됩니다.

#### **🧪 해결 시도 1: await new Promise로 타이밍 지연**

- **내용**: React의 setState가 비동기 처리되므로, await new Promise를 사용하여 상태 업데이트 완료를 기다린 후 socket.emit을 실행하도록 하였습니다.
- **문제**: 단순히 이벤트 큐 뒤로 밀 뿐, React 상태 업데이트 완료를 보장하지 않습니다.
- **결론**: React의 상태 업데이트 완료를 확실히 보장할 수 없어 안정적이지 않습니다.

#### **🧪 해결 시도 2: flushSync 강제 동기화**

- **내용**: React 18의 flushSync를 사용하여 상태 업데이트를 강제로 동기화한 후 socket.emit을 실행하도록 하였습니다.
- **문제**: React 18 이상의 Concurrent Mode에서는 여전히 비결정적일 수 있습니다.
- **결론**: Concurrent Mode 환경에서 안정성을 보장할 수 없습니다.

#### ✅ **최종 선택: setTimeout(..., 0)으로 메크로 태스크 큐에 지연**

- **선택 이유**: React 상태 업데이트 이후 외부 사이드 이펙트(socket.emit 등)를 안전하게 실행하려면, 렌더 타이밍 이후를 보장하는 메크로 태스크(setTimeout) 사용이 가장 안정적입니다.

#### ⚙️ 구현 상세

- setTimeout(..., 0)을 사용해 렌더링 이후 메크로 태스크 큐에서 실행을 보장하여, setSelectedDomino(null)이 실제 반영된 후 emit이 호출됩니다.

#### 🚀 개선 및 회고

- React 상태 업데이트 이후 외부 사이드 이펙트를 안전하게 실행하려면 메크로 태스크 사용이 가장 안정적입니다.

---

### 📌 이슈 #3: [DominoHUD 노출 타이밍 제어: Suspense와 상태 관리 기반 해결]

3D 씬을 렌더링하는 React Three Fiber (R3F)의 Canvas와 2D UI인 DominoHUD가 함께 있을 때, DominoHUD가 로딩 중에도 갑자기 화면에 보이는 문제가 발생했습니다. DominoHUD는 2D DOM UI이고, Canvas와는 연결되지 않아 로딩 상태(fallback)에서 숨겨지지 않았습니다.

#### **🧪 해결 시도 1: DominoHUD를 lazy 로딩하여 Suspense로 숨기기**

- **내용**: 로딩 중인 상태에서 DominoHUD를 숨기기 위해 React에서 컴포넌트를 지연 로딩하기 위한 함수인 `React.lazy`를 사용하여 비동기적으로 DominoHUD를 불러오도록 하였습니다.
- **문제**: DominoHUD 내부에서 useThree 훅을 사용하고 있었고, 이 훅은 반드시 Canvas 내부에서만 작동해야 하므로 에러가 발생했습니다.
- **결론**: `three.js`에서 제공하는 `useThree` 훅을 사용하는 컴포넌트는 lazy 로딩할 수 없습니다.

#### **🧪 해결 시도 2: 전역 상태로 Canvas 로딩 여부를 관리하기**

- **내용**: DominoHUD라는 사용자 인터페이스(UI)를 너무 이르게 화면에 띄우지 않기 위해, React의 React.lazy 대신 전역 상태 관리 도구인 Zustand를 사용했습니다. 이 전역 상태는 `<Canvas>`(3D 씬 영역)가 준비됐는지를 추적하며, 준비가 끝났을 때에만 DominoHUD를 화면에 보여주도록 설정했습니다.

- **문제**: 상태만으로는 정확한 시점을 제어하기 어려웠습니다. 화면이 아직 다 준비되지 않았는데도 DominoHUD가 먼저 나타나는 일이 생겼습니다. 그 이유는 상태가 너무 빨리 true로 바뀌어버려서, 실제 3D 화면이 준비되기 전인데도 UI가 먼저 그려진 것입니다.

- **결론**: 이 문제를 해결하기 위해 `setTimeout(..., 2000)`을 사용하여 약간의 시간을 지연시켰습니다. 이렇게 하면 브라우저가 실제 화면을 다 그린 뒤 다음 작업에서 상태를 true로 바꾸게 되어, 3D 씬이 완전히 준비된 이후에 DominoHUD가 자연스럽게 나타나게 됩니다.

#### ✅ **최종 선택: 대안 2**

- DominoHUD 안에서는 Three.js에서 제공하는 특수한 기능들(R3F 훅)을 사용하기 때문에, React의 lazy 로딩을 사용할 수 없습니다. 이런 이유로 전역 상태 + 조건부 렌더링 방식이 해결책이 되었습니다.

#### ⚙️ 구현 상세

- Zustand, 전역 상태 관리 라이브러리를 사용하여 `isCancasReady`를 생성하고, `<Canvas>` 내부에서 초기화 완료 시 `setIsCanvasReady(true)`를 호출하도록 하였습니다.
- `<DominoHUD>` 컴포넌트는 `isCanvasReady`가 `true`일 때만 렌더링되도록 조건부로 노출하도록 하였습니다.
- 실제 브라우저 렌더 타이밍과의 오차로 인해 상태가 너무 일찍 `true`가 되는 문제를 해결하기 위해, `setTimeout`을 사용하여 노출 타이밍을 지연시켰습니다.
- `three.js`에서 제공하는 훅들은 `<Canvas>` 컨텍스트 내에서만 호출되어야 하므로, 전역 상태를 활용해 2D UI(DominoHUD)가 너무 이르게 렌더링되지 않도록 제어했습니다. 이를 통해 사용자가 Canvas가 완전히 로드되기 전에 실행할 수 없는 코드와 상호작용하는 상황을 사전에 방지할 수 있었습니다.

#### 🚀 개선 및 회고

- 현재의 setTimeout으로 인위적으로 제어하는 방식은 임시적인 제어이므로 렌더링 성능이나 기기 환경에 따라 오차가 발생할 수 있습니다. 이를 개선하기 위한 다른 방식을 고려할 필요가 있습니다.

<br/>

## 🔥 최적화

### 📌 도미노 상태, 누가 책임지는 게 맞을까?

본 프로젝트는 여러 사용자가 동시에 도미노를 배치하거나 삭제할 수 있는 실시간 멀티플레이 환경을 지원합니다.
이처럼 동시성이 중요한 구조에서는 상태 충돌이나 반영 지연 없이 일관성을 유지하는 것이 핵심 과제였습니다.

하지만 초기 구조에서는 도미노 상태를 클라이언트 전역 상태와 React Query 캐시에 중복 저장하고 있었습니다.
이로 인해 같은 데이터를 두 곳에서 따로 관리하게 되었고, 수동 동기화 로직이 추가로 필요해졌습니다.

특히 빠른 조작이 반복되는 환경에서는 업데이트 타이밍이 엇갈리며 불필요한 리렌더링이나 상태 불일치가 발생할 수 있었습니다.
결과적으로, 데이터 흐름은 복잡해졌고 멀티플레이 환경에서의 안정성도 떨어질 우려가 있었습니다.

#### ⚙️ 적용 방식

1. 클라이언트 전역 상태를 제거하고 React Query의 setQueryData를 단일 데이터 소스로 활용하는 구조로 개편했습니다.
2. 모든 렌더링은 서버 응답 기반의 캐시 갱신 결과에 따라 동작하도록 변경했습니다.

이로써 클라이언트-서버 간 수동 동기화가 필요 없어졌고, 데이터 흐름과 렌더링 흐름이 자연스럽게 일치하도록 만들었습니다.

#### ✅ 적용 효과

| 항목            | 개선 전                                    | 개선 후                                |
| --------------- | ------------------------------------------ | -------------------------------------- |
| 상태 구조       | 전역 상태와 캐시 이중 관리                 | 캐시 단일 소스로 통합                  |
| 렌더링 흐름     | 전역 상태 변경에 따라 렌더링               | 서버 응답 기반으로 캐시 갱신 후 렌더링 |
| 동기화 관리     | 수동 동기화 로직 필요                      | 데이터 흐름 단순화, 관리 포인트 감소   |
| 멀티플레이 대응 | 상태 불일치 및 충돌 우려                   | 서버 중심 흐름으로 실시간 일관성 확보  |
| 유지보수        | 상태 분산으로 수정/디버깅 포인트 다수 존재 | 구조 통일로 유지보수성과 확장성 향상   |

---

### 📌 입력과 렌더링 사이, 그 지연을 줄일 수는 없을까?

기존에는 도미노 생성 시 서버에서 고유 ID를 발급한 뒤 해당 응답을 받은 후에야 화면에 도미노가 렌더링되는 구조였습니다.
이로 인해 사용자 입력과 화면 반영 사이에 시간 차가 발생했으며 입력이 지연되거나 적용되지 않은 것처럼 보이는 문제가 있었습니다.

해당 문제를 완화하기 위해 낙관적 업데이트 방식을 적용하여 도미노 생성 시점에 즉시 화면에 표시되도록 개선하였습니다.

그러나 도미노 ID는 여전히 서버에서 발급되었기 때문에 응답 수신 후 캐시를 갱신해야 했고,
이 과정에서 setQueryData가 한 차례 더 호출되어 중복 렌더링이 발생하는 문제가 남아 있었습니다.

#### ⚙️ 적용 방식

1. 도미노 생성 시 클라이언트에서 UUID를 선할당한 뒤 해당 ID를 포함한 데이터로 캐시를 즉시 업데이트하도록 변경했습니다.
2. 서버가 클라이언트에서 전달한 UUID를 그대로 저장하므로 응답 후에도 추가 setQueryData 없이 렌더링이 유지됩니다.

이 구조를 통해 렌더링 타이밍을 앞당기면서도 서버-클라이언트 간 동기화 충돌이나 재처리를 완전히 제거할 수 있었습니다.

#### ✅ 적용 효과

| 항목             | 개선 전                                         | 개선 후                                            |
| ---------------- | ----------------------------------------------- | -------------------------------------------------- |
| 렌더링 반영 시점 | 서버가 ID를 발급한 뒤 응답이 도착해야 렌더링됨  | 사용자 입력 시점에 즉시 렌더링됨                   |
| ID 처리 흐름     | 서버에서 ID 생성 후 클라이언트에 전달           | 클라이언트에서 UUID를 선할당하고 서버에 전달함     |
| 렌더링 횟수      | 캐시 갱신을 위해 `setQueryData`를 2회 호출함    | 최초 1회만 호출하여 렌더링                         |
| UX 반응성        | 입력 직후 화면 반영이 지연되어 반응 속도 저하됨 | 입력과 동시에 반영되어 자연스럽고 빠른 UX 제공     |
| 구조 안정성      | 서버 응답과 기존 캐시 간 ID 불일치 가능성 존재  | ID를 공유함으로써 응답 후에도 캐시 변경이 불필요함 |

---

### 📌 다양한 오브젝트, 어떻게 더 빠르게 보여줄 수 있을까?

본 프로젝트에서는 12종 이상의 3D GLB 모델과 썸네일 이미지가 사용자의 상호작용 시점에 실시간으로 로딩되었습니다.
이로 인해 초기 렌더링 지연, UI 깜빡임, 높은 메모리 사용 등 사용자 경험을 해치는 문제가 발생했습니다.

이를 해결하기 위해 3D 리소스를 사전에 불러오는 프리로드 전략과
중복 요청을 줄이는 캐싱 시스템을 도입하여 전체 렌더링 성능을 개선하였습니다.

#### ⚙️ 적용 방식

1. 앱 초기 진입 시점에 모든 GLB 모델 경로를 배열로 정리해 한 번씩 미리 로드하였습니다.
2. `useGLTF.preload()`로 모델을 메모리에 적재하고, 이후에는 `useGLTF()`를 통해 캐시에서 바로 불러와 사용하였습니다.
3. 동일한 GLB 파일을 여러 번 불러와도 네트워크 요청은 최초 1회만 발생하며, 이후에는 메모리에서 즉시 재사용됩니다.

```ts
const MODEL_PATHS = ["/objects/beach_ball.glb"] as const;

MODEL_PATHS.forEach((path) => {
  useGLTF.preload(path);
});
```

```ts
const { scene } = useGLTF(path); // 캐시된 GLB 사용
const clonedScene = useMemo(() => scene.clone(true), [scene]);
```

#### ✅ 적용 효과

| 항목            | 개선 전                                | 개선 후                            |
| --------------- | -------------------------------------- | ---------------------------------- |
| 초기 로딩 시간  | 3–5초                                  | 1–2초                              |
| 오브젝트 반응성 | 배치 시 100–200ms 지연 발생            | 30–60ms 이내로 즉시 반응           |
| 메모리 사용량   | 동일 모델 중복 로딩으로 150–200MB 사용 | 2.7–3.2KB로 축소, 캐시 기반 재사용 |
| 사용자 경험     | 로딩 지연과 깜빡임으로 UX 저하         | 부드럽고 끊김 없는 상호작용 제공   |

---

### 📌 여러 키 입력을 한 곳에서, 깔끔하게 관리할 수 없을까?

도미노 프로젝트에서는 사용자가 다양한 키(`x`, `h`, `u` 등)를 통해 도미노를 회전하거나 제거하는 등 여러 상호작용을 수행할 수 있습니다.  
하지만 기존 구조에서는 `keydown` 이벤트 리스너를 각 컴포넌트에서 별도로 등록하고 있어 관리가 분산되고, 의도치 않은 문제로 이어질 수 있었습니다.

#### ⚙️ 적용 방식

1. `keydown` 이벤트 처리를 하나의 커스텀 훅(`useDominoKeyboardControls`)으로 통합하였습니다.
2. 키 입력에 따른 동작은 `keyMap` 객체를 통해 분기 처리하도록 구성하였습니다.
3. 컴포넌트 진입 시 전역 리스너를 1회 등록하고, 언마운트 시에는 정확하게 해제되도록 설계하였습니다.

```ts
const keyMap = {
  x: () => deleteSelectedDomino(...),
  h: () => toggleSelectedDominoOpacity(...),
  u: () => undoDominoHistory(...),
  q: rotateDominoCounterClockwise,
  e: rotateDominoClockwise,
  escape: () => closeCurrentMode(),
};
```

#### ✅ 적용 효과

| 항목             | 개선 전                         | 개선 후                           |
| ---------------- | ------------------------------- | --------------------------------- |
| 이벤트 처리 위치 | 여러 컴포넌트에 분산            | 단일 커스텀 훅으로 집중           |
| 중복 등록 위험   | 동일 키 입력에 여러 핸들러 작동 | 단일 리스너 구조로 중복 제거      |
| 유지보수         | 키별 수정 위치가 달라 번거로움  | `keyMap` 수정만으로 관리 가능     |
| 가독성           | 흐름 파악이 어려움              | 전체 키 입력 처리가 한눈에 보임   |
| 성능             | 메모리 낭비 가능성 존재         | 등록/해제 구조로 리소스 낭비 방지 |

---

### 📌 커서만 움직였을 뿐인데, 왜 프레임이 떨어질까?

도미노 오브젝트 위로 마우스를 올릴 때마다 `pointerOver` 이벤트가 발생하고, 이때마다 토스트 안내가 뜨는 구조였습니다.
하지만 해당 이벤트가 매 프레임마다 반복 호출되면서 성능 병목이 생겼고, 도미노가 많을수록 프레임 드랍 현상이 심해졌습니다.

#### ⚙️ 적용 방식

1. `pointerOver` 이벤트를 직접 처리하지 않고, `debounce()` 함수를 적용하여 호출 간격을 200ms로 제한했습니다.
2. 실제 토스트 렌더링 로직은 throttledPointerOver로 감싸 불필요한 호출을 방지했습니다.

```ts
const throttledPointerOver = useMemo(() => {
  return debounce((event: PointerEvent, key: string) => {
    openGuideToast(event, key);
  }, 200);
}, [openGuideToast]);
```

#### ✅ 적용 효과

| 항목               | 개선 전                                       | 개선 후                                   |
| ------------------ | --------------------------------------------- | ----------------------------------------- |
| 이벤트 호출 빈도   | `pointerOver`가 매 프레임마다 발생            | 200ms 간격으로 제한                       |
| 렌더링 트리거 횟수 | 상태 변경으로 인한 과도한 렌더링 발생         | 불필요한 리렌더링 대폭 감소               |
| 프레임 유지율      | 도미노가 많을수록 프레임 드랍 심화            | 수십 개 도미노 상황에서도 부드럽게 유지   |
| UX 반응성          | 커서 움직임이 버벅이고 안내가 과도하게 노출됨 | 커서 이동이 자연스럽고 안내도 적절히 노출 |

---

## 회고록

### 최은서

**가장 어려웠던 부분**
3D 렌더링과 실시간 멀티플레이를 동시에 구현하는 것이 가장 큰 도전이었습니다. Three.js와 Socket.IO를 함께 사용하면서 발생하는 성능 이슈와 상태 동기화 문제를 해결하는 데 많은 시간을 보냈습니다.

**배운 점**

- React Query의 낙관적 업데이트를 활용한 UX 개선 방법
- WebAssembly와의 연동 시 객체 참조 관리의 중요성
- 디바운싱과 쓰로틀링을 통한 성능 최적화 기법

**개선하고 싶은 부분**

- 현재 setTimeout으로 임시 해결한 Canvas 로딩 타이밍 문제를 더 우아한 방법으로 개선
- 3D 모델 프리로딩 전략을 더 체계적으로 관리
- 테스트 커버리지 확대

**다음 프로젝트에서 적용할 점**

- 초기 설계 단계에서 상태 관리 아키텍처를 더 신중하게 설계
- 성능 최적화를 사후 처리가 아닌 설계 단계에서 고려
- 기술 스택 선택 시 호환성과 안정성을 우선 검토

---

### 문인

**가장 어려웠던 부분**
사용자 인터페이스와 3D 공간의 조화를 이루는 것이 가장 어려웠습니다. 2D UI 컴포넌트들이 3D Canvas와 자연스럽게 연동되도록 하면서도, 사용자가 직관적으로 조작할 수 있는 경험을 만드는 데 많은 고민을 했습니다.

**배운 점**

- React Three Fiber를 활용한 3D 컴포넌트 설계 방법
- Zustand를 통한 전역 상태 관리 최적화
- 커스텀 훅을 활용한 로직 재사용성 향상
- TypeScript를 활용한 타입 안정성 확보

**개선하고 싶은 부분**

- 컴포넌트 간 의존성을 더 명확하게 분리
- 에러 바운더리와 로딩 상태 관리 개선
- 접근성(Accessibility) 기능 강화
- 반응형 디자인 적용

**다음 프로젝트에서 적용할 점**

- 컴포넌트 설계 시 재사용성과 확장성을 우선 고려
- 타입 시스템을 활용한 개발 생산성 향상
- 사용자 피드백을 반영한 지속적인 개선

---

### 임승현

**가장 어려웠던 부분**
실시간 멀티플레이 환경에서의 사용자 경험을 최적화하는 것이 가장 큰 과제였습니다. 여러 사용자가 동시에 조작할 때 발생하는 지연이나 깜빡임 없이 부드러운 경험을 제공하는 데 집중했습니다.

**배운 점**

- Socket.IO를 활용한 실시간 데이터 동기화 방법
- React Query의 캐싱 전략을 통한 성능 최적화
- UUID를 활용한 고유 식별자 관리
- 디바운싱을 통한 이벤트 최적화

**개선하고 싶은 부분**

- 네트워크 상태에 따른 적응형 동기화 전략 구현
- 오프라인 모드 지원
- 더 정교한 에러 핸들링 시스템 구축
- 성능 모니터링 도구 도입

**다음 프로젝트에서 적용할 점**

- 실시간 기능 설계 시 네트워크 불안정성을 고려한 방어 로직 구현
- 사용자 행동 패턴을 분석한 UX 개선
- 마이크로 인터랙션을 통한 사용자 피드백 강화
