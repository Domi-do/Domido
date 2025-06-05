import { describe, it, expect, beforeEach } from "vitest";

import useDominoStore from "@/store/useDominoStore";

describe("useDominoStore", () => {
  beforeEach(() => {
    useDominoStore.setState({ selectedDomino: null });
  });

  it("selectedDomino를 설정할 수 있다", () => {
    useDominoStore.getState().setSelectedDomino({ id: 1 });
    const updated = useDominoStore.getState();
    expect(updated.selectedDomino).toEqual({ id: 1 });
  });
});
