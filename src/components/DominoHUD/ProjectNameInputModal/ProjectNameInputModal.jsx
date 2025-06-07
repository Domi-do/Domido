import { useState } from "react";

import ModalOverlay from "@/components/Common/ModalOverlay";

const ProjectNameInputModal = ({ closeModal, onSubmit }) => {
  const [projectName, setProjectName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!projectName.trim()) return alert("프로젝트 이름을 입력해주세요");

    onSubmit(projectName);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-white/10 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-xl w-full max-w-xl px-[40px] py-[48px] relative">
        <div className="flex justify-between items-center mb-[32px]">
          <h2 className="text-[20px] font-semibold text-gray-800 tracking-tight">
            새 프로젝트 생성
          </h2>
          <button
            onClick={closeModal}
            className="absolute top-[24px] right-[24px] w-[40px] h-[40px] flex items-center justify-center text-[28px] text-gray-400 hover:text-gray-600 transition rounded-full hover:bg-gray-100"
            aria-label="닫기"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-[8px]"
        >
          <label className="text-[14px] font-medium text-gray-700">프로젝트 이름</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-[16px] py-[12px] border border-gray-300 rounded-xl text-[14px] focus:outline-none focus:ring-2 focus:ring-yellow-300 transition"
            placeholder="예: 도미노 시뮬레이터"
          />

          <div className="mt-[32px] flex justify-end">
            <button
              type="submit"
              className="px-[24px] py-[10px] bg-yellow-400 hover:bg-yellow-300 text-sm font-medium text-gray-900 rounded-full shadow transition hover:scale-105"
            >
              생성하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectNameInputModal;
