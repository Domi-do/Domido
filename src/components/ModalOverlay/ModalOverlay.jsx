import { useContext, useRef } from "react";
import { createPortal } from "react-dom";

import { PortalContext } from "@/GlobalPortal";
import useOnClickOutSide from "@/hooks/useOnClickOutSide";

const ModalOverlay = ({ closeModal, children }) => {
  const modalRef = useRef(null);
  const portalContainer = useContext(PortalContext);

  useOnClickOutSide(modalRef, closeModal);

  return (
    portalContainer
    && createPortal(
      <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center">
        <div
          ref={modalRef}
          className="bg-white p-5 rounded-lg shadow"
        >
          <button
            onClick={closeModal}
            className="ml-auto block"
          >
            X
          </button>
          {children}
        </div>
      </div>,
      portalContainer,
    )
  );
};

export default ModalOverlay;
