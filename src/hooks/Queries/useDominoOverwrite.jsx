import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import fetcher from "@/services/fetcher";
import useDominoStore from "@/store/useDominoStore";

export const useDominoOverwrite = () => {
  const { projectId } = useParams();
  const setDominos = useDominoStore((state) => state.setDominos);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dominos }) =>
      fetcher(`/dominos/${projectId}/overwrite`, { method: "POST", body: { dominos } }),
    onSuccess: (newDominos) => {
      setDominos(newDominos);
    },
    onError: () => {
      queryClient.refetchQueries(["dominos", projectId]);
    },
  });
};
