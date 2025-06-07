import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GuideToast } from "@/components/DominoHUD";

describe("GuideToast Component 테스트", () => {
  it("Remove와 Hide 가이드 텍스트가 렌더링 되어야 한다.", () => {
    render(<GuideToast />);
    expect(screen.getByText("Remove")).toBeInTheDocument();
    expect(screen.getByText("Hide")).toBeInTheDocument();
  });

  it("X와 H 키 안내가 포함되어 있어야 한다.", () => {
    render(<GuideToast />);
    expect(screen.getByText("X")).toBeInTheDocument();
    expect(screen.getByText("H")).toBeInTheDocument();
  });
});
