import { useMutation, useQueryClient } from "@tanstack/react-query";

import { API_PATHS } from "@/constants/apiPaths";
import fetcher from "@/services/fetcher";

const updateProject = ({ projectId, title }: { projectId: string; title: string }) => {
  return fetcher(`${API_PATHS.PROJECT_DETAIL(projectId)}`, {
    method: "PATCH",
    body: { title: title },
    headers: { "Content-Type": "application/json" },
  });
};

const useUpdateProjectQueries = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, title }: { projectId: string; title: string }) =>
      updateProject({ projectId, title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export default useUpdateProjectQueries;
