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

    onMutate: async ({ dominos: newDominos }) => {
      await queryClient.cancelQueries(["dominos", projectId]);

      const previousDominos = queryClient.getQueryData(["dominos", projectId]);

      setDominos(newDominos);

      queryClient.setQueryData(["dominos", projectId], newDominos);

      return { previousDominos };
    },
    onError: () => {
      queryClient.refetchQueries(["dominos", projectId]);
    },

    onSuccess: (serverDominos) => {
      const cached = queryClient.getQueryData(["dominos", projectId]);

      const isSame = cached.length === serverDominos.length;
      if (!isSame) {
        queryClient.setQueryData(["dominos", projectId], serverDominos);
        setDominos(serverDominos);
      }
    },
  });
};
