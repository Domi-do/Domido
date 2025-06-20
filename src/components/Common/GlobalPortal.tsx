import { createContext, ReactNode, useState } from "react";
export const PortalContext = createContext<HTMLDivElement | null>(null);

const GlobalPortal = ({ children }: { children: ReactNode }) => {
  const [portalContainer, setPortalContext] = useState<HTMLDivElement | null>(null);

  return (
    <PortalContext.Provider value={portalContainer}>
      {children}
      <div
        ref={(elem: HTMLDivElement | null) => {
          if (portalContainer !== null || elem === null) {
            return;
          }
          setPortalContext(elem);
        }}
      />
    </PortalContext.Provider>
  );
};

export default GlobalPortal;
