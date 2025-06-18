import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import useDominoStore from "@/store/useDominoStore";

export const useKeyHandler = () => {
  const QUARTER_TURN = 4;
  const queryClient = useQueryClient();
  const { projectId } = useParams();

  const deleteSelectedDomino = (historyRef, onToggleGuideToast) => {
    const { selectedDominoKey, setSelectedDominoKey } = useDominoStore.getState();

    const dominos = queryClient.getQueryData(["dominos", projectId]);

    if (!selectedDominoKey) return;

    const updatedDominos = dominos.filter((domino) => domino._id !== selectedDominoKey);

    historyRef.current.push([...dominos]);
    setSelectedDominoKey(null);
    setTimeout(() => onToggleGuideToast(false), 100);

    return updatedDominos;
  };

  const toggleSelectedDominoOpacity = (historyRef, onToggleGuideToast) => {
    const { selectedDominoKey } = useDominoStore.getState();
    const dominos = queryClient.getQueryData(["dominos", projectId]);

    if (!selectedDominoKey) return;

    const updatedDominos = dominos.map((item) =>
      item._id === selectedDominoKey ? { ...item, opacity: item.opacity === 1 ? 0.3 : 1 } : item,
    );

    historyRef.current.push([...dominos]);
    onToggleGuideToast(false);

    return updatedDominos;
  };

  const undoDominoHistory = (historyRef) => {
    if (historyRef.current.length <= 1) return;
    historyRef.current.pop();

    const updatedDominos = historyRef.current[historyRef.current.length - 1];

    return updatedDominos;
  };

  const rotateDominoClockwise = () => {
    const { rotationY, setRotationY } = useDominoStore.getState();
    setRotationY(rotationY + Math.PI / QUARTER_TURN);
  };

  const rotateDominoCounterClockwise = () => {
    const { rotationY, setRotationY } = useDominoStore.getState();
    setRotationY(rotationY - Math.PI / QUARTER_TURN);
  };

  return {
    deleteSelectedDomino,
    rotateDominoClockwise,
    rotateDominoCounterClockwise,
    toggleSelectedDominoOpacity,
    undoDominoHistory,
  };
};
