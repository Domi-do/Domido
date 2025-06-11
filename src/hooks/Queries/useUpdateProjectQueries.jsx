import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetcher from "@/services/fetcher";

const updateProject = ({ projectId, title }) => {
  return fetcher(`/projects/${projectId}`, {
    method: "PATCH",
    body: { title: title },
    headers: { "Content-Type": "application/json" },
  });
};

const useUpdateProjectQueries = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, title }) => updateProject({ projectId, title }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export default useUpdateProjectQueries;
