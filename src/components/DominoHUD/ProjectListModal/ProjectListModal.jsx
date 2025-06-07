import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ModalOverlay from "@/components/Common/ModalOverlay";
import ProjectNameInputModal from "@/components/DominoHUD/ProjectNameInputModal/ProjectNameInputModal";
import useCreateProjectsQueries from "@/hooks/useCreateProjectQueries";
import useDeleteProjectsQueries from "@/hooks/useDeleteProjectQueries";
import useProjectsQueries from "@/hooks/useProjectsQueries";
import useUpdateProjectQueries from "@/hooks/useUpdateProjectQueries";

const ProjectListModal = ({ closeModal }) => {
  const { projects, isLoading, isError } = useProjectsQueries();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editTarget, setEditTarget] = useState(null);

  const { mutate: createProject } = useCreateProjectsQueries();
  const { mutate: deleteProject } = useDeleteProjectsQueries();
  const { mutate: updateProject } = useUpdateProjectQueries();

  const navigate = useNavigate();

  return (
    <ModalOverlay closeModal={closeModal}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/10 backdrop-blur-sm">
        <div className="bg-white rounded-3xl shadow-xl w-full max-w-3xl px-[40px] py-[48px] relative">
          <div className="flex justify-between items-center mb-[32px]">
            <h2 className="text-[20px] font-semibold text-gray-800 tracking-tight">
              프로젝트 선택
            </h2>
            <button
              onClick={closeModal}
              className="absolute top-[24px] right-[24px] w-[40px] h-[40px] flex items-center justify-center text-[28px] text-gray-400 hover:text-gray-600 transition rounded-full hover:bg-gray-100"
              aria-label="닫기"
            >
              ×
            </button>
          </div>

          <div className="space-y-[12px] max-h-[250px] overflow-y-auto">
            {isLoading ?
              <p className="text-center text-gray-400 text-base py-[40px]">로딩 중...</p>
            : isError ?
              <p className="text-center text-red-500 text-base py-[40px]">
                프로젝트 목록을 불러오지 못했어요
              </p>
            : projects.length === 0 ?
              <p className="text-center text-gray-400 text-base py-[40px]">
                저장된 프로젝트가 없습니다
              </p>
            : projects.map((project) => (
                <div
                  key={project._id}
                  className="w-full p-[16px] border border-gray-200 hover:border-yellow-500 hover:bg-yellow-50 transition rounded-xl shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => {
                        closeModal();
                        navigate(`/game/projects/${project._id}`);
                      }}
                      className="w-full text-left"
                    >
                      <span className="block text-[16px] font-medium text-gray-800">
                        {project.title}
                      </span>
                      <span className="block text-[12px] text-gray-400 mt-[4px]">
                        {project.createdAt}
                      </span>
                    </button>

                    <div className="flex gap-[10px]">
                      <button
                        onClick={() => deleteProject(project._id)}
                        className="px-[12px] py-[6px] bg-red-100 hover:bg-red-200 text-[12px] text-red-700 font-medium rounded-lg transition cursor-pointer whitespace-nowrap"
                      >
                        삭제
                      </button>
                      <button
                        onClick={() => setEditTarget(project)}
                        className="px-[12px] py-[6px] bg-blue-100 hover:bg-blue-200 text-[12px] text-blue-700 font-medium rounded-lg transition cursor-pointer whitespace-nowrap"
                      >
                        수정
                      </button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
          <div className="mt-[32px] flex justify-end">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="px-[24px] py-[10px] bg-yellow-400 hover:bg-yellow-300 text-sm font-medium text-gray-900 rounded-full shadow transition hover:scale-105"
            >
              새 프로젝트 만들기
            </button>
            {isCreateModalOpen && (
              <ProjectNameInputModal
                closeModal={() => setIsCreateModalOpen(false)}
                onSubmit={(name) => createProject(name)}
                submitLabel="생성하기"
              />
            )}
            {editTarget && (
              <ProjectNameInputModal
                closeModal={() => setEditTarget(null)}
                onSubmit={(newTitle) => {
                  updateProject({ projectId: editTarget._id, title: newTitle });
                  setEditTarget(null);
                }}
                defaultValue={editTarget.title}
                submitLabel="수정하기"
              />
            )}
          </div>
        </div>
      </div>
    </ModalOverlay>
  );
};

export default ProjectListModal;
