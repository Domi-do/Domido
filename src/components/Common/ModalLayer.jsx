const ModalLayer = ({ modals }) => {
  return (
    <>
      {modals.map((modal) =>
        modal.isOpen ?
          <modal.Component
            key={modal.key}
            {...modal.props}
          />
        : null,
      )}
    </>
  );
};

export default ModalLayer;
