import { createContext, useCallback, useContext, useState } from "react";

const TOAST_PLACEMENTS = ["topLeft", "topRight", "bottomLeft", "bottomRight", "center"];

const ToastContext = createContext(null);

const getPlacementClass = (placement) => {
  switch (placement) {
    case "topLeft":
      return "top-4 left-4";
    case "topRight":
      return "top-4 right-4";
    case "bottomLeft":
      return "bottom-4 left-4";
    case "bottomRight":
      return "bottom-4 right-4";
    case "center":
      return "top-30 left-1/2 -translate-x-1/2 -translate-y-1/2";
    default:
      return "";
  }
};

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts((prevToast) => prevToast.filter((toast) => toast.id !== id));
  };

  const showToast = useCallback(({ message, placement = "bottomLeft", duration = 3000 }) => {
    const id = Date.now();
    setToasts((prevToast) => [...prevToast, { id, message, placement }]);

    setTimeout(() => removeToast(id), duration);
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {TOAST_PLACEMENTS.map((placement) => (
        <div
          key={placement}
          className={`fixed z-50 p-4 space-y-2 ${getPlacementClass(placement)}`}
        >
          {toasts
            .filter((toast) => toast.placement === placement)
            .map((toast) => (
              <div
                key={toast.id}
                className="relative w-fit max-w-[90vw] px-4 py-2 rounded border border-gray-200 bg-white text-gray-800 shadow-md animate-fade-in"
              >
                <p className="text-sm font-sans">{toast.message}</p>
              </div>
            ))}
        </div>
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const toastContext = useContext(ToastContext);
  if (!toastContext) null;

  return toastContext;
};
