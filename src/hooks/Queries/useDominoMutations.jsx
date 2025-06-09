import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import fetcher from "@/services/fetcher";
import useDominoStore from "@/store/useDominoStore";

export const useDominoMutations = () => {
  const { projectId } = useParams();
  const setDominos = useDominoStore((state) => state.setDominos);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dominos }) =>
      fetcher(`/dominos/${projectId}`, { method: "POST", body: { dominos } }),
    onSuccess: (newDominos) => {
      setDominos(newDominos);
    },
    onError: () => {
      queryClient.refetchQueries(["dominos", projectId]);
    },
  });
};
