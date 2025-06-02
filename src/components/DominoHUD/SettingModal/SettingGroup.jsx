const SettingGroup = ({ title, children }) => {
  return (
    <div className="mb-[24px]">
      <p className="mb-[8px] text-[14px] font-medium">{title}</p>
      {children}
    </div>
  );
};

export default SettingGroup;
