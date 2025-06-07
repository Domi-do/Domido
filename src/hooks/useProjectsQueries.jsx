import { useQuery } from "@tanstack/react-query";

import fetcher from "@/services/fetcher";

const useProjectsQueries = () => {
  const {
    data: projects = [],
    isLoading,
    isError,
  } = useQuery({ queryKey: ["projects"], queryFn: () => fetcher("/projects") });

  return { projects, isLoading, isError };
};

export default useProjectsQueries;
