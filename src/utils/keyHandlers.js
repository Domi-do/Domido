import MODE from "@/constants/mode";
import useDominoStore from "@/store/useDominoStore";
import useSimulationStore from "@/store/useSimulationStore";

export const deleteSelectedDomino = (historyRef, onToggleGuideToast) => {
  const { dominos, selectedDominoKey, setDominos, setSelectedDominoKey } =
    useDominoStore.getState();
  if (!selectedDominoKey) return;

  historyRef.current.push([...dominos]);
  const updatedDominos = dominos.filter((domino) => domino.id !== selectedDominoKey);
  setDominos(updatedDominos);
  setSelectedDominoKey(null);
  setTimeout(() => onToggleGuideToast(false), 100);
};

export const toggleSelectedDominoOpacity = (historyRef, onToggleGuideToast) => {
  const { dominos, selectedDominoKey, setDominos } = useDominoStore.getState();
  if (!selectedDominoKey) return;

  historyRef.current.push([...dominos]);
  const updatedDominos = dominos.map((item) =>
    item.id === selectedDominoKey ? { ...item, opacity: item.opacity === 1 ? 0.3 : 1 } : item,
  );
  setDominos(updatedDominos);
  onToggleGuideToast(false);
};

export const undoLastDominoAction = (historyRef) => {
  const { setDominos } = useDominoStore.getState();
  if (historyRef.current.length <= 1) return;

  historyRef.current.pop();
  setDominos(historyRef.current[historyRef.current.length - 1]);
};

export const closeCurrentMode = () => {
  const { simulationMode, setSimulationMode } = useSimulationStore.getState();
  const { setSelectedDomino } = useDominoStore.getState();

  if (simulationMode === MODE.EDIT) return setSelectedDomino(null);
  if (simulationMode === MODE.READY) return setSimulationMode(MODE.EDIT);
};

export const rotateDominoClockwise = () => {
  const { rotationY, setRotationY } = useDominoStore.getState();
  setRotationY(rotationY + Math.PI / 4);
};

export const rotateDominoCounterClockwise = () => {
  const { rotationY, setRotationY } = useDominoStore.getState();
  setRotationY(rotationY - Math.PI / 4);
};
