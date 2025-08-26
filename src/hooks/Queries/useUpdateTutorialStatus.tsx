import { useMutation, useQueryClient } from "@tanstack/react-query";

import fetcher from "@/services/fetcher";
import useUserStore from "@/store/useUserStore";

interface UpdateTutorialVars {
  isTutorialUser: boolean;
}

export const useUpdateTutorialStatus = () => {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.userInfo?.userID);
  const setIsTutorialUser = useUserStore((state) => state.setIsTutorialUser);

  return useMutation({
    mutationFn: ({ isTutorialUser }: UpdateTutorialVars) =>
      fetcher("/auth/me/tutorial", { method: "PATCH", body: { userId, isTutorialUser } }),
    onSuccess: (updatedUser) => {
      setIsTutorialUser(updatedUser.isTutorialUser);
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
