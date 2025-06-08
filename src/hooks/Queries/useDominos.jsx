import { useQuery } from "@tanstack/react-query";

import fetcher from "@/services/fetcher";

export const useDominos = (projectId) => {
  return useQuery({
    queryKey: ["dominos", projectId],
    queryFn: () => fetcher(`/dominos/${projectId}`),
  });
};
