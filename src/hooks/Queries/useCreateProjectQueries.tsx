import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetcher from "@/services/fetcher";
import { API_PATHS } from "@/constants/apiPaths";

const createProject = (newName: string) => {
  return fetcher(API_PATHS.PROJECTS, { method: "POST", body: { title: newName } });
};

const useProjectsQueries = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newName: string) => createProject(newName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export default useProjectsQueries;
