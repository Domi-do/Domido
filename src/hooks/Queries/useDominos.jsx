import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import fetcher from "@/services/fetcher";

export const useDominos = () => {
  const { projectId } = useParams();

  return useQuery({
    queryKey: ["dominos", projectId],
    queryFn: () => fetcher(`/dominos/${projectId}`),
  });
};
