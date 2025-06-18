import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import GlobalPortal from "@/components/Common/GlobalPortal";
import DominoHUD from "@/components/DominoHUD/DominoHUD";
import { SocketContext } from "@/store/SocketContext";
import { ToastProvider } from "@/store/ToastContext";

const createMockSocket = () => ({ on: vi.fn(), off: vi.fn(), emit: vi.fn(), id: "mock-socket-id" });

const mockReset = vi.fn();
vi.mock("@/hooks/useDominoReset", () => ({ default: () => ({ emitDominoReset: mockReset }) }));

export const renderWithProviders = (ui, { route = "/projects/test-project-id" } = {}) => {
  const queryClient = new QueryClient();
  const mockSocketValue = { socket: createMockSocket(), projectId: "test-project-id" };

  return render(
    <QueryClientProvider client={queryClient}>
      <SocketContext.Provider value={mockSocketValue}>
        <ToastProvider>
          <MemoryRouter initialEntries={[route]}>
            <Routes>
              <Route
                path="/projects/:projectId"
                element={ui}
              />
            </Routes>
          </MemoryRouter>
        </ToastProvider>
      </SocketContext.Provider>
    </QueryClientProvider>,
  );
};

describe("DominoHUD Component 통합 테스트", () => {
  it("기본 버튼 요소들이 렌더링되어야 한다.", () => {
    renderWithProviders(<DominoHUD isOpenGuideToastVisible={false} />);

    expect(screen.getByTitle("설정")).toBeInTheDocument();
    expect(screen.getByTitle("프로젝트 목록")).toBeInTheDocument();
    expect(screen.getByTitle("초기화")).toBeInTheDocument();
    expect(screen.getByTitle("전체 삭제")).toBeInTheDocument();
  });

  it("초기화 버튼 클릭 시 emitDominoReset이 호출되어야 한다.", () => {
    renderWithProviders(<DominoHUD isOpenGuideToastVisible={false} />);
    fireEvent.click(screen.getByTitle("초기화"));
    expect(mockReset).toHaveBeenCalled();
  });

  it("설정 버튼 클릭 시 SettingModal이 열려야 한다.", () => {
    renderWithProviders(
      <GlobalPortal>
        <DominoHUD isOpenGuideToastVisible={false} />
      </GlobalPortal>,
    );

    fireEvent.click(screen.getByTitle("설정"));
    expect(screen.getByText("민감도")).toBeInTheDocument();
    expect(screen.getByText("배경 음악 음량")).toBeInTheDocument();
    expect(screen.getByText("효과음 음량")).toBeInTheDocument();
    expect(screen.getByText("테마")).toBeInTheDocument();
  });

  it("전체 제거 버튼 클릭 시 ConfirmModal이 열려야 한다", () => {
    renderWithProviders(
      <GlobalPortal>
        <DominoHUD isOpenGuideToastVisible={false} />
      </GlobalPortal>,
    );

    fireEvent.click(screen.getByTitle("전체 삭제"));

    expect(screen.getByText("정말 Reset하시겠습니까?")).toBeInTheDocument();
    expect(screen.getByText("이 작업은 되돌릴 수 없습니다.")).toBeInTheDocument();
  });

  it("모달 닫기 버튼 클릭 시 handleCloseModal이 모달을 닫아야 한다.", () => {
    renderWithProviders(
      <GlobalPortal>
        <DominoHUD isOpenGuideToastVisible={false} />
      </GlobalPortal>,
    );

    fireEvent.click(screen.getByTitle("설정"));
    expect(screen.getByText("배경 음악 음량")).toBeInTheDocument();

    fireEvent.click(screen.getByTitle("닫기"));
    expect(screen.queryByText("배경 음악 음량")).not.toBeInTheDocument();
  });

  it("확인 버튼 클릭 시 모달이 닫혀야 한다.", () => {
    renderWithProviders(
      <GlobalPortal>
        <DominoHUD isOpenGuideToastVisible={false} />
      </GlobalPortal>,
    );
    fireEvent.click(screen.getByTitle("전체 삭제"));

    expect(screen.getByText("정말 Reset하시겠습니까?")).toBeInTheDocument();
    expect(screen.getByText("이 작업은 되돌릴 수 없습니다.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "확인" }));

    expect(screen.queryByText("정말 Reset하시겠습니까?")).not.toBeInTheDocument();
  });
});
