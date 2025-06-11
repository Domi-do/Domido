import { useState } from "react";
import { useId } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const ProjectNameInputModal = ({ closeModal, onSubmit, placeholderValue, Title, submitLabel }) => {
  const [projectName, setProjectName] = useState("");
  const inputId = useId();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(projectName);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-white/10 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-xl px-[40px] py-[48px] relative">
        <div className="flex justify-between items-center mb-[32px]">
          <h2 className="text-[20px] font-semibold text-gray-800 tracking-tight">{Title}</h2>
          <button
            onClick={closeModal}
            className="absolute top-[24px] right-[24px] w-[40px] h-[40px] flex items-center justify-center text-[32px] text-gray-400 hover:text-gray-600 transition rounded-full hover:bg-gray-100"
            aria-label="닫기"
          >
            <IoCloseCircleOutline className="text-[50px]" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-[8px]"
        >
          <label
            htmlFor={inputId}
            className="text-[14px] font-medium text-gray-700"
          >
            프로젝트 이름
          </label>
          <input
            id={inputId}
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
            className="w-full px-[16px] py-[12px] border border-gray-300 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
            placeholder={placeholderValue}
          />

          <div className="mt-[32px] flex justify-end">
            <button
              type="submit"
              className="px-[24px] py-[10px] bg-yellow-400 hover:bg-yellow-300 text-sm font-medium text-gray-900 rounded-full shadow transition hover:scale-105"
            >
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectNameInputModal;
