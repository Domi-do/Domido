import useDominoKeyboardControls from "@/hooks/useDominoKeyboardControls";

const DominoKeyboardHandler = ({ setIsGuideToastVisible, children }) => {
  useDominoKeyboardControls(setIsGuideToastVisible);
  return children;
};

export default DominoKeyboardHandler;
