import { fireEvent, render, screen } from "@testing-library/react";
import { act } from "react";
import { beforeEach, describe, expect, it } from "vitest";

import { SidePanel } from "@/components/DominoHUD";
import useDominoStore from "@/store/useDominoStore";

beforeEach(() => {
  const { setSelectedDomino, setSelectedColor } = useDominoStore.getState();
  setSelectedDomino({ objectName: "defaultObject" });
  setSelectedColor(null);
});
describe("SidePanel Component 통합 테스트", () => {
  it("사이드 패널은 기본적으로 닫힌 상태로 렌더링 되어야 한다.", () => {
    const { container } = render(<SidePanel />);
    const wrapper = container.firstChild;

    expect(wrapper).toHaveClass("translate-x-[99%]");
  });

  it("사이드 패널에 마우스를 올리면 패널이 열려야 한다.", () => {
    const { container } = render(<SidePanel />);
    const wrapper = container.firstChild;

    fireEvent.mouseEnter(wrapper);

    expect(wrapper).toHaveClass("translate-x-0");
  });

  it("사이드 패널에 마우스를 내리면 패널이 닫혀야 한다.", () => {
    const { container } = render(<SidePanel />);
    const wrapper = container.firstChild;

    fireEvent.mouseEnter(wrapper);
    fireEvent.mouseLeave(wrapper);

    expect(wrapper).toHaveClass("translate-x-[99%]");
  });

  it("선택한 도미노가 defaultObject면 DominoColorPalette 컴포넌트가 렌더링 되어야 한다.", () => {
    const { getByTestId } = render(<SidePanel />);

    const palette = getByTestId("domino-color-palette");
    expect(palette).toBeInTheDocument();
  });

  it("DominoColorPalette에서 색상을 선택하면 선택한 색으로 도미노 상태가 변경되어야 한다.", () => {
    render(<SidePanel />);

    const redButton = screen.getByTestId("color-button-red");

    act(() => {
      fireEvent.click(redButton);
    });

    const { selectedColor } = useDominoStore.getState();
    expect(selectedColor).toBe("#EF4444");
  });

  it("오브젝트를 선택하면 해당 오브젝트로 도미노 상태가 변경되어야 한다.", () => {
    const { container } = render(<SidePanel />);
    const wrapper = container.firstChild;

    fireEvent.mouseEnter(wrapper);

    const slideObjectButton = screen.getByTestId("object-button-slide");

    act(() => {
      fireEvent.click(slideObjectButton);
    });

    const { selectedDomino } = useDominoStore.getState();
    expect(selectedDomino.objectName).toBe("slide");
  });
});
