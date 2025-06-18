import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import fetcher from "@/services/fetcher";

export const useDominos = () => {
  const { projectId } = useParams();
  return useSuspenseQuery({
    queryKey: ["dominos", projectId],
    queryFn: () => fetcher(`/dominos/${projectId}`),
  });
};
