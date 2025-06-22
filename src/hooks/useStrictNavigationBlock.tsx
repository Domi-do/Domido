import { useEffect } from "react";

export const useStrictNavigationBlock = () => {
  useEffect(() => {
    const blockBack = () => {
      window.history.pushState(null, "정말 뒤로 가기겠습니까?", window.location.href);
    };

    blockBack();
    window.addEventListener("popstate", blockBack);

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "정말 새로고침 하시겠습니까?";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("popstate", blockBack);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
};
