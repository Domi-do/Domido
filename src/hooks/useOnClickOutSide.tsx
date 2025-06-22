import { useEffect, RefObject } from "react";

type RefType = RefObject<HTMLElement | null>;
type Callback = () => void;

const useOnClickOutSide = (ref: RefType, onClickOutSide: Callback) => {
  useEffect(() => {
    const handleClose = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      onClickOutSide();
    };

    document.addEventListener("mousedown", handleClose);

    return () => document.removeEventListener("mousedown", handleClose);
  }, [ref, onClickOutSide]);
};

export default useOnClickOutSide;
