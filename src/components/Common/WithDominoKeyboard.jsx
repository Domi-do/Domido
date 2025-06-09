import useDominoKeyboardControls from "@/hooks/useDominoKeyboardControls";

const WithDominoKeyboard = ({ setIsGuideToastVisible, children }) => {
  useDominoKeyboardControls(setIsGuideToastVisible);
  return children;
};

export default WithDominoKeyboard;
