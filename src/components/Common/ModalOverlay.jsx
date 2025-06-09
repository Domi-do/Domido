import { useContext, useRef } from "react";
import { createPortal } from "react-dom";
import { IoIosCloseCircle } from "react-icons/io";

import { PortalContext } from "@/components/Common/GlobalPortal";
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
          className="relative bg-white pt-[50px] pr-[30px] pb-[30px] pl-[30px] rounded-lg shadow min-w-[400px]"
        >
          <button
            onClick={closeModal}
            className="ml-auto block absolute right-[20px] top-[20px] cursor-pointer"
          >
            <IoIosCloseCircle className="text-3xl text-gray-500" />
          </button>
          {children}
        </div>
      </div>,
      portalContainer,
    )
  );
};

export default ModalOverlay;
