import { useQuery } from "@tanstack/react-query";

import fetcher from "@/services/fetcher";

const useProjectsQueries = () => {
  return useQuery({ queryKey: ["projects"], queryFn: () => fetcher("/projects") });
};

export default useProjectsQueries;
