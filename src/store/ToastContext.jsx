import { createContext, useCallback, useContext, useState } from "react";

const ToastContext = createContext(null);

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
      {["topLeft", "topRight", "bottomLeft", "bottomRight"].map((placement) => (
        <div
          key={placement}
          className={`fixed z-50 p-4 space-y-2 ${
            placement === "topLeft" && "top-4 left-4"
          } ${placement === "topRight" && "top-4 right-4"} ${
            placement === "bottomLeft" && "bottom-4 left-4"
          } ${placement === "bottomRight" && "bottom-4 right-4"}`}
        >
          {toasts
            .filter((t) => t.placement === placement)
            .map((toast) => (
              <div
                key={toast.id}
                className="relative w-fit max-w-[90vw] px-4 py-2 rounded border border-gray-200 bg-white text-gray-800 shadow-md animate-fade-in"
              >
                <p className="text-sm">{toast.message}</p>
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
