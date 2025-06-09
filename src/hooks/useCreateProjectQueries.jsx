import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetcher from "@/services/fetcher";

const createProject = (newName) => {
  return fetcher("/projects", { method: "POST", body: { title: newName } });
};

const useProjectsQueries = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newName) => createProject(newName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export default useProjectsQueries;
