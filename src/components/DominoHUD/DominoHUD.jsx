const DominoHUD = ({ rotationSensitivity, onChangeSensitivity }) => {
  return (
    <div className="fixed z-50">
      <input
        id="sensitivity"
        type="range"
        min={1}
        max={50}
        step={0.01}
        value={rotationSensitivity}
        onChange={onChangeSensitivity}
        className="w-full"
      />
    </div>
  );
};

export default DominoHUD;
