import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { API_PATHS } from "@/constants/apiPaths";
import fetcher from "@/services/fetcher";
import { DominoType } from "@/types/domino";

export const useDominoOverwrite = () => {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dominos }: { dominos: DominoType[] }) =>
      fetcher(`${API_PATHS.DOMINO(projectId!)}/overwrite`, { method: "POST", body: { dominos } }),

    onMutate: async ({ dominos }) => {
      await queryClient.cancelQueries({ queryKey: ["dominos", projectId] });

      const previousDominos = queryClient.getQueryData(["dominos", projectId]);

      queryClient.setQueryData(["dominos", projectId], dominos);

      return { previousDominos };
    },

    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["dominos", projectId] });
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dominos", projectId] });
    },
  });
};
