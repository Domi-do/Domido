import ModalOverlay from "@/components/ModalOverlay/ModalOverlay";
import useDominoStore from "@/store/useDominoStore";

const DominoClearConfirmModal = ({ closeModal }) => {
  const clearDominos = useDominoStore((state) => state.setClearDominos);

  const handleConfirm = () => {
    clearDominos();
    closeModal();
  };

  return (
    <ModalOverlay closeModal={closeModal}>
      <div className="text-center">
        <h2 className="text-lg font-semibold mb-3 text-gray-800">정말 Reset하시겠습니까?</h2>
        <p className="text-sm text-gray-500 mb-5">이 작업은 되돌릴 수 없습니다.</p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 text-gray-800 hover:bg-gray-200 transition-colors"
          >
            확인
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default DominoClearConfirmModal;
