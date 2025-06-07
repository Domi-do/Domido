import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import GlobalPortal from "@/components/Common/GlobalPortal";
import DominoHUD from "@/components/DominoHUD/DominoHUD";

vi.mock("@/store/useSimulationStore", () => ({
  default: () => ({ simulationMode: "EDIT", countdownNumber: 3 }),
}));

const mockReset = vi.fn();

vi.mock("@/hooks/useDominoReset", () => ({
  default: () => ({ resetDominoSimulation: mockReset }),
}));

describe("DominoHUD Component 통합 테스트", () => {
  const rigidBodyRefs = [];
  const switchToReadyMode = vi.fn();

  it("기본 버튼 요소들이 렌더링되어야 한다.", () => {
    render(
      <DominoHUD
        rigidBodyRefs={rigidBodyRefs}
        switchToReadyMode={switchToReadyMode}
        isOpenGuideToastVisible={false}
      />,
    );

    expect(screen.getByAltText("setting")).toBeInTheDocument();
    expect(screen.getByAltText("play")).toBeInTheDocument();
    expect(screen.getByAltText("reset")).toBeInTheDocument();
    expect(screen.getByAltText("clear")).toBeInTheDocument();
  });

  it("COUNTDOWN 모드일 때 카운트다운 숫자가 표시되어야 한다.", async () => {
    vi.resetModules();

    vi.doMock("@/store/useSimulationStore", () => ({
      default: () => ({ simulationMode: "COUNTDOWN", countdownNumber: 5 }),
    }));

    const { default: DominoHUDComponent } = await import("@/components/DominoHUD/DominoHUD");

    render(
      <DominoHUDComponent
        rigidBodyRefs={rigidBodyRefs}
        switchToReadyMode={switchToReadyMode}
        isOpenGuideToastVisible={false}
      />,
    );

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("초기화 버튼 클릭 시 resetDominoSimulation이 호출되어야 한다.", () => {
    render(
      <DominoHUD
        rigidBodyRefs={rigidBodyRefs}
        switchToReadyMode={switchToReadyMode}
        isOpenGuideToastVisible={false}
      />,
    );

    fireEvent.click(screen.getByAltText("reset"));
    expect(mockReset).toHaveBeenCalled();
  });

  it("설정 버튼 클릭 시 SettingModal이 열려야 한다.", () => {
    render(
      <GlobalPortal>
        <DominoHUD
          rigidBodyRefs={rigidBodyRefs}
          switchToReadyMode={switchToReadyMode}
          isOpenGuideToastVisible={false}
        />
      </GlobalPortal>,
    );

    fireEvent.click(screen.getByAltText("setting"));
    expect(screen.getByText("배경 음악 음량")).toBeInTheDocument();
    expect(screen.getByText("효과음 음량")).toBeInTheDocument();
    expect(screen.getByText("배경")).toBeInTheDocument();
  });

  it("전체 제거 버튼 클릭 시 ConfirmModal이 열려야 한다", () => {
    render(
      <GlobalPortal>
        <DominoHUD
          rigidBodyRefs={rigidBodyRefs}
          switchToReadyMode={switchToReadyMode}
          isOpenGuideToastVisible={false}
        />
      </GlobalPortal>,
    );

    fireEvent.click(screen.getByAltText("clear"));

    expect(screen.getByText("정말 Reset하시겠습니까?")).toBeInTheDocument();
    expect(screen.getByText("이 작업은 되돌릴 수 없습니다.")).toBeInTheDocument();
  });

  it("모달 닫기 버튼 클릭 시 handleCloseModal이 모달을 닫아야 한다.", () => {
    render(
      <GlobalPortal>
        <DominoHUD
          rigidBodyRefs={rigidBodyRefs}
          switchToReadyMode={switchToReadyMode}
          isOpenGuideToastVisible={false}
        />
      </GlobalPortal>,
    );
    fireEvent.click(screen.getByAltText("setting"));
    expect(screen.getByText("배경 음악 음량")).toBeInTheDocument();

    fireEvent.click(screen.getByAltText("close_button"));

    expect(screen.queryByText("배경 음악 음량")).not.toBeInTheDocument();
  });

  it("확인 버튼 클릭 시 모달이 닫혀야 한다.", () => {
    render(
      <GlobalPortal>
        <DominoHUD
          rigidBodyRefs={rigidBodyRefs}
          switchToReadyMode={switchToReadyMode}
          isOpenGuideToastVisible={false}
        />
      </GlobalPortal>,
    );

    fireEvent.click(screen.getByAltText("clear"));
    expect(screen.getByText("정말 Reset하시겠습니까?")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "확인" }));

    expect(screen.queryByText("정말 Reset하시겠습니까?")).not.toBeInTheDocument();
  });
});
