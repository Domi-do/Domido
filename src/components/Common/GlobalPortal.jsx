import { createContext, useState } from "react";

export const PortalContext = createContext(null);

const GlobalPortal = ({ children }) => {
  const [portalContainer, setPortalContext] = useState(null);

  return (
    <PortalContext.Provider value={portalContainer}>
      {children}
      <div
        ref={(elem) => {
          if (portalContainer !== null || elem === null) {
            return null;
          }
          setPortalContext(elem);
        }}
      />
    </PortalContext.Provider>
  );
};

export default GlobalPortal;
