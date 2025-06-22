import { ReactNode } from "react";

interface SettingGroupProps {
  title: string;
  children: ReactNode;
}

const SettingGroup = ({ title, children }: SettingGroupProps) => {
  return (
    <div className="mb-[24px]">
      <p className="mb-[8px] text-[14px] font-medium">{title}</p>
      {children}
    </div>
  );
};

export default SettingGroup;
