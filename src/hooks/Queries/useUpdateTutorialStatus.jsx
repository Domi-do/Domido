import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetcher from "@/services/fetcher";
import { useTutorialStore } from "@/store/useTutorialStore";

export const useUpdateTutorialStatus = () => {
  const queryClient = useQueryClient();
  const setIsTutorialUser = useTutorialStore((state) => state.setIsTutorialUser);

  return useMutation({
    mutationFn: ({ isTutorialUser }) =>
      fetcher("/auth/me/tutorial", { method: "PATCH", body: { isTutorialUser } }),
    onSuccess: (updatedUser) => {
      setIsTutorialUser(updatedUser.isTutorialUser);
    },
    onError: () => {
      queryClient.invalidateQueries(["user"]);
    },
  });
};
