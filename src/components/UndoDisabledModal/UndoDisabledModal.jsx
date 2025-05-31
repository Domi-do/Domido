import ModalOverlay from "@/components/ModalOverlay/ModalOverlay";
import useDominoStore from "@/store/useDominoStore";

const UndoDisabledModal = ({ closeModal }) => {
  const clearDominos = useDominoStore((state) => state.clearDominos);

  const handleConfirm = () => {
    clearDominos();
    closeModal();
  };

  return (
    <ModalOverlay closeModal={closeModal}>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px" }}>
          정말 Reset하시겠습니까?
        </h2>
        <p style={{ fontSize: "14px", color: "#555", marginBottom: "20px" }}>
          이 작업은 되돌릴 수 없습니다.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
          <button
            onClick={handleConfirm}
            style={{
              padding: "8px 16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              backgroundColor: "#f0f0f0",
              cursor: "pointer",
            }}
          >
            확인
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default UndoDisabledModal;
