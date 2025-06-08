import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import fetcher from "@/services/fetcher";

export const useDominoMutations = () => {
  const queryClient = useQueryClient();
  const { projectId } = useParams();

  return useMutation({
    mutationFn: ({ dominos, deleteDominoId }) =>
      fetcher(`/dominos/${projectId}`, { method: "POST", body: { dominos, deleteDominoId } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dominos", projectId] });
    },
  });
};
