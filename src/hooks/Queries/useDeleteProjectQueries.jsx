import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetcher from "@/services/fetcher";

const deleteProject = (projectId) => {
  return fetcher(`/projects/${projectId}`, { method: "DELETE" });
};

const useDeleteProjectsQueries = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (projectId) => deleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export default useDeleteProjectsQueries;
