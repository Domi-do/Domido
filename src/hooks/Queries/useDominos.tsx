import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import fetcher from "@/services/fetcher";
import type { DominoType } from "@/types/domino";

export const useDominos = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return useSuspenseQuery<DominoType[]>({
    queryKey: ["dominos", projectId],
    queryFn: () => fetcher(`/dominos/${projectId}`),
  });
};
