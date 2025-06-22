import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetcher from "@/services/fetcher";
import { API_PATHS } from "@/constants/apiPaths";

const deleteProject = (projectId: string) => {
  return fetcher(API_PATHS.PROJECT_DETAIL(projectId), { method: "DELETE" });
};

const useDeleteProjectsQueries = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId: string) => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export default useDeleteProjectsQueries;
