import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import fetcher from "@/services/fetcher";
import { useSocket } from "@/store/SocketContext";
import { DominoType } from "@/types/domino";

export const useDominoMutations = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const queryClient = useQueryClient();
  const { socket } = useSocket();

  return useMutation({
    mutationFn: ({ dominos }: { dominos: DominoType[] }) =>
      fetcher(`/dominos/${projectId}`, { method: "POST", body: { dominos } }),

    onMutate: async ({ dominos }) => {
      await queryClient.cancelQueries({ queryKey: ["dominos", projectId] });

      const previousDominos = queryClient.getQueryData<DominoType[]>(["dominos", projectId]);
      queryClient.setQueryData(["dominos", projectId], dominos);

      return { previousDominos };
    },

    onError: (_err, _variables, context) => {
      if (context?.previousDominos) {
        queryClient.setQueryData(["dominos", projectId], context.previousDominos);
      } else {
        queryClient.invalidateQueries({ queryKey: ["dominos", projectId] });
      }
    },

    onSuccess: (newDominos) => {
      queryClient.setQueryData(["dominos", projectId], newDominos);
      socket.emit("update domino", { projectId });
    },
  });
};
