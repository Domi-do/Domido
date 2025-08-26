import { useQuery } from "@tanstack/react-query";
import { API_PATHS } from "@/constants/apiPaths";

import fetcher from "@/services/fetcher";

const useProjectsQueries = () => {
  return useQuery({ queryKey: ["projects"], queryFn: () => fetcher(`${API_PATHS.PROJECTS}`) });
};

export default useProjectsQueries;
