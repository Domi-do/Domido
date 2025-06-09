import MODE from "@/constants/mode";
import useDominoStore from "@/store/useDominoStore";
import useSimulationStore from "@/store/useSimulationStore";

const QUARTER_TURN = 4;

export const deleteSelectedDomino = (historyRef, onToggleGuideToast) => {
  const { dominos, selectedDominoKey, setSelectedDominoKey } = useDominoStore.getState();

  if (!selectedDominoKey) return;

  const updatedDominos = dominos.filter((domino) => domino._id !== selectedDominoKey);

  historyRef.current.push([...dominos]);
  setSelectedDominoKey(null);
  setTimeout(() => onToggleGuideToast(false), 100);

  return updatedDominos;
};

export const toggleSelectedDominoOpacity = (historyRef, onToggleGuideToast) => {
  const { dominos, selectedDominoKey } = useDominoStore.getState();

  if (!selectedDominoKey) return;

  const updatedDominos = dominos.map((item) =>
    item._id === selectedDominoKey ? { ...item, opacity: item.opacity === 1 ? 0.3 : 1 } : item,
  );

  historyRef.current.push([...dominos]);
  onToggleGuideToast(false);

  return updatedDominos;
};

export const undoDominoHistory = (historyRef) => {
  if (historyRef.current.length <= 1) return;
  historyRef.current.pop();

  const updatedDominos = historyRef.current[historyRef.current.length - 1];

  return updatedDominos;
};

export const closeCurrentMode = () => {
  const { simulationMode, setSimulationMode } = useSimulationStore.getState();
  const { setSelectedDomino } = useDominoStore.getState();

  if (simulationMode === MODE.EDIT) return setSelectedDomino(null);
  if (simulationMode === MODE.READY) return setSimulationMode(MODE.EDIT);
};

export const rotateDominoClockwise = () => {
  const { rotationY, setRotationY } = useDominoStore.getState();
  setRotationY(rotationY + Math.PI / QUARTER_TURN);
};

export const rotateDominoCounterClockwise = () => {
  const { rotationY, setRotationY } = useDominoStore.getState();
  setRotationY(rotationY - Math.PI / QUARTER_TURN);
};
